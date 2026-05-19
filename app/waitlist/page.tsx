import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { WaitlistGate } from '@/components/waitlist-gate';

export const metadata: Metadata = {
  title: 'Waitlist — The Circle',
  description:
    'The Circle is temporarily closed. Join the waitlist to hear first when the next intake batch opens.',
};

export default async function WaitlistPage() {
  return (
    <>
      <SiteNav />
      <main className="platform-page waitlist-page-shell">
        <WaitlistGate
          source="waitlist-page"
          heading="THE NEXT"
          accent="INTAKE STARTS HERE."
          subtitle="Access is closed for now. Drop into the waitlist and you’ll be first in line for the next opening, direct-buy window, or priority intake message."
        />
      </main>
      <SiteFooter />
    </>
  );
}
