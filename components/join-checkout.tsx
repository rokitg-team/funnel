'use client';

import { useCheckoutEmbedControls, WhopCheckoutEmbed } from '@whop/checkout/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ACCESS_PLANS,
  getAccessPlan,
  getLifetimeJoinHref,
  getLifetimePrimaryHref,
  isWhopPlan,
  type PlanKey,
  WHOP_RETURN_URL,
} from '@/lib/access-plans';
import { TELEGRAM_URL, WHATSAPP_URL } from '@/lib/contact';

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

export function JoinCheckout() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('lifetime');
  const [checkoutState, setCheckoutState] = useState<'loading' | 'ready' | 'disabled'>('loading');
  const [identityEmail, setIdentityEmail] = useState(searchParams.get('email') ?? '');
  const controlsRef = useCheckoutEmbedControls();

  useEffect(() => {
    const planFromQuery = searchParams.get('plan');
    if (
      planFromQuery === 'free_trial' ||
      planFromQuery === 'monthly' ||
      planFromQuery === 'lifetime'
    ) {
      setSelectedPlan(planFromQuery);
    } else {
      setSelectedPlan('lifetime');
    }
  }, [searchParams]);

  const stateId = searchParams.get('state_id') ?? undefined;
  const variant = searchParams.get('variant') ?? 'join-direct';
  const source = searchParams.get('cta') ?? 'join';
  const currentPlan = getAccessPlan(selectedPlan);
  const lifetimeHref = getLifetimeJoinHref({ source, variant, selected: selectedPlan });
  const lifetimePrimaryHref = getLifetimePrimaryHref({ source, variant, selected: selectedPlan });
  const manualFallbackHref = WHATSAPP_URL || TELEGRAM_URL;

  return (
    <div className="join-shell">
      <div className="join-head">
        <Link href="/" className="join-brand">
          ROKIT<span>G</span>
        </Link>
        <div className="join-status">
          {currentPlan.destination === 'direct-crypto' ? 'direct crypto preferred' : checkoutState}
        </div>
      </div>

      <div className="join-stage">
        <div className="join-copy">
          <div>
            <div className="section-tag">{'// ON-SITE-FIRST CHECKOUT'}</div>
            <h1>
              BUY DIRECT.
              <br />
              <span className="green">LOCK LIFETIME.</span>
            </h1>
            <p className="join-subtitle">
              The direct crypto lifetime plan is the best-value path on-site. Whop stays here for
              trial and monthly buyers who want lower commitment.
            </p>
          </div>

          <div className="join-plan-switcher" role="tablist" aria-label="Choose your plan">
            {ACCESS_PLANS.map((plan) => {
              const isActive = plan.key === selectedPlan;
              const classes = `join-plan-pill${isActive ? ' is-active' : ''}${
                plan.featured ? ' is-featured' : ''
              }`;

              return (
                <button
                  key={plan.key}
                  type="button"
                  className={classes}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedPlan(plan.key);
                  }}
                >
                  <div>
                    <strong>{plan.label}</strong>
                    <span className="join-plan-period">{plan.period}</span>
                  </div>
                  <div className="join-plan-meta">
                    <span className="join-plan-badge">{plan.badge}</span>
                    <span>{plan.price}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="join-panel">
          {currentPlan.destination === 'direct-crypto' ? (
            <div className="direct-offer-panel">
              <div className="checkout-panel-head">
                <div>
                  <div className="checkout-panel-label">Preferred payment route</div>
                  <div className="checkout-panel-title">Lifetime via Crypto</div>
                </div>
                <div className="checkout-panel-state is-ready">best value</div>
              </div>

              <div className="direct-offer-kicker">
                Buy direct, bypass Whop fees, keep the edge.
              </div>
              <p className="direct-offer-copy">
                One payment. Permanent access. Priority onboarding after payment and the strongest
                on-site offer for serious buyers.
              </p>

              <div className="direct-offer-grid">
                <div className="direct-offer-stat">
                  <strong>$99</strong>
                  <span>one-time</span>
                </div>
                <div className="direct-offer-stat">
                  <strong>Lifetime</strong>
                  <span>no recurring billing</span>
                </div>
                <div className="direct-offer-stat">
                  <strong>Direct</strong>
                  <span>crypto-first purchase</span>
                </div>
              </div>

              <ul className="direct-offer-list">
                {currentPlan.featureList.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="direct-offer-actions">
                <a
                  href={lifetimePrimaryHref}
                  target={lifetimePrimaryHref.startsWith('http') ? '_blank' : undefined}
                  rel={lifetimePrimaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="btn-primary btn-cta-blue"
                  onClick={() =>
                    track('lifetime-deal-init', {
                      location: 'join-panel',
                      source,
                      variant,
                      plan: currentPlan.key,
                    })
                  }
                >
                  {lifetimePrimaryHref.startsWith('http')
                    ? 'OPEN CRYPTO CHECKOUT →'
                    : 'REVIEW LIFETIME CHECKOUT →'}
                </a>
                <a
                  href={manualFallbackHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  {WHATSAPP_URL ? 'ASK ON WHATSAPP' : 'ASK ON TELEGRAM'}
                </a>
              </div>

              <p className="checkout-caption">
                You&apos;ll review the lifetime offer on-site first, then continue to the configured
                crypto payment step and return for manual onboarding confirmation.
              </p>
            </div>
          ) : isWhopPlan(currentPlan) ? (
            <>
              <div className="checkout-panel-head">
                <div>
                  <div className="checkout-panel-label">Whop fallback checkout</div>
                  <div className="checkout-panel-title">{currentPlan.label}</div>
                </div>
                <div className={`checkout-panel-state is-${checkoutState}`}>{checkoutState}</div>
              </div>

              <div className="whop-fallback-banner">
                <span>Prefer the stronger direct deal?</span>
                <Link
                  href={lifetimeHref}
                  onClick={() =>
                    track('lifetime-deal-init', {
                      location: 'join-fallback-banner',
                      source,
                      variant,
                      plan: 'lifetime',
                    })
                  }
                >
                  Switch to lifetime crypto →
                </Link>
              </div>

              <WhopCheckoutEmbed
                key={`${currentPlan.whopPlanId}-${stateId ?? 'fresh'}`}
                ref={controlsRef}
                adaptivePricing
                planId={currentPlan.whopPlanId}
                prefill={identityEmail ? { email: identityEmail } : undefined}
                returnUrl={WHOP_RETURN_URL}
                stateId={stateId}
                theme="dark"
                themeOptions={{ accentColor: 'orange' }}
                styles={{ container: { paddingX: 10, paddingY: 8 } }}
                onIdentityCaptured={(data) => {
                  if (data.email) {
                    setIdentityEmail(data.email);
                  }
                }}
                onComplete={() => {
                  if (currentPlan.key === 'free_trial') {
                    track('free-trial-success', { source, variant, plan: currentPlan.key });
                    return;
                  }

                  track('monthly-success', { source, variant, plan: currentPlan.key });
                }}
                onStateChange={(state) => {
                  setCheckoutState(state);
                }}
                fallback={
                  <div className="checkout-loading">
                    <div className="checkout-loading-bar" />
                    <span>Loading Whop checkout...</span>
                  </div>
                }
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
