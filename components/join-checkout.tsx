'use client';

import { useCheckoutEmbedControls, WhopCheckoutEmbed } from '@whop/checkout/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getWhopPlan, type PlanKey, WHOP_PLANS, WHOP_RETURN_URL } from '@/lib/whop';

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
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('base');
  const [checkoutState, setCheckoutState] = useState<'loading' | 'ready' | 'disabled'>('loading');
  const [identityEmail, setIdentityEmail] = useState(searchParams.get('email') ?? '');
  const controlsRef = useCheckoutEmbedControls();

  useEffect(() => {
    const planFromQuery = searchParams.get('plan');
    if (planFromQuery === 'base' || planFromQuery === 'elite') {
      setSelectedPlan(planFromQuery);
    }
  }, [searchParams]);

  const stateId = searchParams.get('state_id') ?? undefined;
  const variant = searchParams.get('variant') ?? 'join-direct';
  const source = searchParams.get('cta') ?? 'join';
  const currentPlan = getWhopPlan(selectedPlan);

  return (
    <div className="join-shell">
      <div className="join-head">
        <Link href="/" className="join-brand">
          ROKIT<span>G</span>
        </Link>
        <div className="join-status">{checkoutState}</div>
      </div>

      <div className="join-stage">
        <div className="join-copy">
          <div className="section-tag">{'// DIRECT CHECKOUT'}</div>
          <h1>
            JOIN NOW.
            <br />
            <span className="green">NSTANT ACCESS.</span>
          </h1>

          <div className="join-plan-switcher" role="tablist" aria-label="Choose your plan">
            {WHOP_PLANS.map((plan) => {
              const isActive = plan.key === selectedPlan;

              return (
                <button
                  key={plan.id}
                  type="button"
                  className={`join-plan-pill${isActive ? ' is-active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedPlan(plan.key);
                    track(`join-${plan.key}-plan`, {
                      location: 'join-plan-switcher',
                      plan: plan.key,
                    });
                  }}
                >
                  <strong>{plan.label}</strong>
                  <span>{plan.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="join-panel">
          <WhopCheckoutEmbed
            key={`${currentPlan.id}-${stateId ?? 'fresh'}`}
            ref={controlsRef}
            adaptivePricing
            planId={currentPlan.id}
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
            onPromoCodeChanged={(promoCode) => {
              if (promoCode) {
                track('join-promo-applied', { source, variant, plan: currentPlan.key });
              }
            }}
            onComplete={() => {
              track('join-checkout-complete', { source, variant, plan: currentPlan.key });
            }}
            onStateChange={(state) => {
              setCheckoutState(state);
              track(`join-checkout-${state}`, { source, variant, plan: currentPlan.key });
            }}
            fallback={
              <div className="checkout-loading">
                <div className="checkout-loading-bar" />
                <span>Loading checkout...</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
