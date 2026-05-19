import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { headers } from 'next/headers';
import { getHeroActionsHtml } from '@/components/hero-actions';
import { getWhopCtaAnchorAttrs, getWhopCtaHref, whopCtaExperiment } from '@/flags';
import { ACCESS_PLANS } from '@/lib/access-plans';
import { getFunnelLocale, marketingCopy } from '@/lib/marketing-locale';
import { getHomepageSubstackTeaser } from '@/lib/substack';

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
        <a href="/newsletter" class="newsletter-teaser-cta" onclick="window.rokitTrack && window.rokitTrack('cta-newsletter-teaser',{location:'newsletter-teaser',destination:'newsletter',kind:'${teaser.kind}'})">
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

function getHomepagePricingHtml(
  copy: (typeof marketingCopy)[keyof typeof marketingCopy],
  ctaVariant: Awaited<ReturnType<typeof whopCtaExperiment>>,
) {
  const ctaByPlan = {
    free_trial: {
      href: getWhopCtaHref('pricing-free_trial', ctaVariant),
      attrs: getWhopCtaAnchorAttrs('pricing-free_trial', ctaVariant),
      eventName: 'cta-pricing-free-trial',
    },
    monthly: {
      href: getWhopCtaHref('pricing-monthly', ctaVariant),
      attrs: getWhopCtaAnchorAttrs('pricing-monthly', ctaVariant),
      eventName: 'cta-pricing-monthly',
    },
    lifetime: {
      href: getWhopCtaHref('pricing-lifetime', ctaVariant),
      attrs: getWhopCtaAnchorAttrs('pricing-lifetime', ctaVariant),
      eventName: 'cta-pricing-lifetime',
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
  const ctaVariant = await whopCtaExperiment();
  const heroHtml = getHeroActionsHtml(ctaVariant);

  let body = readFileSync(join(process.cwd(), 'content/page-body.html'), 'utf8');
  const replacements = {
    __PROMO_ARIA__: copy.promoAria,
    __PROMO_LEAD__: copy.promoLead,
    __PROMO_CTA__: copy.promoCta,
    __NAV_SIGNALS__: copy.navSignals,
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
    __FINAL_CTA__: copy.finalCta,
    __FOOTER_X_LABEL__: copy.footerLinks,
    __FOOTER_DISCLAIMER__: copy.footerDisclaimer,
  } as const;

  for (const [token, value] of Object.entries(replacements)) {
    body = body.replaceAll(token, value);
  }

  body = body.replace('__HERO_ACTIONS__', heroHtml);
  body = body.replace('__NAV_CTA_URL__', getWhopCtaHref('nav', ctaVariant));
  body = body.replace('__NAV_CTA_ATTRS__', getWhopCtaAnchorAttrs('nav', ctaVariant));
  body = body.replace('__PROMO_BANNER_CTA_URL__', getWhopCtaHref('promo-banner', ctaVariant));
  body = body.replace(
    '__PROMO_BANNER_CTA_ATTRS__',
    getWhopCtaAnchorAttrs('promo-banner', ctaVariant),
  );
  body = body.replace('__DISCORD_PREVIEW_CTA_URL__', getWhopCtaHref('discord-preview', ctaVariant));
  body = body.replace(
    '__DISCORD_PREVIEW_CTA_ATTRS__',
    getWhopCtaAnchorAttrs('discord-preview', ctaVariant),
  );
  body = body.replace('__PRICING_SECTION__', getHomepagePricingHtml(copy, ctaVariant));
  body = body.replace('__FINAL_CTA_URL__', getWhopCtaHref('final-cta', ctaVariant));
  body = body.replace('__FINAL_CTA_ATTRS__', getWhopCtaAnchorAttrs('final-cta', ctaVariant));
  body = body.replace('__FOOTER_LIFETIME_URL__', getWhopCtaHref('nav', ctaVariant));
  body = body.replace('__FOOTER_LIFETIME_ATTRS__', getWhopCtaAnchorAttrs('nav', ctaVariant));
  body = body.replace('__NEWSLETTER_TEASER__', getNewsletterTeaserHtml(copy));

  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: body }} />;
}
