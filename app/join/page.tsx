import type { Metadata } from 'next';
import { JoinCheckout } from '@/components/join-checkout';

export const metadata: Metadata = {
  title: 'Join — The Circle',
  description:
    'On-site-first checkout hub for The Circle. Buy lifetime direct with crypto or use Whop as the fallback for trial and monthly access.',
};

export default function JoinPage() {
  return (
    <main className="join-page whop-brand">
      <JoinCheckout />
    </main>
  );
}
