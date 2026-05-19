import type { Metadata } from 'next';
import { JoinCheckout } from '@/components/join-checkout';
import { WaitlistGate } from '@/components/waitlist-gate';
import { closedDoorModeFlag, getEffectiveClosedDoorMode, groupClosedFlag } from '@/flags';

export const metadata: Metadata = {
  title: 'Join — The Circle',
  description:
    'On-site-first checkout hub for The Circle. Buy lifetime direct with crypto or use Whop as the fallback for trial and monthly access.',
};

export default async function JoinPage() {
  const [groupClosed, closedDoorMode] = await Promise.all([
    groupClosedFlag(),
    closedDoorModeFlag(),
  ]);
  const effectiveClosedDoorMode = getEffectiveClosedDoorMode(closedDoorMode, groupClosed);

  return (
    <main className="join-page whop-brand">
      {effectiveClosedDoorMode === 'hard-close' ? (
        <WaitlistGate
          source="join"
          heading="CHECKOUT IS"
          accent="PAUSED."
          subtitle="The direct join flow is temporarily closed. Join the waitlist here and we’ll reach back out first when new spots open."
          compact
        />
      ) : (
        <JoinCheckout />
      )}
    </main>
  );
}
