import type { Metadata } from 'next';
import { JoinCheckout } from '@/components/join-checkout';

export const metadata: Metadata = {
  title: 'Join — The Circle',
  description:
    'Full-screen embedded checkout for The Circle. Pay on rokitg.fun and land on the welcome guide after purchase.',
};

export default function JoinPage() {
  return (
    <main className="join-page whop-brand">
      <JoinCheckout />
    </main>
  );
}
