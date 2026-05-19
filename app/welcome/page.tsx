import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { WelcomeOnboarding } from '@/components/welcome-onboarding';

export const metadata: Metadata = {
  title: 'Welcome — The Circle',
  description:
    'Step-by-step onboarding for The Circle. Join Discord, open the signal feed, and save direct contact links after checkout.',
};

export default function WelcomePage() {
  return (
    <>
      <SiteNav />

      <main className="platform-page whop-bg whop-brand">
        <section className="platform-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            THE CIRCLE — WELCOME GUIDE
          </div>
          <WelcomeOnboarding />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
