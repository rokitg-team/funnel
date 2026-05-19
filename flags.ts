import { vercelAdapter } from '@flags-sdk/vercel';
import { flag } from 'flags/next';
import {
  getJoinPlanHref,
  getLifetimePrimaryAnchorAttrs,
  getLifetimePrimaryHref,
  type PlanKey,
} from '@/lib/access-plans';

export const WHOP_URL = 'https://whop.com/joined/the-circle-vip/products/the-circle-monthly/';

export type WhopCtaExperimentVariant = 'control' | 'embed-base-scroll';

export type WhopCtaLocation =
  | 'hero'
  | 'promo-banner'
  | 'nav'
  | 'pricing-free_trial'
  | 'pricing-monthly'
  | 'pricing-lifetime'
  | 'final-cta';

export const mainCtaFlag = flag<boolean>({
  key: 'main-cta',
  description: 'Join The Circle vs Navigation Links',
  defaultValue: false,
  options: [
    { value: false, label: 'Off' },
    { value: true, label: 'On' },
  ],
  adapter: vercelAdapter(),
});

export const whopCtaExperiment = flag<WhopCtaExperimentVariant>({
  key: 'whop-cta-experiment',
  description:
    'A/B test CTA routing between direct Whop checkout and embedded base monthly checkout',
  defaultValue: 'control',
  options: [
    { value: 'control', label: 'Current external checkout flow' },
    {
      value: 'embed-base-scroll',
      label: 'Route scrolled CTA clicks to embedded base monthly checkout',
    },
  ],
  adapter: vercelAdapter(),
});

function buildJoinUrl(location: WhopCtaLocation, variant: WhopCtaExperimentVariant, plan: PlanKey) {
  return getJoinPlanHref(plan, { cta: location, variant });
}

export function getWhopCtaHref(location: WhopCtaLocation, variant: WhopCtaExperimentVariant) {
  switch (location) {
    case 'pricing-free_trial':
      return buildJoinUrl(location, variant, 'free_trial');
    case 'pricing-monthly':
      return buildJoinUrl(location, variant, 'monthly');
    case 'pricing-lifetime':
      return getLifetimePrimaryHref({ cta: location, variant });
    case 'nav':
    case 'hero':
    case 'promo-banner':
    case 'final-cta':
      return getLifetimePrimaryHref({ cta: location, variant });
    default:
      return getLifetimePrimaryHref({ cta: location, variant });
  }
}

export function getWhopCtaAnchorAttrs(
  location: WhopCtaLocation,
  variant: WhopCtaExperimentVariant,
) {
  if (
    location === 'hero' ||
    location === 'nav' ||
    location === 'promo-banner' ||
    location === 'pricing-lifetime' ||
    location === 'final-cta'
  ) {
    return getLifetimePrimaryAnchorAttrs();
  }

  const href = getWhopCtaHref(location, variant);
  return href.startsWith('https://') ? 'target="_blank" rel="noopener noreferrer"' : '';
}

export const flagDefinitions = {
  mainCtaFlag,
  whopCtaExperiment,
} as const;

export const marketingFlags = [mainCtaFlag, whopCtaExperiment] as const;
