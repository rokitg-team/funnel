import { flag } from 'flags/next';
import {
  getJoinPlanHref,
  getLifetimePrimaryAnchorAttrs,
  getLifetimePrimaryHref,
} from '@/lib/access-plans';
import { getWaitlistHref } from '@/lib/waitlist';

process.env.GROWTHBOOK_CLIENT_KEY ??=
  process.env.ROKITG_GROWTHBOOK_GROWTHBOOK_CLIENT_KEY ?? 'sdk-hGRqknd0mPda8Lg';

const { createGrowthbookAdapter } =
  require('@flags-sdk/growthbook') as typeof import('@flags-sdk/growthbook');

export type MarketingCtaLocation =
  | 'hero'
  | 'promo-banner'
  | 'nav'
  | 'discord-preview'
  | 'pricing-free_trial'
  | 'pricing-monthly'
  | 'pricing-lifetime'
  | 'final-cta';

export const DEFAULT_CTA_VARIANT = 'control';
export const DEFAULT_HOMEPAGE_PROOF = 'platform-proof';
const GROWTHBOOK_CLIENT_KEY = process.env.GROWTHBOOK_CLIENT_KEY ?? 'sdk-hGRqknd0mPda8Lg';
const FORCE_PRODUCTION_MARKETING_FLAGS = process.env.VERCEL_ENV === 'production';
const growthbook = createGrowthbookAdapter({
  clientKey: GROWTHBOOK_CLIENT_KEY,
  apiHost: process.env.GROWTHBOOK_API_HOST,
  appOrigin: process.env.GROWTHBOOK_APP_ORIGIN,
});

export const groupClosedFlag = flag<boolean>({
  key: 'group-closed',
  description: 'Close the group and route funnel traffic into the waitlist flow',
  defaultValue: FORCE_PRODUCTION_MARKETING_FLAGS,
  options: [
    { value: false, label: 'Open' },
    { value: true, label: 'Closed / waitlist only' },
  ],
  adapter: growthbook.feature<boolean>(),
});

export const lifetimeDealHeroFlag = flag<boolean>({
  key: 'lifetime-deal-hero-v2',
  description: 'Use the landing-style hero with a claim discount CTA on the lifetime page',
  defaultValue: true,
  options: [
    { value: false, label: 'Legacy lifetime checkout hero' },
    { value: true, label: 'Offer hero with claim discount CTA' },
  ],
  adapter: growthbook.feature<boolean>(),
});

export const extendedInsiderLeakFlag = flag<boolean>({
  key: 'extended-insider-leak',
  description: 'Market Extended as a limited-time insider leak with a $5 unlock CTA',
  defaultValue: FORCE_PRODUCTION_MARKETING_FLAGS,
  options: [
    { value: false, label: 'Standard Extended sponsor card' },
    { value: true, label: 'Insider leak angle with $5 unlock CTA' },
  ],
  adapter: growthbook.feature<boolean>(),
});

export function getMarketingCtaHref(location: MarketingCtaLocation, groupClosed: boolean) {
  if (groupClosed) {
    return getWaitlistHref({ cta: location, variant: DEFAULT_CTA_VARIANT, mode: 'closed' });
  }

  switch (location) {
    case 'pricing-free_trial':
      return getJoinPlanHref('free_trial', { cta: location, variant: DEFAULT_CTA_VARIANT });
    case 'pricing-monthly':
      return getJoinPlanHref('monthly', { cta: location, variant: DEFAULT_CTA_VARIANT });
    default:
      return getLifetimePrimaryHref({ cta: location, variant: DEFAULT_CTA_VARIANT });
  }
}

export function getMarketingCtaAnchorAttrs(location: MarketingCtaLocation, groupClosed: boolean) {
  if (groupClosed) {
    return '';
  }

  if (
    location === 'hero' ||
    location === 'nav' ||
    location === 'discord-preview' ||
    location === 'promo-banner' ||
    location === 'pricing-lifetime' ||
    location === 'final-cta'
  ) {
    return getLifetimePrimaryAnchorAttrs();
  }

  const href = getMarketingCtaHref(location, false);
  return href.startsWith('https://') ? 'target="_blank" rel="noopener noreferrer"' : '';
}

export const flagDefinitions = {
  groupClosedFlag,
  lifetimeDealHeroFlag,
  extendedInsiderLeakFlag,
} as const;

export const marketingFlags = [
  groupClosedFlag,
  lifetimeDealHeroFlag,
  extendedInsiderLeakFlag,
] as const;

export async function getGroupClosedEnabled() {
  if (FORCE_PRODUCTION_MARKETING_FLAGS) {
    return true;
  }

  return groupClosedFlag();
}

export async function getLifetimeDealHeroEnabled() {
  if (FORCE_PRODUCTION_MARKETING_FLAGS) {
    return true;
  }

  return lifetimeDealHeroFlag();
}

export async function getExtendedInsiderLeakEnabled() {
  if (FORCE_PRODUCTION_MARKETING_FLAGS) {
    return true;
  }

  return extendedInsiderLeakFlag();
}
