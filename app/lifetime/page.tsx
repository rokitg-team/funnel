import type { Metadata } from 'next';
import { LifetimeCheckout } from '@/components/lifetime-checkout';
import { WaitlistGate } from '@/components/waitlist-gate';
import { closedDoorModeFlag, getEffectiveClosedDoorMode, groupClosedFlag } from '@/flags';
import { getRokitEnsVerification } from '@/lib/ens';

export const metadata: Metadata = {
  title: 'Lifetime Deal — The Circle',
  description:
    'Send stablecoins direct for lifetime access to The Circle. Prefer USDC on Base, verify rokitg.eth onchain, and submit your TX for manual approval.',
};

export default async function LifetimePage() {
  const [groupClosed, closedDoorMode] = await Promise.all([
    groupClosedFlag(),
    closedDoorModeFlag(),
  ]);
  const effectiveClosedDoorMode = getEffectiveClosedDoorMode(closedDoorMode, groupClosed);

  if (effectiveClosedDoorMode === 'hard-close') {
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

  const ens = await getRokitEnsVerification();

  return <LifetimeCheckout ens={ens} />;
}
