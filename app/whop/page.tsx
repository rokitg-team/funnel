import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { WhopStore } from '@/components/whop-store';

export const metadata: Metadata = {
  title: 'Join The Circle — RokitG VIP',
  description:
    'Paid VIP crypto signals from @rokitdotgg. 42 operators inside. 5.0★ average. Real-time entries, targets, and stops.',
};

export default function WhopPage() {
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
            Real-time memecoin &amp; altcoin signals from <strong>@rokitdotgg</strong>. Entries,
            targets, stops — every call delivered the moment it&apos;s live.
            <br />
            <strong>$TON doubled after the call.</strong> And we&apos;re just getting started.
          </p>
          <div className="platform-actions">
            <Link href="#checkout" className="btn-primary btn-cta-blue">
              START CHECKOUT
            </Link>
            <Link href="/#pricing" className="btn-ghost">
              SEE PRICING ↓
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
            No noise. No BS. Just clean signals with entries, targets, and stops — delivered when it
            matters.
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
              The next call drops when you least expect it. Be inside when it does, without leaving
              the page.
            </p>
            <Link
              href="#checkout"
              className="btn-primary btn-cta-blue"
              style={{ fontSize: 15, padding: '20px 48px' }}
            >
              GO TO CHECKOUT
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
