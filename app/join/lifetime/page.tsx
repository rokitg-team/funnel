import type { Metadata } from 'next';
import { LifetimeCheckout } from '@/components/lifetime-checkout';

export const metadata: Metadata = {
  title: 'Lifetime Access — The Circle',
  description:
    'Direct crypto checkout for lifetime access to The Circle. Buy on-site, bypass recurring billing, and claim onboarding after payment.',
};

export default function LifetimeJoinPage() {
  return <LifetimeCheckout />;
}
