export const WHOP_RETURN_URL = 'https://rokitg.fun/welcome';
export const LIFETIME_JOIN_URL = '/lifetime';
export const LIFETIME_RETURN_PATH = '/lifetime?status=paid';
export const LIFETIME_CRYPTO_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_LIFETIME_CRYPTO_CHECKOUT_URL ?? '';

export type PlanKey = 'free_trial' | 'monthly' | 'lifetime';

export type AccessPlan = {
  key: PlanKey;
  label: string;
  badge: string;
  price: string;
  period: string;
  description: string;
  valueLine: string;
  ctaLabel: string;
  destination: 'whop' | 'direct-crypto';
  featured?: boolean;
  featureList: string[];
  whopPlanId?: string;
};

export const ACCESS_PLANS: readonly AccessPlan[] = [
  {
    key: 'free_trial',
    label: 'Free Trial',
    badge: 'Low friction',
    price: '$0',
    period: 'start free',
    description:
      'Get inside The Circle fast, see how calls land, and decide later if you want to size up.',
    valueLine: 'Best for colder traffic who want proof before they commit.',
    ctaLabel: 'START FREE TRIAL →',
    destination: 'whop',
    featureList: [
      'Fastest way inside',
      'See live call flow',
      'On-site Whop checkout',
      'Upgrade later from inside',
    ],
    whopPlanId: 'plan_W42reYbE8ViaR',
  },
  {
    key: 'monthly',
    label: 'Monthly',
    badge: 'Flexible',
    price: '$59',
    period: 'per month via Whop',
    description:
      'Full recurring Circle access through Whop for buyers who want convenience and a lower upfront commitment.',
    valueLine: 'Best for buyers who want flexibility, card checkout, and standard Whop billing.',
    ctaLabel: 'JOIN MONTHLY →',
    destination: 'whop',
    featureList: [
      'Full signal feed access',
      'Entry, target, and stop levels',
      'Whop billing + renewals',
      'Lower upfront commitment',
    ],
    whopPlanId: 'plan_QFUNiFOeal3xK',
  },
  {
    key: 'lifetime',
    label: 'Lifetime',
    badge: 'Best value',
    price: '$99',
    period: 'limited-time via stablecoins',
    description:
      'Buy direct with stablecoins, skip recurring billing, and lock permanent Circle access through the strongest limited-time on-site offer.',
    valueLine:
      'Top recommendation for serious buyers because direct crypto lets us bypass Whop fees.',
    ctaLabel: 'BUY LIFETIME DIRECT →',
    destination: 'direct-crypto',
    featured: true,
    featureList: [
      'Lifetime access to The Circle',
      'Direct crypto purchase on-site',
      'Priority onboarding handoff',
      'Bonus founder-style perks and direct-buy savings',
    ],
  },
] as const;

export function getAccessPlan(key: string | null | undefined) {
  return ACCESS_PLANS.find((plan) => plan.key === key) ?? ACCESS_PLANS[2];
}

export function isWhopPlan(plan: AccessPlan): plan is AccessPlan & { whopPlanId: string } {
  return plan.destination === 'whop' && Boolean(plan.whopPlanId);
}

export function getJoinPlanHref(key: PlanKey, extras: Record<string, string | undefined> = {}) {
  const url = new URL('/join', 'https://rokitg.fun');
  url.searchParams.set('plan', key);

  for (const [param, value] of Object.entries(extras)) {
    if (value) {
      url.searchParams.set(param, value);
    }
  }

  return `${url.pathname}${url.search}`;
}

export function getLifetimeJoinHref(extras: Record<string, string | undefined> = {}) {
  const url = new URL(LIFETIME_JOIN_URL, 'https://rokitg.fun');

  for (const [param, value] of Object.entries(extras)) {
    if (value) {
      url.searchParams.set(param, value);
    }
  }

  return `${url.pathname}${url.search}`;
}

export function getLifetimePrimaryHref(extras: Record<string, string | undefined> = {}) {
  if (LIFETIME_CRYPTO_CHECKOUT_URL) {
    return LIFETIME_CRYPTO_CHECKOUT_URL;
  }

  return getLifetimeJoinHref(extras);
}

export function getLifetimePrimaryAnchorAttrs() {
  return LIFETIME_CRYPTO_CHECKOUT_URL ? 'target="_blank" rel="noopener noreferrer"' : '';
}
