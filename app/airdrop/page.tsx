import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { ACCESS_PLANS } from '@/lib/access-plans';
import {
  AIRDROP_PAGE_PATH,
  BLINK_PUBLIC_URL,
  WHOP_CIRCLE_URL,
  WHOP_PROMO_CODE,
  WHOP_PROMO_CTA_LABEL,
  WHOP_PROMO_DISCOUNT,
} from '@/lib/campaign-links';
import { getWhopReviewStats } from '@/lib/reviews';
import { getSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '$BLINK Airdrop — RokitG',
  description:
    'Use code BLINK for 80% off on Whop, get inside The Circle, and position for the $BLINK airdrop push.',
  openGraph: {
    title: '$BLINK Airdrop — RokitG',
    description:
      'Code BLINK unlocks 80% off on Whop. Stack the membership plus $BLINK combo and follow the airdrop push.',
    url: getSiteUrl(AIRDROP_PAGE_PATH),
    type: 'website',
  },
};

export default async function AirdropPage() {
  const stats = await getWhopReviewStats();
  const monthlyPlan = ACCESS_PLANS.find((plan) => plan.key === 'monthly');

  return (
    <>
      <SiteNav />

      <main className="platform-page airdrop-page">
        <section className="platform-hero airdrop-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            CODE {WHOP_PROMO_CODE} · {WHOP_PROMO_DISCOUNT} OFF · MEMBER PUSH LIVE
          </div>
          <h1>
            UNLOCK {WHOP_PROMO_DISCOUNT} OFF.
            <br />
            <span className="green">POSITION FOR $BLINK.</span>
          </h1>
          <p className="sub">
            This is the full combo push. Use <strong>code {WHOP_PROMO_CODE}</strong> on Whop for{' '}
            <strong>{WHOP_PROMO_DISCOUNT} off all products</strong>, get inside{' '}
            <strong>The Circle</strong>, and line yourself up for the <strong>$BLINK</strong>{' '}
            member-side airdrop angle.
          </p>
          <div className="platform-actions">
            <a
              href={WHOP_CIRCLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
            >
              {WHOP_PROMO_CTA_LABEL}
            </a>
            <a
              href={BLINK_PUBLIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              OPEN $BLINK →
            </a>
          </div>
        </section>

        <section className="proof-row airdrop-proof-row">
          <div className="proof-cell">
            <div className="proof-num">{stats.memberCount}</div>
            <div className="proof-label">members inside</div>
          </div>
          <div className="proof-cell">
            <div className="proof-num">{stats.averageRating.toFixed(2)}★</div>
            <div className="proof-label">whop rating</div>
          </div>
          <div className="proof-cell">
            <div className="proof-num">{stats.totalReviews}</div>
            <div className="proof-label">published reviews</div>
          </div>
          <div className="proof-cell">
            <div className="proof-num">{WHOP_PROMO_DISCOUNT}</div>
            <div className="proof-label">discount code live</div>
          </div>
        </section>

        <section className="airdrop-offer-shell">
          <div className="airdrop-offer-card">
            <div className="section-tag">{'// THE OFFER'}</div>
            <h2>
              CODE {WHOP_PROMO_CODE}
              <br />
              <span className="green">HITS ALL PRODUCTS.</span>
            </h2>
            <p className="section-sub">
              The aggressive play is simple: use the Whop discount, get into the paid ecosystem
              fast, keep your membership active, and accumulate $BLINK on the side. That is the
              combo: immediate price compression plus token-side airdrop positioning.
            </p>
            <div className="airdrop-offer-grid">
              <div className="airdrop-offer-stat">
                <strong>{WHOP_PROMO_DISCOUNT}</strong>
                <span>off every Whop product with code {WHOP_PROMO_CODE}</span>
              </div>
              <div className="airdrop-offer-stat">
                <strong>{monthlyPlan?.price ?? '$59'}</strong>
                <span>standard monthly price before the code gets applied</span>
              </div>
              <div className="airdrop-offer-stat">
                <strong>$BLINK</strong>
                <span>separate token positioning for the campaign upside</span>
              </div>
            </div>
          </div>

          <div className="airdrop-disclaimer-card">
            <div className="section-tag">{'// IMPORTANT'}</div>
            <h3>Discount and airdrop terms can move.</h3>
            <p>
              Code eligibility, expiry, final product coverage, wallet collection, membership
              snapshots, token thresholds, and any distribution details are subject to change. This
              page is the marketing push for the combo, not a binding claim schedule.
            </p>
            <p>
              The cleanest setup is still the same: redeem code {WHOP_PROMO_CODE}, be an active Whop
              member, hold $BLINK, and watch RokitG channels for the snapshot and claim
              instructions.
            </p>
          </div>
        </section>

        <section>
          <div className="section-tag">{'// HOW TO QUALIFY HARDER'}</div>
          <h2>
            DON&apos;T JUST
            <br />
            <span className="green">WATCH THE PUSH.</span>
          </h2>
          <p className="section-sub">
            If the goal is maximum leverage, the combo matters more than either side alone.
          </p>

          <div className="features-grid airdrop-steps-grid">
            <div className="feature-card">
              <div className="feat-icon">1</div>
              <div className="feat-title">REDEEM CODE {WHOP_PROMO_CODE}</div>
              <p className="feat-desc">
                Take the {WHOP_PROMO_DISCOUNT} discount first. That compresses the buy-in and gets
                you through the front door while the offer is hot.
              </p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">2</div>
              <div className="feat-title">GET INSIDE THE CIRCLE</div>
              <p className="feat-desc">
                Membership is the proof layer. Active subs are the obvious audience to reward when
                the community-side push gets turned up.
              </p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">3</div>
              <div className="feat-title">STACK $BLINK FOR THE PUSH</div>
              <p className="feat-desc">
                Token exposure is the second half of the combo. Stay active, hold the token, and be
                ready when wallet collection or snapshot details go live.
              </p>
            </div>
          </div>
        </section>

        <section className="airdrop-combo-section">
          <div className="section-tag">{'// WHY THE COMBO WORKS'}</div>
          <h2>
            COMMUNITY FLOW
            <br />
            <span className="green">MEETS TOKEN FLOW.</span>
          </h2>
          <div className="airdrop-combo-grid">
            <article className="airdrop-combo-card">
              <span>Whop side</span>
              <strong>Access, proof, and operator proximity</strong>
              <p>
                The Circle is where the trust stack lives: live signals, member proof, and the place
                people actually start paying attention.
              </p>
            </article>
            <article className="airdrop-combo-card">
              <span>$BLINK side</span>
              <strong>Positioning, narrative, and upside attention</strong>
              <p>
                The token creates the external pull. That&apos;s the layer that can amplify the Whop
                membership push and make the whole funnel feel alive.
              </p>
            </article>
            <article className="airdrop-combo-card">
              <span>Combined</span>
              <strong>Best shot at catching the campaign early</strong>
              <p>
                Membership plus token positioning is the highest-signal stance for anyone trying to
                catch the offer before the wider crowd wakes up.
              </p>
            </article>
          </div>
        </section>

        <section className="cta-section airdrop-final-cta">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-tag" style={{ textAlign: 'center' }}>
              {'// GET POSITIONED NOW'}
            </div>
            <h2>
              JOIN THE SUB.
              <br />
              <span className="green">STACK THE TOKEN.</span>
            </h2>
            <p>
              If you want the full push, don&apos;t choose one side. Take the Whop membership and
              the $BLINK exposure together.
            </p>
            <div className="platform-actions">
              <a
                href={WHOP_CIRCLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-cta-blue"
              >
                {WHOP_PROMO_CTA_LABEL}
              </a>
              <a
                href={BLINK_PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                OPEN $BLINK →
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
