import { vercelAdapter } from '@flags-sdk/vercel';
import { flag } from 'flags/next';
import {
  getJoinPlanHref,
  getLifetimePrimaryAnchorAttrs,
  getLifetimePrimaryHref,
  type PlanKey,
} from '@/lib/access-plans';
import { getWaitlistHref } from '@/lib/waitlist';

export const WHOP_URL = 'https://whop.com/joined/the-circle-vip/products/the-circle-monthly/';

export type WhopCtaExperimentVariant = 'control' | 'embed-base-scroll';
export type HomepagePrimaryOfferVariant = 'lifetime-direct' | 'free-trial' | 'waitlist-apply';
export type ProofBlockVariant = 'platform-proof' | 'community-proof' | 'results-proof';
export type ClosedDoorModeVariant = 'open' | 'soft-close' | 'hard-close';

export type WhopCtaLocation =
  | 'hero'
  | 'promo-banner'
  | 'nav'
  | 'discord-preview'
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

export const groupClosedFlag = flag<boolean>({
  key: 'group-closed',
  description: 'Close the group and route funnel traffic into the waitlist flow',
  defaultValue: false,
  options: [
    { value: false, label: 'Open' },
    { value: true, label: 'Closed / waitlist only' },
  ],
  adapter: vercelAdapter(),
});

export const homepagePrimaryOfferFlag = flag<HomepagePrimaryOfferVariant>({
  key: 'homepage-primary-offer',
  description: 'Tests which primary offer should lead the homepage funnel',
  defaultValue: 'lifetime-direct',
  options: [
    { value: 'lifetime-direct', label: 'Push direct lifetime first' },
    { value: 'free-trial', label: 'Lead with free trial' },
    { value: 'waitlist-apply', label: 'Lead with waitlist / apply' },
  ],
  adapter: vercelAdapter(),
});

export const proofBlockVariantFlag = flag<ProofBlockVariant>({
  key: 'proof-block-variant',
  description: 'Tests which proof section earns the strongest homepage conversion lift',
  defaultValue: 'platform-proof',
  options: [
    { value: 'platform-proof', label: 'Whop / members / verified X proof' },
    { value: 'community-proof', label: 'Community structure and Discord feel' },
    { value: 'results-proof', label: 'Results and operator review proof' },
  ],
  adapter: vercelAdapter(),
});

export const closedDoorModeFlag = flag<ClosedDoorModeVariant>({
  key: 'closed-door-mode',
  description: 'Tests scarcity intensity from fully open to full waitlist takeover',
  defaultValue: 'open',
  options: [
    { value: 'open', label: 'Normal open funnel' },
    { value: 'soft-close', label: 'Almost full banner while checkout stays open' },
    { value: 'hard-close', label: 'Waitlist-only takeover mode' },
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
    case 'discord-preview':
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
    location === 'discord-preview' ||
    location === 'promo-banner' ||
    location === 'pricing-lifetime' ||
    location === 'final-cta'
  ) {
    return getLifetimePrimaryAnchorAttrs();
  }

  const href = getWhopCtaHref(location, variant);
  return href.startsWith('https://') ? 'target="_blank" rel="noopener noreferrer"' : '';
}

export function getMarketingCtaHref(
  location: WhopCtaLocation,
  variant: WhopCtaExperimentVariant,
  groupClosed: boolean,
) {
  if (groupClosed) {
    return getWaitlistHref({ cta: location, variant, mode: 'closed' });
  }

  return getWhopCtaHref(location, variant);
}

export function getMarketingCtaAnchorAttrs(
  location: WhopCtaLocation,
  variant: WhopCtaExperimentVariant,
  groupClosed: boolean,
) {
  if (groupClosed) {
    return '';
  }

  return getWhopCtaAnchorAttrs(location, variant);
}

export function getEffectiveClosedDoorMode(
  closedDoorMode: ClosedDoorModeVariant,
  groupClosed: boolean,
) {
  return groupClosed ? 'hard-close' : closedDoorMode;
}

export const flagDefinitions = {
  mainCtaFlag,
  whopCtaExperiment,
  groupClosedFlag,
  homepagePrimaryOfferFlag,
  proofBlockVariantFlag,
  closedDoorModeFlag,
} as const;

export const marketingFlags = [
  mainCtaFlag,
  whopCtaExperiment,
  groupClosedFlag,
  homepagePrimaryOfferFlag,
  proofBlockVariantFlag,
  closedDoorModeFlag,
] as const;
