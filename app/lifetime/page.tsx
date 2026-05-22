import type { Metadata } from 'next';
import { LifetimeCheckout } from '@/components/lifetime-checkout';
import { WaitlistGate } from '@/components/waitlist-gate';
import { getGroupClosedEnabled, getLifetimeDealHeroEnabled } from '@/flags';
import { getRokitEnsVerification } from '@/lib/ens';
import { getWhopReviewStats } from '@/lib/reviews';

export const metadata: Metadata = {
  title: 'Lifetime Deal — The Circle',
  description:
    'Limited-time lifetime offer: pay $99 in stablecoins for The Circle instead of $199. Prefer USDC on Base, verify rokitg.eth onchain, and submit your TX for manual approval.',
};

export default async function LifetimePage() {
  const [groupClosed, showOfferHero] = await Promise.all([
    getGroupClosedEnabled(),
    getLifetimeDealHeroEnabled(),
  ]);

  if (groupClosed) {
    return (
      <main className="lifetime-page">
        <WaitlistGate
          source="lifetime"
          heading="DIRECT ACCESS IS"
          accent="LOCKED FOR NOW."
          subtitle="Lifetime is the strongest path, but it’s paused while the group is capped. Join the waitlist to get priority notice when direct crypto access reopens."
        />
      </main>
    );
  }

  const [ens, reviewStats] = await Promise.all([getRokitEnsVerification(), getWhopReviewStats()]);

  return <LifetimeCheckout ens={ens} reviewStats={reviewStats} showOfferHero={showOfferHero} />;
}
