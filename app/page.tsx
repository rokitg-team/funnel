import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { headers } from 'next/headers';
import { getHeroActionsHtml } from '@/components/hero-actions';
import {
  type ClosedDoorModeVariant,
  closedDoorModeFlag,
  getEffectiveClosedDoorMode,
  getMarketingCtaAnchorAttrs,
  getMarketingCtaHref,
  groupClosedFlag,
  type HomepagePrimaryOfferVariant,
  homepagePrimaryOfferFlag,
  type ProofBlockVariant,
  proofBlockVariantFlag,
  whopCtaExperiment,
} from '@/flags';
import { ACCESS_PLANS, getJoinPlanHref } from '@/lib/access-plans';
import { getFunnelLocale, marketingCopy } from '@/lib/marketing-locale';
import { getHomepageSubstackTeaser } from '@/lib/substack';
import {
  getWaitlistEmbedUrl,
  getWaitlistHref,
  hasEmbeddedWaitlistForm,
  WAITLIST_TALLY_FORM_URL,
} from '@/lib/waitlist';

function getNewsletterTeaserHtml(copy: (typeof marketingCopy)[keyof typeof marketingCopy]): string {
  const teaser = getHomepageSubstackTeaser();
  if (!teaser) {
    return '';
  }

  return `
  <section class="newsletter-teaser" data-va-section="newsletter-teaser">
    <div class="newsletter-teaser-shell">
      <div class="newsletter-teaser-copy">
        <div class="section-tag">${copy.newsletterTeaserTag}</div>
        <h2>${copy.newsletterTeaserTitle}<br><span class="green">${copy.newsletterTeaserAccent}</span></h2>
        <p class="section-sub">${copy.newsletterTeaserSub}</p>
        <a href="/newsletter" class="newsletter-teaser-cta" onclick="window.rokitTrack && window.rokitTrack('newsletter-cta',{location:'newsletter-teaser',destination:'newsletter',kind:'${teaser.kind}'})">
          ${copy.newsletterTeaserCta}
        </a>
      </div>
      <div class="newsletter-teaser-card">
        <div class="newsletter-teaser-kicker">${teaser.kind === 'note' ? 'SUBSTACK NOTE' : 'SUBSTACK POST'}</div>
        <div class="newsletter-teaser-title">${teaser.title}</div>
      </div>
    </div>
  </section>`;
}

function getHomepageWaitlistHtml() {
  const embedUrl = getWaitlistEmbedUrl({ source: 'home' });
  const hasEmbed = hasEmbeddedWaitlistForm();

  return `
  <section class="waitlist-gate" data-va-section="waitlist-gate">
    <div class="waitlist-copy">
      <div class="section-tag">// CLOSED DOOR FUNNEL</div>
      <h2>THE GROUP IS<br><span class="green">CURRENTLY FULL.</span></h2>
      <p class="section-sub">Traffic is hitting hard and access is being throttled. Join the embedded waitlist below and you’ll be first in line when the next intake opens.</p>
      <div class="waitlist-proof-row">
        <div class="waitlist-proof-card">
          <strong>Organic only</strong>
          <span>Traffic is landing from X, Instagram, and word of mouth.</span>
        </div>
        <div class="waitlist-proof-card">
          <strong>Mobile-first buyers</strong>
          <span>Most visitors are on phone, so the form stays fast and one-screen clean.</span>
        </div>
        <div class="waitlist-proof-card">
          <strong>Priority reopening notice</strong>
          <span>Waitlist leads hear first when direct-buy windows and new slots open again.</span>
        </div>
      </div>
    </div>
    <div class="waitlist-form-shell">
      <div class="waitlist-form-head">
        <div>
          <div class="waitlist-form-label">Priority intake</div>
          <div class="waitlist-form-title">Join the waitlist</div>
        </div>
        <div class="waitlist-form-pill">spots reopen in waves</div>
      </div>
      ${
        hasEmbed
          ? `<iframe data-tally-src="${embedUrl}" src="${embedUrl}" title="The Circle waitlist form" loading="lazy" class="waitlist-iframe"></iframe>`
          : `<div class="waitlist-fallback-card"><strong>Add your Tally form URL to finish the live embed.</strong><p>Set <code>NEXT_PUBLIC_WAITLIST_TALLY_FORM_URL</code> to your Tally share link and this section will immediately render the embedded waitlist form.</p><p class="waitlist-fallback-meta">${WAITLIST_TALLY_FORM_URL ? WAITLIST_TALLY_FORM_URL : 'No Tally form configured yet.'}</p></div>`
      }
    </div>
  </section>`;
}

function getPrimaryOfferConfig(
  offerVariant: HomepagePrimaryOfferVariant,
  ctaVariant: Awaited<ReturnType<typeof whopCtaExperiment>>,
  closedDoorMode: ClosedDoorModeVariant,
) {
  if (closedDoorMode === 'hard-close') {
    return {
      href: getWaitlistHref({ cta: 'global', variant: ctaVariant, offer: offerVariant }),
      attrs: '',
      label: 'JOIN THE WAITLIST →',
      destination: 'waitlist',
      plan: 'waitlist',
    } as const;
  }

  if (offerVariant === 'free-trial') {
    return {
      href: getJoinPlanHref('free_trial', {
        cta: 'global',
        variant: ctaVariant,
        offer: offerVariant,
      }),
      attrs: '',
      label: 'START FREE TRIAL →',
      destination: 'free_trial',
      plan: 'free_trial',
    } as const;
  }

  if (offerVariant === 'waitlist-apply') {
    return {
      href: getWaitlistHref({ cta: 'global', variant: ctaVariant, offer: offerVariant }),
      attrs: '',
      label: 'JOIN THE WAITLIST →',
      destination: 'waitlist',
      plan: 'waitlist',
    } as const;
  }

  return {
    href: getMarketingCtaHref('hero', ctaVariant, false),
    attrs: getMarketingCtaAnchorAttrs('hero', ctaVariant, false),
    label: 'BUY LIFETIME DIRECT →',
    destination: 'lifetime',
    plan: 'lifetime',
  } as const;
}

function getProofBlockHtml(
  _copy: (typeof marketingCopy)[keyof typeof marketingCopy],
  proofVariant: ProofBlockVariant,
  primaryOffer: ReturnType<typeof getPrimaryOfferConfig>,
) {
  const ctaEventName =
    primaryOffer.plan === 'lifetime'
      ? 'lifetime-deal-init'
      : primaryOffer.plan === 'free_trial'
        ? 'free-trial-init'
        : 'waitlist-cta';
  const cta = `<a href="${primaryOffer.href}" ${primaryOffer.attrs} class="proof-block-cta" onclick="window.rokitTrack && window.rokitTrack('${ctaEventName}',{variant:'${proofVariant}',destination:'${primaryOffer.destination}',plan:'${primaryOffer.plan}',location:'proof-block'})">${primaryOffer.label}</a>`;

  if (proofVariant === 'community-proof') {
    return `
    <section class="proof-block proof-block-community" data-va-section="proof-block-community">
      <div class="proof-block-head">
        <div class="section-tag">// PRO COMMUNITY</div>
        <h2>SEE THE <span class="green">COMMUNITY</span><br>BEFORE YOU JOIN</h2>
        <p class="section-sub">The value is not just the call. It&apos;s the pace, the rooms, the live reactions, and the traders inside with you when the tape starts moving.</p>
      </div>
      <div class="proof-block-grid">
        <div class="proof-card">
          <strong>Voice rooms when it matters</strong>
          <p>War room, chart review, and after-hours voice channels for fast market conditions.</p>
        </div>
        <div class="proof-card">
          <strong>Clean channel structure</strong>
          <p>Live calls, entries, targets, stops, market watch, and winners all separated cleanly.</p>
        </div>
        <div class="proof-card">
          <strong>Operators, not tourists</strong>
          <p>Small serious circle energy instead of a huge noisy public server.</p>
        </div>
      </div>
      <div class="proof-block-actions">${cta}</div>
    </section>`;
  }

  if (proofVariant === 'results-proof') {
    return `
    <section class="proof-block proof-block-results" data-va-section="proof-block-results">
      <div class="proof-block-head">
        <div class="section-tag">// RESULTS PROOF</div>
        <h2>REAL TAPE. <span class="green">REAL REVIEWS.</span><br>REAL REPEAT BUYERS.</h2>
        <p class="section-sub">Cold traffic needs proof that this isn&apos;t generic signal fluff. These are the outcomes and operator reactions that make people stay.</p>
      </div>
      <div class="proof-block-grid">
        <div class="proof-card">
          <strong>$TON doubled after the call</strong>
          <p>Banger edits help, but the point is simple: the call landed and the tape followed through.</p>
        </div>
        <div class="proof-card">
          <strong>5.0 stars on Whop</strong>
          <p>Public review proof from buyers who already paid and stepped inside the Circle.</p>
        </div>
        <div class="proof-card">
          <strong>“He&apos;s delivered since day one”</strong>
          <p>That kind of line matters more than aesthetic. It signals trust from the trenches.</p>
        </div>
      </div>
      <div class="proof-block-actions">${cta}</div>
    </section>`;
  }

  return `
  <section class="proof-block proof-block-platform" data-va-section="proof-block-platform">
    <div class="proof-block-head">
      <div class="section-tag">// TRUST LAYER</div>
      <h2>VERIFIED <span class="green">SOCIAL PROOF</span><br>THAT FEELS LEGIT</h2>
      <p class="section-sub">For new visitors, the fastest way to trust the funnel is platform proof, operator identity, and visible community size.</p>
    </div>
    <div class="proof-block-grid">
      <div class="proof-card">
        <strong>Verified on Whop</strong>
        <p>Public storefront, real checkout layer, and transparent review surface for social traffic.</p>
      </div>
      <div class="proof-card">
        <strong>42 operators inside</strong>
        <p>Enough people to create energy, still small enough to feel private and high-signal.</p>
      </div>
      <div class="proof-card">
        <strong>Recognizable on X</strong>
        <p>The verified profile pill, content trail, and clips give organic visitors a fast trust anchor.</p>
      </div>
    </div>
    <div class="proof-block-actions">${cta}</div>
  </section>`;
}

function getSoftCloseNoticeHtml(primaryOffer: ReturnType<typeof getPrimaryOfferConfig>) {
  return `
  <section class="soft-close-banner" data-va-section="soft-close-banner">
    <div class="soft-close-copy">
      <div class="section-tag">// ALMOST FULL</div>
      <strong>Spots are tightening up.</strong>
      <p>The group is still open right now, but intake is being throttled. If you&apos;re even half-serious, make your move before this flips fully into waitlist mode.</p>
    </div>
    <a href="${primaryOffer.href}" ${primaryOffer.attrs} class="soft-close-cta" onclick="window.rokitTrack && window.rokitTrack('${primaryOffer.plan === 'lifetime' ? 'lifetime-deal-init' : primaryOffer.plan === 'free_trial' ? 'free-trial-init' : 'waitlist-cta'}',{variant:'soft-close',destination:'${primaryOffer.destination}',plan:'${primaryOffer.plan}',location:'soft-close-banner'})">${primaryOffer.label}</a>
  </section>`;
}

function getHomepagePricingHtml(
  copy: (typeof marketingCopy)[keyof typeof marketingCopy],
  ctaVariant: Awaited<ReturnType<typeof whopCtaExperiment>>,
) {
  const ctaByPlan = {
    free_trial: {
      href: getMarketingCtaHref('pricing-free_trial', ctaVariant, false),
      attrs: getMarketingCtaAnchorAttrs('pricing-free_trial', ctaVariant, false),
      eventName: 'free-trial-init',
    },
    monthly: {
      href: getMarketingCtaHref('pricing-monthly', ctaVariant, false),
      attrs: getMarketingCtaAnchorAttrs('pricing-monthly', ctaVariant, false),
      eventName: 'monthly-init',
    },
    lifetime: {
      href: getMarketingCtaHref('pricing-lifetime', ctaVariant, false),
      attrs: getMarketingCtaAnchorAttrs('pricing-lifetime', ctaVariant, false),
      eventName: 'lifetime-deal-init',
    },
  } as const;

  const cards = ACCESS_PLANS.map((plan) => {
    const cta = ctaByPlan[plan.key];
    const classes = `price-card${plan.featured ? ' featured price-card-lifetime' : ''}`;
    const buttonClasses = `btn-plan${plan.featured ? ' featured-btn' : ''}`;

    return `
      <div class="${classes}">
        ${plan.featured ? `<div class="featured-badge">${copy.featuredBadge}</div>` : ''}
        <div class="price-tier">${plan.label}</div>
        <div class="price-amount">${plan.price.replace('$', '<span>$</span>')}</div>
        <div class="price-period">${plan.period}</div>
        <p class="price-value-line">${plan.valueLine}</p>
        <ul class="price-features">
          ${plan.featureList.map((feature) => `<li>${feature}</li>`).join('')}
        </ul>
        <a href="${cta.href}" ${cta.attrs} class="${buttonClasses}" onclick="window.rokitTrack && window.rokitTrack('${cta.eventName}',{location:'pricing-${plan.key}',plan:'${plan.key}',destination:'${plan.destination}'})">${plan.ctaLabel}</a>
      </div>
    `;
  }).join('');

  return `
  <div class="pricing-section" id="pricing" data-va-section="pricing">
    <div class="section-tag">${copy.sectionPricingTag}</div>
    <h2>${copy.pricingTitle}<br><span class="green">${copy.pricingAccent}</span></h2>
    <p class="section-sub">${copy.pricingSub}</p>
    <div class="pricing-cards">
      ${cards}
    </div>
  </div>`;
}

export default async function HomePage() {
  const requestHeaders = await headers();
  const locale = getFunnelLocale(requestHeaders);
  const copy = marketingCopy[locale];
  const [ctaVariant, groupClosed, homepagePrimaryOffer, proofBlockVariant, closedDoorMode] =
    await Promise.all([
      whopCtaExperiment(),
      groupClosedFlag(),
      homepagePrimaryOfferFlag(),
      proofBlockVariantFlag(),
      closedDoorModeFlag(),
    ]);
  const effectiveClosedDoorMode = getEffectiveClosedDoorMode(closedDoorMode, groupClosed);
  const primaryOffer = getPrimaryOfferConfig(
    homepagePrimaryOffer,
    ctaVariant,
    effectiveClosedDoorMode,
  );
  const heroHtml = getHeroActionsHtml(
    ctaVariant,
    homepagePrimaryOffer,
    effectiveClosedDoorMode,
    groupClosed,
  );

  let body = readFileSync(join(process.cwd(), 'content/page-body.html'), 'utf8');
  const replacements = {
    __PROMO_ARIA__: copy.promoAria,
    __PROMO_LEAD__: copy.promoLead,
    __PROMO_CTA__: primaryOffer.label,
    __PROMO_TRACK_DESTINATION__: primaryOffer.destination,
    __NAV_SIGNALS__: copy.navSignals,
    __NAV_CTA_LABEL__:
      effectiveClosedDoorMode === 'hard-close' ? 'JOIN WAITLIST →' : primaryOffer.label,
    __NAV_CTA_TRACK_DESTINATION__: primaryOffer.destination,
    __HERO_BADGE__: copy.heroBadge,
    __HERO_TITLE_DIM__: copy.heroTitleDim,
    __HERO_TITLE_PREFIX__: copy.heroTitlePrefix,
    __HERO_TITLE_ACCENT__: copy.heroTitleAccent,
    __HERO_TITLE_LAST__: copy.heroTitleLast,
    __HERO_SUB__: copy.heroSub,
    __SECTION_FEATURES_TAG__: copy.sectionFeaturesTag,
    __FEATURES_TITLE__: copy.featuresTitle,
    __FEATURES_PREFIX__: copy.featuresPrefix,
    __FEATURES_ACCENT__: copy.featuresAccent,
    __FEATURES_SUB__: copy.featuresSub,
    __FEATURE_REALTIME_TITLE__: copy.featureRealtimeTitle,
    __FEATURE_REALTIME_DESC__: copy.featureRealtimeDesc,
    __FEATURE_ENTRY_TITLE__: copy.featureEntryTitle,
    __FEATURE_ENTRY_DESC__: copy.featureEntryDesc,
    __FEATURE_ANALYSIS_TITLE__: copy.featureAnalysisTitle,
    __FEATURE_ANALYSIS_DESC__: copy.featureAnalysisDesc,
    __FEATURE_COMMUNITY_TITLE__: copy.featureCommunityTitle,
    __FEATURE_COMMUNITY_DESC__: copy.featureCommunityDesc,
    __FEATURE_MEME_TITLE__: copy.featureMemeTitle,
    __FEATURE_MEME_DESC__: copy.featureMemeDesc,
    __FEATURE_EDUCATION_TITLE__: copy.featureEducationTitle,
    __FEATURE_EDUCATION_DESC__: copy.featureEducationDesc,
    __SECTION_SIGNAL_TAG__: copy.sectionSignalTag,
    __SIGNAL_TITLE_BEFORE__: copy.signalTitleBefore,
    __SIGNAL_TITLE_ACCENT__: copy.signalTitleAccent,
    __SIGNAL_TITLE_AFTER__: copy.signalTitleAfter,
    __SIGNAL_SUB__: copy.signalSub,
    __SECTION_TESTIMONIALS_TAG__: copy.sectionTestimonialsTag,
    __TESTIMONIALS_TITLE__: copy.testimonialsTitle,
    __TESTIMONIALS_ACCENT__: copy.testimonialsAccent,
    __TESTIMONIALS_CTA__: copy.testimonialsCta,
    __FINAL_TAG__: copy.finalTag,
    __FINAL_TITLE_BEFORE__: copy.finalTitleBefore,
    __FINAL_TITLE_ACCENT__: copy.finalTitleAccent,
    __FINAL_SUB__: copy.finalSub,
    __FINAL_CTA__:
      effectiveClosedDoorMode === 'hard-close' ? 'JOIN THE WAITLIST →' : primaryOffer.label,
    __FINAL_CTA_TRACK_DESTINATION__: primaryOffer.destination,
    __FOOTER_CTA_LABEL__:
      effectiveClosedDoorMode === 'hard-close'
        ? 'JOIN WAITLIST'
        : primaryOffer.label.replace(' →', ''),
    __FOOTER_X_LABEL__: copy.footerLinks,
    __FOOTER_DISCLAIMER__: copy.footerDisclaimer,
  } as const;

  for (const [token, value] of Object.entries(replacements)) {
    body = body.replaceAll(token, value);
  }

  body = body.replace('__HERO_ACTIONS__', heroHtml);
  body = body.replace(
    '__NAV_CTA_URL__',
    effectiveClosedDoorMode === 'hard-close'
      ? getWaitlistHref({ cta: 'nav', variant: ctaVariant, offer: homepagePrimaryOffer })
      : primaryOffer.destination === 'free_trial'
        ? getJoinPlanHref('free_trial', {
            cta: 'nav',
            variant: ctaVariant,
            offer: homepagePrimaryOffer,
          })
        : primaryOffer.destination === 'waitlist'
          ? getWaitlistHref({ cta: 'nav', variant: ctaVariant, offer: homepagePrimaryOffer })
          : primaryOffer.href,
  );
  body = body.replace(
    '__NAV_CTA_ATTRS__',
    effectiveClosedDoorMode === 'hard-close'
      ? ''
      : primaryOffer.destination === 'lifetime'
        ? primaryOffer.attrs
        : '',
  );
  body = body.replace(
    '__PROMO_BANNER_CTA_URL__',
    effectiveClosedDoorMode === 'hard-close'
      ? getWaitlistHref({ cta: 'promo-banner', variant: ctaVariant, offer: homepagePrimaryOffer })
      : primaryOffer.destination === 'free_trial'
        ? getJoinPlanHref('free_trial', {
            cta: 'promo-banner',
            variant: ctaVariant,
            offer: homepagePrimaryOffer,
          })
        : primaryOffer.destination === 'waitlist'
          ? getWaitlistHref({
              cta: 'promo-banner',
              variant: ctaVariant,
              offer: homepagePrimaryOffer,
            })
          : primaryOffer.href,
  );
  body = body.replace(
    '__PROMO_BANNER_CTA_ATTRS__',
    effectiveClosedDoorMode === 'hard-close'
      ? ''
      : primaryOffer.destination === 'lifetime'
        ? primaryOffer.attrs
        : '',
  );
  body = body.replace(
    '__DISCORD_PREVIEW_CTA_URL__',
    effectiveClosedDoorMode === 'hard-close'
      ? getWaitlistHref({
          cta: 'discord-preview',
          variant: ctaVariant,
          offer: homepagePrimaryOffer,
        })
      : primaryOffer.destination === 'free_trial'
        ? getJoinPlanHref('free_trial', {
            cta: 'discord-preview',
            variant: ctaVariant,
            offer: homepagePrimaryOffer,
          })
        : primaryOffer.destination === 'waitlist'
          ? getWaitlistHref({
              cta: 'discord-preview',
              variant: ctaVariant,
              offer: homepagePrimaryOffer,
            })
          : primaryOffer.href,
  );
  body = body.replace(
    '__DISCORD_PREVIEW_CTA_ATTRS__',
    effectiveClosedDoorMode === 'hard-close'
      ? ''
      : primaryOffer.destination === 'lifetime'
        ? primaryOffer.attrs
        : '',
  );
  body = body.replace('__PROOF_BLOCK__', getProofBlockHtml(copy, proofBlockVariant, primaryOffer));
  body = body.replace(
    '__SOFT_CLOSE_NOTICE__',
    effectiveClosedDoorMode === 'soft-close' ? getSoftCloseNoticeHtml(primaryOffer) : '',
  );
  body = body.replace(
    '__PRICING_SECTION__',
    effectiveClosedDoorMode === 'hard-close'
      ? getHomepageWaitlistHtml()
      : getHomepagePricingHtml(copy, ctaVariant),
  );
  body = body.replace(
    '__FINAL_CTA_URL__',
    effectiveClosedDoorMode === 'hard-close'
      ? getWaitlistHref({ cta: 'final-cta', variant: ctaVariant, offer: homepagePrimaryOffer })
      : primaryOffer.destination === 'free_trial'
        ? getJoinPlanHref('free_trial', {
            cta: 'final-cta',
            variant: ctaVariant,
            offer: homepagePrimaryOffer,
          })
        : primaryOffer.destination === 'waitlist'
          ? getWaitlistHref({ cta: 'final-cta', variant: ctaVariant, offer: homepagePrimaryOffer })
          : primaryOffer.href,
  );
  body = body.replace(
    '__FINAL_CTA_ATTRS__',
    effectiveClosedDoorMode === 'hard-close'
      ? ''
      : primaryOffer.destination === 'lifetime'
        ? primaryOffer.attrs
        : '',
  );
  body = body.replace(
    '__FOOTER_LIFETIME_URL__',
    effectiveClosedDoorMode === 'hard-close'
      ? getWaitlistHref({ cta: 'footer', variant: ctaVariant, offer: homepagePrimaryOffer })
      : primaryOffer.destination === 'free_trial'
        ? getJoinPlanHref('free_trial', {
            cta: 'footer',
            variant: ctaVariant,
            offer: homepagePrimaryOffer,
          })
        : primaryOffer.destination === 'waitlist'
          ? getWaitlistHref({ cta: 'footer', variant: ctaVariant, offer: homepagePrimaryOffer })
          : primaryOffer.href,
  );
  body = body.replace(
    '__FOOTER_LIFETIME_ATTRS__',
    effectiveClosedDoorMode === 'hard-close'
      ? ''
      : primaryOffer.destination === 'lifetime'
        ? primaryOffer.attrs
        : '',
  );
  body = body.replace('__NEWSLETTER_TEASER__', getNewsletterTeaserHtml(copy));

  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: body }} />;
}
