import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { WaitlistGate } from '@/components/waitlist-gate';
import { WhopStore } from '@/components/whop-store';
import { getGroupClosedEnabled } from '@/flags';
import { getLifetimeJoinHref } from '@/lib/access-plans';

export const metadata: Metadata = {
  title: 'Join The Circle — RokitG VIP',
  description:
    'Whop checkout fallback for The Circle. Trial and monthly access for buyers who want flexibility, with direct lifetime crypto as the preferred route.',
};

export default async function WhopPage() {
  const groupClosed = await getGroupClosedEnabled();

  if (groupClosed) {
    return (
      <>
        <SiteNav />
        <main className="platform-page whop-bg whop-brand waitlist-page-shell">
          <WaitlistGate
            source="whop"
            heading="WHOP ACCESS IS"
            accent="CURRENTLY CLOSED."
            subtitle="Trial and monthly are paused for now. Join the waitlist and you’ll be first to know when the next intake or fallback checkout window opens."
          />
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteNav />

      <main className="platform-page whop-bg whop-brand">
        <section className="platform-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            THE CIRCLE — LIVE · 42 OPERATORS INSIDE
          </div>
          <h1>
            JOIN THE CIRCLE.
            <br />
            <span className="green">PRINT TOGETHER.</span>
          </h1>
          <p className="sub">
            Use Whop if you want the lower-commitment route for trial or monthly access.
            <br />
            <strong>Direct lifetime via crypto is the top-value path.</strong> This page is the
            fallback for buyers who still want the Whop convenience layer.
            <br />
            Real-time memecoin &amp; altcoin signals from <strong>@rokitdotgg</strong>, delivered
            the moment the call is live.
          </p>
          <div className="platform-actions">
            <Link href="#checkout" className="btn-primary btn-cta-blue">
              USE WHOP CHECKOUT
            </Link>
            <Link
              href={getLifetimeJoinHref({ source: 'whop-hero', variant: 'direct-lifetime' })}
              className="btn-ghost"
            >
              BUY LIFETIME DIRECT →
            </Link>
          </div>
        </section>

        <div className="stats">
          <div className="stat-cell">
            <div className="stat-num" data-target="0%">
              0%
            </div>
            <div className="stat-label">Churn Rate</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num" data-target="+50">
              +50
            </div>
            <div className="stat-label">Seasoned Traders</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num" data-target="100000" data-prefix="$" data-suffix="K+">
              $100,000
            </div>
            <div className="stat-label">Members Profited</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">5.0</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        <section id="features">
          <div className="section-tag">{'// WHAT YOU GET'}</div>
          <h2>
            EVERY CALL.
            <br />
            <span className="green">EVERY EDGE.</span>
          </h2>
          <p className="section-sub">
            Whop is here for flexibility. If you already know you&apos;re in, the direct lifetime
            route is the better buy.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feat-icon">⚡</div>
              <div className="feat-title">REAL-TIME SIGNALS</div>
              <p className="feat-desc">
                Instant alerts for memecoins and alts with precise entry zones. Never miss a setup.
              </p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">🎯</div>
              <div className="feat-title">ENTRY + TARGETS</div>
              <p className="feat-desc">
                Every call comes with clear entry price, multiple take-profit targets, and stop-loss
                levels.
              </p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">👥</div>
              <div className="feat-title">PRIVATE COMMUNITY</div>
              <p className="feat-desc">
                A tight-knit group of serious traders. Share setups, ask questions, learn faster
                together.
              </p>
            </div>
          </div>
        </section>

        <section id="checkout" className="checkout-section">
          <Suspense fallback={<div className="checkout-loading">Loading Whop checkout...</div>}>
            <WhopStore />
          </Suspense>
        </section>

        <section className="cta-section">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-tag" style={{ textAlign: 'center' }}>
              {'// JOIN TODAY'}
            </div>
            <h2>
              STOP WATCHING.
              <br />
              <span className="green">START WINNING.</span>
            </h2>
            <p>
              Want the strongest on-site offer instead? Skip recurring billing and take the direct
              lifetime crypto path.
            </p>
            <Link
              href={getLifetimeJoinHref({ source: 'whop-final', variant: 'direct-lifetime' })}
              className="btn-primary btn-cta-blue"
              style={{ fontSize: 15, padding: '20px 48px' }}
            >
              GO DIRECT →
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
