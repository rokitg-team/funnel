'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  ACCESS_PLANS,
  getJoinPlanHref,
  LIFETIME_CRYPTO_CHECKOUT_URL,
  LIFETIME_RETURN_PATH,
} from '@/lib/access-plans';
import { TELEGRAM_DISPLAY, TELEGRAM_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/contact';

function track(
  name: string,
  data: Record<string, string | number | boolean | null | undefined> = {},
) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const analytics = (window as typeof window & { va?: (...args: unknown[]) => void }).va;
    analytics?.('event', { name, data });
  } catch {}
}

const lifetimePlan = ACCESS_PLANS.find((plan) => plan.key === 'lifetime') ?? ACCESS_PLANS[2];

export function LifetimeCheckout() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const source = searchParams.get('source') ?? 'join';
  const variant = searchParams.get('variant') ?? 'direct';
  const checkoutHref = LIFETIME_CRYPTO_CHECKOUT_URL || WHATSAPP_URL || TELEGRAM_URL;
  const showSuccess = status === 'paid' || status === 'success';

  useEffect(() => {
    track('lifetime-card-view', { location: 'lifetime-page', source, variant });
    if (showSuccess) {
      track('manual-onboarding-open', { location: 'lifetime-success', source, variant });
    }
  }, [showSuccess, source, variant]);

  return (
    <main className="lifetime-page whop-brand">
      <div className="join-shell lifetime-shell">
        <div className="join-head">
          <Link href="/" className="join-brand">
            ROKIT<span>G</span>
          </Link>
          <div className="join-status">
            {showSuccess ? 'payment confirmed' : 'direct crypto checkout'}
          </div>
        </div>

        <div className="lifetime-stage">
          <section className="lifetime-hero-card">
            <div className="section-tag">{'// BEST-VALUE ACCESS PATH'}</div>
            <h1>
              BUY DIRECT.
              <br />
              <span className="green">STAY IN FOREVER.</span>
            </h1>
            <p className="join-subtitle">
              This is the strongest offer on the site: a one-time crypto payment for permanent
              Circle access, priority onboarding, and no recurring Whop billing.
            </p>

            <div className="lifetime-stat-row">
              <div className="lifetime-stat-card">
                <strong>{lifetimePlan.price}</strong>
                <span>{lifetimePlan.period}</span>
              </div>
              <div className="lifetime-stat-card">
                <strong>Direct</strong>
                <span>crypto checkout path</span>
              </div>
              <div className="lifetime-stat-card">
                <strong>Priority</strong>
                <span>manual onboarding handoff</span>
              </div>
            </div>

            <ul className="direct-offer-list">
              {lifetimePlan.featureList.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            {!showSuccess ? (
              <div className="direct-offer-actions">
                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-cta-blue"
                  onClick={() =>
                    track('lifetime-cta', {
                      location: 'lifetime-page-primary',
                      source,
                      variant,
                      plan: 'lifetime',
                    })
                  }
                >
                  OPEN CRYPTO CHECKOUT →
                </a>
                <Link
                  href={getJoinPlanHref('monthly', { cta: 'lifetime-fallback', variant })}
                  className="btn-ghost"
                  onClick={() =>
                    track('whop-fallback-select', {
                      location: 'lifetime-page-fallback',
                      source,
                      variant,
                      plan: 'monthly',
                    })
                  }
                >
                  I&apos;D RATHER USE WHOP
                </Link>
              </div>
            ) : (
              <div className="checkout-result success lifetime-success-card">
                <div className="checkout-result-label">Manual onboarding</div>
                <h3>Payment sent. Claim your access.</h3>
                <p>
                  Message RokitG with your payment proof so your lifetime access can be activated
                  fast. This handoff is expected for direct crypto buyers.
                </p>

                <div className="lifetime-success-links">
                  <a
                    href={WHATSAPP_URL || TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-cta-blue"
                    onClick={() =>
                      track('manual-onboarding-open', {
                        location: 'lifetime-success-contact',
                        source,
                        variant,
                      })
                    }
                  >
                    {WHATSAPP_URL ? 'OPEN WHATSAPP' : 'OPEN TELEGRAM'}
                  </a>
                  <Link href="/welcome" className="btn-ghost">
                    OPEN WELCOME GUIDE
                  </Link>
                </div>

                <p className="checkout-caption">
                  Contact: <strong>{WHATSAPP_DISPLAY || TELEGRAM_DISPLAY}</strong>. If your
                  processor supports redirect URLs, point post-payment return back to{' '}
                  <strong>{LIFETIME_RETURN_PATH}</strong>.
                </p>
              </div>
            )}
          </section>

          <aside className="lifetime-side-card">
            <div className="checkout-panel-label">Why buy direct</div>
            <div className="checkout-panel-title">Direct beats recurring.</div>
            <div className="lifetime-side-copy">
              <p>
                We keep more margin, you lock better value, and the site closes the sale on-domain.
              </p>
              <p>
                Whop is still there for trial and monthly buyers, but lifetime is the top-priority
                path we want serious operators to take.
              </p>
            </div>

            <div className="lifetime-note-card">
              <span>Operator note</span>
              <strong>Return here after payment.</strong>
              <p>
                Once you complete the crypto checkout, come back to this page with `?status=paid` or
                use the confirmation link from your processor to trigger the onboarding state.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
