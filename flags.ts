import { vercelAdapter } from '@flags-sdk/vercel';
import { flag } from 'flags/next';

export const WHOP_URL = 'https://whop.com/the-circle-vip';
export const WHOP_BASE_PLAN_URL = 'https://whop.com/checkout/plan_W42reYbE8ViaR';
export const WHOP_ELITE_PLAN_URL = 'https://whop.com/checkout/plan_QFUNiFOeal3xK';

export type WhopCtaExperimentVariant = 'control' | 'embed-base-scroll';

export type WhopCtaLocation =
  | 'hero'
  | 'promo-banner'
  | 'nav'
  | 'pricing-basic'
  | 'pricing-elite'
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

const highIntentCtaLocations = new Set<WhopCtaLocation>([
  'pricing-basic',
  'pricing-elite',
  'final-cta',
]);

function buildEmbeddedWhopUrl(
  location: WhopCtaLocation,
  variant: WhopCtaExperimentVariant,
  plan: 'base' | 'elite',
) {
  const url = new URL('/whop', 'https://rokitg.fun');
  url.searchParams.set('cta', location);
  url.searchParams.set('plan', plan);
  url.searchParams.set('variant', variant);
  return url.toString();
}

export function getWhopCtaHref(location: WhopCtaLocation, variant: WhopCtaExperimentVariant) {
  if (location === 'final-cta') {
    return buildEmbeddedWhopUrl(location, variant, 'base');
  }

  if (variant === 'embed-base-scroll' && highIntentCtaLocations.has(location)) {
    return buildEmbeddedWhopUrl(location, variant, 'base');
  }

  switch (location) {
    case 'pricing-basic':
      return WHOP_BASE_PLAN_URL;
    case 'pricing-elite':
      return WHOP_ELITE_PLAN_URL;
    default:
      return WHOP_URL;
  }
}

export function getWhopCtaAnchorAttrs(
  location: WhopCtaLocation,
  variant: WhopCtaExperimentVariant,
) {
  const href = getWhopCtaHref(location, variant);

  if (href.startsWith('https://rokitg.fun/')) {
    return '';
  }

  return 'target="_blank" rel="noopener noreferrer"';
}

export const flagDefinitions = {
  mainCtaFlag,
  whopCtaExperiment,
} as const;

export const marketingFlags = [mainCtaFlag, whopCtaExperiment] as const;
