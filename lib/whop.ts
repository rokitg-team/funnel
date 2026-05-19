export const WHOP_RETURN_URL = 'https://rokitg.fun/welcome';

export const WHOP_PLANS = [
  {
    id: 'plan_QFUNiFOeal3xK',
    key: 'elite',
    label: 'Elite',
    badge: 'Recommended',
    price: '$59/mo',
    description:
      'Full Circle access with the private signal feed, live chat, and high-conviction entries.',
  },
  {
    id: 'plan_W42reYbE8ViaR',
    key: 'base',
    label: 'Free Trial',
    badge: 'Low friction',
    price: 'Try it free',
    description:
      'The fastest way to get inside, feel the flow, and see how RokitG calls are delivered in real time.',
  },
] as const;

export type PlanKey = (typeof WHOP_PLANS)[number]['key'];

export function getWhopPlan(key: string | null | undefined) {
  return WHOP_PLANS.find((plan) => plan.key === key) ?? WHOP_PLANS[0];
}
