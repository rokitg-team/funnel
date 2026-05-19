import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { headers } from 'next/headers';
import { getHeroActionsHtml } from '@/components/hero-actions';
import { getWhopCtaAnchorAttrs, getWhopCtaHref, whopCtaExperiment } from '@/flags';
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
    __SECTION_PRICING_TAG__: copy.sectionPricingTag,
    __PRICING_TITLE__: copy.pricingTitle,
    __PRICING_ACCENT__: copy.pricingAccent,
    __PRICING_SUB__: copy.pricingSub,
    __BASIC_PERIOD__: copy.basicPeriod,
    __BASIC_FEATURE_1__: copy.basicFeature1,
    __BASIC_FEATURE_2__: copy.basicFeature2,
    __BASIC_FEATURE_3__: copy.basicFeature3,
    __BASIC_FEATURE_4__: copy.basicFeature4,
    __BASIC_CTA__: copy.basicCta,
    __FEATURED_BADGE__: copy.featuredBadge,
    __PRO_PERIOD__: copy.proPeriod,
    __PRO_FEATURE_1__: copy.proFeature1,
    __PRO_FEATURE_2__: copy.proFeature2,
    __PRO_FEATURE_3__: copy.proFeature3,
    __PRO_FEATURE_4__: copy.proFeature4,
    __PRO_FEATURE_5__: copy.proFeature5,
    __PRO_CTA__: copy.proCta,
    __ELITE_PERIOD__: copy.elitePeriod,
    __ELITE_FEATURE_1__: copy.eliteFeature1,
    __ELITE_FEATURE_2__: copy.eliteFeature2,
    __ELITE_FEATURE_3__: copy.eliteFeature3,
    __ELITE_FEATURE_4__: copy.eliteFeature4,
    __ELITE_FEATURE_5__: copy.eliteFeature5,
    __ELITE_CTA__: copy.eliteCta,
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
  body = body.replace('__PROMO_BANNER_CTA_URL__', getWhopCtaHref('promo-banner', ctaVariant));
  body = body.replace(
    '__PROMO_BANNER_CTA_ATTRS__',
    getWhopCtaAnchorAttrs('promo-banner', ctaVariant),
  );
  body = body.replace('__PRICING_BASIC_CTA_URL__', getWhopCtaHref('pricing-basic', ctaVariant));
  body = body.replace(
    '__PRICING_BASIC_CTA_ATTRS__',
    getWhopCtaAnchorAttrs('pricing-basic', ctaVariant),
  );
  body = body.replace('__PRICING_ELITE_CTA_URL__', getWhopCtaHref('pricing-elite', ctaVariant));
  body = body.replace(
    '__PRICING_ELITE_CTA_ATTRS__',
    getWhopCtaAnchorAttrs('pricing-elite', ctaVariant),
  );
  body = body.replace('__FINAL_CTA_URL__', getWhopCtaHref('final-cta', ctaVariant));
  body = body.replace('__FINAL_CTA_ATTRS__', getWhopCtaAnchorAttrs('final-cta', ctaVariant));
  body = body.replace('__NEWSLETTER_TEASER__', getNewsletterTeaserHtml(copy));

  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: body }} />;
}
