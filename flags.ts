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
const growthbook = createGrowthbookAdapter({
  clientKey: GROWTHBOOK_CLIENT_KEY,
  apiHost: process.env.GROWTHBOOK_API_HOST,
  appOrigin: process.env.GROWTHBOOK_APP_ORIGIN,
});

export const groupClosedFlag = flag<boolean>({
  key: 'group-closed',
  description: 'Close the group and route funnel traffic into the waitlist flow',
  defaultValue: false,
  options: [
    { value: false, label: 'Open' },
    { value: true, label: 'Closed / waitlist only' },
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
} as const;

export const marketingFlags = [groupClosedFlag] as const;
