import type { Metadata } from 'next';
import { JoinCheckout } from '@/components/join-checkout';
import { WaitlistGate } from '@/components/waitlist-gate';
import { getGroupClosedEnabled } from '@/flags';

export const metadata: Metadata = {
  title: 'Join — The Circle',
  description:
    'On-site-first checkout hub for The Circle. Buy lifetime direct with crypto or use Whop as the fallback for trial and monthly access.',
};

export default async function JoinPage() {
  const groupClosed = await getGroupClosedEnabled();

  return (
    <main className="join-page whop-brand">
      {groupClosed ? (
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
