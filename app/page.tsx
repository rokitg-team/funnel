import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { headers } from 'next/headers';
import { getHeroActionsHtml } from '@/components/hero-actions';
import {
  DEFAULT_HOMEPAGE_PROOF,
  getGroupClosedEnabled,
  getMarketingCtaAnchorAttrs,
  getMarketingCtaHref,
} from '@/flags';
import { ACCESS_PLANS } from '@/lib/access-plans';
import { BLINK_NAV_CTA_LABEL, BLINK_PRIMARY_CTA_LABEL, BLINK_TOKEN_URL } from '@/lib/blink';
import { WHOP_PROMO_CTA_LABEL, WHOP_PROMO_LEAD } from '@/lib/campaign-links';
import { getFunnelLocale, marketingCopy } from '@/lib/marketing-locale';
import { getHomepageSubstackTeaser } from '@/lib/substack';
import {
  getWaitlistEmbedUrl,
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

function getInstagramReelHtml() {
  return `
  <section class="instagram-cta-section" data-va-section="instagram-cta">
    <div class="instagram-cta-shell">
      <div class="instagram-cta-copy">
        <div class="section-tag">// EXTRA SOCIAL DISTRIBUTION</div>
        <h3>More RokitG outside the funnel</h3>
        <p class="section-sub">
          Pure extra distribution. If someone wants the IRL brand layer, send them to Instagram
          first. TikTok and YouTube Shorts can slot into this same lane next without disturbing the
          main conversion flow.
        </p>
        <div class="instagram-cta-actions">
          <a
            href="https://www.instagram.com/rokittgg/"
            target="_blank"
            rel="noopener noreferrer"
            class="instagram-cta-button"
            onclick="window.rokitTrack && window.rokitTrack('instagram-cta',{location:'instagram-section',destination:'instagram-profile',handle:'rokittgg'})"
          >
            FOLLOW @ROKITTGG ON INSTAGRAM →
          </a>
          <a
            href="https://www.tiktok.com/@rokitg"
            target="_blank"
            rel="noopener noreferrer"
            class="social-lane-pill social-lane-link"
            onclick="window.rokitTrack && window.rokitTrack('tiktok-cta',{location:'instagram-section',destination:'tiktok-profile',handle:'rokitg'})"
          >
            OPEN TIKTOK @ROKITG
          </a>
          <a
            href="https://youtube.com/shorts/SnjnpTnCnpg?feature=share"
            target="_blank"
            rel="noopener noreferrer"
            class="social-lane-pill social-lane-link"
            onclick="window.rokitTrack && window.rokitTrack('youtube-shorts-cta',{location:'instagram-section',destination:'youtube-short',content:'SnjnpTnCnpg'})"
          >
            WATCH YOUTUBE SHORT
          </a>
        </div>
      </div>
      <div class="instagram-embed-card">
        <a
          href="https://www.instagram.com/reel/DYsS-MsOrZR/?utm_source=ig_embed&amp;utm_campaign=loading"
          target="_blank"
          rel="noopener noreferrer"
          class="instagram-preview-card"
          onclick="window.rokitTrack && window.rokitTrack('instagram-reel-cta',{location:'instagram-preview-card',destination:'instagram-reel',content:'DYsS-MsOrZR'})"
        >
          <div class="instagram-preview-top">
            <div class="instagram-preview-handle">
              <img src="/brand/laser-pfp.jpg" alt="" loading="lazy">
              <div>
                <strong>@rokittgg</strong>
                <span>main IRL reel</span>
              </div>
            </div>
            <div class="instagram-preview-chip">reel live</div>
          </div>
          <div class="instagram-preview-stage">
            <div class="instagram-preview-play">▶</div>
            <div class="instagram-preview-gradient"></div>
            <div class="instagram-preview-wordmark">Instagram</div>
          </div>
          <div class="instagram-preview-meta">
            <strong>Open the reel</strong>
            <span>Tap through to the real post and bounce into the profile from there.</span>
          </div>
        </a>
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
      <div class="platform-actions">
        <a href="${BLINK_TOKEN_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-cta-blue" onclick="window.rokitTrack && window.rokitTrack('blink-token-click',{location:'waitlist-gate',destination:'blink',plan:'blink'})">
          ${BLINK_PRIMARY_CTA_LABEL}
        </a>
      </div>
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

function getPrimaryOfferConfig(_groupClosed: boolean) {
  return {
    href: BLINK_TOKEN_URL,
    attrs: 'target="_blank" rel="noopener noreferrer"',
    label: BLINK_PRIMARY_CTA_LABEL,
    destination: 'blink',
    plan: 'blink',
    eventName: 'blink-token-click',
  } as const;
}

function getProofBlockHtml(
  _copy: (typeof marketingCopy)[keyof typeof marketingCopy],
  primaryOffer: ReturnType<typeof getPrimaryOfferConfig>,
) {
  const cta = `<a href="${primaryOffer.href}" ${primaryOffer.attrs} class="proof-block-cta" onclick="window.rokitTrack && window.rokitTrack('${primaryOffer.eventName}',{variant:'${DEFAULT_HOMEPAGE_PROOF}',destination:'${primaryOffer.destination}',plan:'${primaryOffer.plan}',location:'proof-block'})">${primaryOffer.label}</a>`;

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

function getHomepagePricingHtml(copy: (typeof marketingCopy)[keyof typeof marketingCopy]) {
  const ctaByPlan = {
    free_trial: {
      href: getMarketingCtaHref('pricing-free_trial', false),
      attrs: getMarketingCtaAnchorAttrs('pricing-free_trial', false),
      eventName: 'free-trial-init',
    },
    monthly: {
      href: getMarketingCtaHref('pricing-monthly', false),
      attrs: getMarketingCtaAnchorAttrs('pricing-monthly', false),
      eventName: 'monthly-init',
    },
    lifetime: {
      href: getMarketingCtaHref('pricing-lifetime', false),
      attrs: getMarketingCtaAnchorAttrs('pricing-lifetime', false),
      eventName: 'blink-token-click',
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
  const groupClosed = await getGroupClosedEnabled();
  const primaryOffer = getPrimaryOfferConfig(groupClosed);
  const heroHtml = getHeroActionsHtml(groupClosed);
  const promoHref = BLINK_TOKEN_URL;
  const promoAttrs = 'target="_blank" rel="noopener noreferrer"';
  const promoTrackEvent = 'blink-token-click';
  const promoTrackDestination = 'blink';

  let body = readFileSync(join(process.cwd(), 'content/page-body.html'), 'utf8');
  const replacements = {
    __PROMO_ARIA__: copy.promoAria,
    __PROMO_LEAD__: WHOP_PROMO_LEAD,
    __PROMO_CTA__: WHOP_PROMO_CTA_LABEL,
    __PROMO_TRACK_DESTINATION__: promoTrackDestination,
    __PROMO_TRACK_EVENT__: promoTrackEvent,
    __NAV_SIGNALS__: copy.navSignals,
    __NAV_CTA_LABEL__: BLINK_NAV_CTA_LABEL,
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
    __FINAL_CTA__: primaryOffer.label,
    __FINAL_CTA_TRACK_DESTINATION__: primaryOffer.destination,
    __FOOTER_CTA_LABEL__: primaryOffer.label.replace(' →', ''),
    __FOOTER_X_LABEL__: copy.footerLinks,
    __FOOTER_DISCLAIMER__: copy.footerDisclaimer,
  } as const;

  for (const [token, value] of Object.entries(replacements)) {
    body = body.replaceAll(token, value);
  }

  body = body.replace('__HERO_ACTIONS__', heroHtml);
  body = body.replace('__NAV_CTA_URL__', BLINK_TOKEN_URL);
  body = body.replace('__NAV_CTA_ATTRS__', 'target="_blank" rel="noopener noreferrer"');
  body = body.replace('__PROMO_BANNER_CTA_URL__', promoHref);
  body = body.replace('__PROMO_BANNER_CTA_ATTRS__', promoAttrs);
  body = body.replace('__DISCORD_PREVIEW_CTA_URL__', primaryOffer.href);
  body = body.replace('__DISCORD_PREVIEW_CTA_ATTRS__', primaryOffer.attrs);
  body = body.replace('__PROOF_BLOCK__', getProofBlockHtml(copy, primaryOffer));
  body = body.replace('__SOFT_CLOSE_NOTICE__', '');
  body = body.replace(
    '__PRICING_SECTION__',
    groupClosed ? getHomepageWaitlistHtml() : getHomepagePricingHtml(copy),
  );
  body = body.replace('__FINAL_CTA_URL__', primaryOffer.href);
  body = body.replace('__FINAL_CTA_ATTRS__', primaryOffer.attrs);
  body = body.replace('__FOOTER_LIFETIME_URL__', primaryOffer.href);
  body = body.replace('__FOOTER_LIFETIME_ATTRS__', primaryOffer.attrs);
  body = body.replace('__NEWSLETTER_TEASER__', getNewsletterTeaserHtml(copy));
  body = body.replace('__INSTAGRAM_REEL__', getInstagramReelHtml());

  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: body }} />;
}
