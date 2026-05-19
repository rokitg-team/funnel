import type { Metadata } from 'next';
import { LifetimeCheckout } from '@/components/lifetime-checkout';
import { getRokitEnsVerification } from '@/lib/ens';

export const metadata: Metadata = {
  title: 'Lifetime Deal — The Circle',
  description:
    'Send stablecoins direct for lifetime access to The Circle. Prefer USDC on Base, verify rokitg.eth onchain, and submit your TX for manual approval.',
};

export default async function LifetimePage() {
  const ens = await getRokitEnsVerification();

  return <LifetimeCheckout ens={ens} />;
}
