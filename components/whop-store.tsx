'use client';

import { useCheckoutEmbedControls, WhopCheckoutEmbed } from '@whop/checkout/react';
import { ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DISCORD_LABEL, TELEGRAM_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/contact';
import { type PlanKey, WHOP_PLANS, WHOP_RETURN_URL } from '@/lib/whop';

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

export function WhopStore() {
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('base');
  const [checkoutState, setCheckoutState] = useState<'loading' | 'ready' | 'disabled'>('loading');
  const [receiptId, setReceiptId] = useState<string | null>(searchParams.get('receipt_id'));
  const [identityEmail, setIdentityEmail] = useState(searchParams.get('email') ?? '');
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const controlsRef = useCheckoutEmbedControls();

  const ctaSource = searchParams.get('cta');
  const status = searchParams.get('status');
  const stateId = searchParams.get('state_id') ?? undefined;
  const variant = searchParams.get('variant') ?? 'direct';
  const isSuccess = status === 'success' || receiptId !== null;
  const hasError = status === 'error';

  useEffect(() => {
    const planFromQuery = searchParams.get('plan');
    if (planFromQuery === 'base' || planFromQuery === 'elite') {
      setSelectedPlan(planFromQuery);
    }
  }, [searchParams]);

  const currentPlan = WHOP_PLANS.find((plan) => plan.key === selectedPlan) ?? WHOP_PLANS[0];

  return (
    <section className="checkout-shell" aria-labelledby="checkout-title">
      <div className="checkout-copy">
        <div className="section-tag">{'// CHECK OUT WITHOUT LEAVING ROKITG.FUN'}</div>
        <h2 id="checkout-title">
          FREE TRIAL
          <br />
          <span className="green">INSTANT ACCESS.</span>
        </h2>
        {ctaSource ? (
          <p className="checkout-intent-note">
            Use code <strong>ALPHA</strong> for 10% off on all plans.
          </p>
        ) : null}

        <div className="checkout-plan-grid" role="tablist" aria-label="Choose a Whop plan">
          {WHOP_PLANS.map((plan) => {
            const isActive = plan.key === selectedPlan;

            return (
              <button
                key={plan.id}
                type="button"
                className={`checkout-plan-card${isActive ? ' is-active' : ''}`}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedPlan(plan.key);
                  setReceiptId(null);
                  track(`whop-${plan.key}-plan`, {
                    location: 'whop-plan-selector',
                    plan: plan.key,
                  });
                }}
              >
                <div className="checkout-plan-topline">
                  <span className="checkout-plan-name">{plan.label}</span>
                  <span className="checkout-plan-badge">{plan.badge}</span>
                </div>
                <div className="checkout-plan-price">{plan.price}</div>
                <p>{plan.description}</p>
              </button>
            );
          })}
        </div>

        <div className="checkout-mini-proof">
          <div className="checkout-proof-card checkout-proof-card-whop">
            <Image
              src="/brand/whop-logo.png"
              alt="Whop"
              className="checkout-proof-logo"
              width={56}
              height={56}
            />
            <strong>5.0★</strong>
            <span>Whop rating</span>
          </div>
          <div className="checkout-proof-card checkout-proof-card-members">
            <div className="checkout-proof-icon checkout-proof-icon-members" aria-hidden="true">
              <Users size={20} strokeWidth={2.2} />
            </div>
            <strong>42</strong>
            <span>Seasoned traders</span>
          </div>
          <div className="checkout-proof-card checkout-proof-card-onsite">
            <div className="checkout-proof-icon checkout-proof-icon-onsite" aria-hidden="true">
              <ShieldCheck size={20} strokeWidth={2.2} />
            </div>
            <strong>On-site</strong>
            <span>No off-domain redirect</span>
          </div>
        </div>
      </div>

      <div className="checkout-panel">
        {isSuccess ? (
          <div className="checkout-result success">
            <div className="checkout-result-label">Payment received</div>
            <h3>You&apos;re in.</h3>
            <p>
              Your Whop checkout completed successfully. Head into The Circle and get ready for the
              next call.
            </p>
            {receiptId ? <div className="checkout-result-meta">Receipt: {receiptId}</div> : null}
            <div className="success-guide">
              <div className="success-guide-header">
                <div className="checkout-result-label">What to do next</div>
                <div className="success-guide-title">Fast setup guide</div>
              </div>
              <ol className="success-steps">
                <li>
                  <strong>Open The Circle on Whop.</strong> This is where access is activated right
                  away after payment.
                </li>
                <li>
                  <strong>Join the Discord.</strong> Inside Whop, look for the community/chat area
                  and connect the server with one click.
                </li>
                <li>
                  <strong>Find RokitG on Telegram.</strong> If you want direct updates outside the
                  server, message or follow{' '}
                  <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                  .
                </li>
                <li>
                  <strong>Need a human fast?</strong> Reveal the WhatsApp contact below and ping
                  directly if you want personal reassurance.
                </li>
              </ol>

              <div className="success-contact-row">
                <button
                  type="button"
                  className="btn-whatsapp-reveal"
                  onClick={() => {
                    setShowWhatsApp((value) => !value);
                    track(showWhatsApp ? 'whop-hide-whatsapp' : 'whop-reveal-whatsapp', {
                      location: 'whop-success',
                    });
                  }}
                >
                  {showWhatsApp ? 'HIDE WHATSAPP' : 'REVEAL WHATSAPP CONTACT'}
                </button>
                {showWhatsApp ? (
                  WHATSAPP_URL && WHATSAPP_DISPLAY ? (
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-card"
                      onClick={() => track('whop-open-whatsapp', { location: 'whop-success' })}
                    >
                      <span className="whatsapp-card-label">WhatsApp</span>
                      <strong>{WHATSAPP_DISPLAY}</strong>
                      <span>Tap to open chat</span>
                    </a>
                  ) : (
                    <div className="whatsapp-card is-placeholder">
                      <span className="whatsapp-card-label">WhatsApp</span>
                      <strong>Add `NEXT_PUBLIC_WHATSAPP_*`</strong>
                      <span>Set your direct contact in env to reveal it here</span>
                    </div>
                  )
                ) : null}
              </div>

              <div className="success-links">
                <a
                  href="https://whop.com/the-circle-vip"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whop-success-open-circle', { location: 'whop-success' })}
                >
                  Open Whop
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
                <span>{DISCORD_LABEL}</span>
              </div>
            </div>
            <a
              href="https://whop.com/the-circle-vip"
              className="btn-primary btn-cta-blue"
              onClick={() => track('whop-success-enter', { location: 'whop-success' })}
            >
              OPEN THE CIRCLE
            </a>
          </div>
        ) : (
          <>
            <div className="checkout-panel-head">
              <div>
                <div className="checkout-panel-label">Secure embedded checkout</div>
                <div className="checkout-panel-title">{currentPlan.label}</div>
              </div>
              <div className={`checkout-panel-state is-${checkoutState}`}>{checkoutState}</div>
            </div>

            {hasError ? (
              <div className="checkout-result error">
                <div className="checkout-result-label">Checkout interrupted</div>
                <p>
                  The payment was canceled or failed. The form below has been remounted so the buyer
                  can try again immediately.
                </p>
              </div>
            ) : null}

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
              styles={{ container: { paddingX: 12, paddingY: 12 } }}
              onComplete={(_, completedReceiptId) => {
                if (completedReceiptId) {
                  setReceiptId(completedReceiptId);
                } else {
                  setReceiptId('pending');
                }

                track('whop-checkout-complete', {
                  variant,
                  source: ctaSource ?? 'direct',
                  plan: currentPlan.key,
                });
              }}
              onIdentityCaptured={(data) => {
                if (data.email) {
                  setIdentityEmail(data.email);
                }
              }}
              onPromoCodeChanged={(promoCode) => {
                if (promoCode) {
                  track('whop-promo-applied', {
                    variant,
                    source: ctaSource ?? 'direct',
                    plan: currentPlan.key,
                  });
                }
              }}
              onStateChange={(state) => {
                setCheckoutState(state);
                if (state === 'loading') {
                  track('init-whop-checkout', {
                    variant,
                    source: ctaSource ?? 'direct',
                    plan: currentPlan.key,
                  });
                }
                if (state === 'ready') {
                  track('whop-checkout-ready', {
                    variant,
                    source: ctaSource ?? 'direct',
                    plan: currentPlan.key,
                  });
                }
                if (state === 'disabled') {
                  track('whop-checkout-disabled', {
                    variant,
                    source: ctaSource ?? 'direct',
                    plan: currentPlan.key,
                  });
                }
              }}
              fallback={
                <div className="checkout-loading">
                  <div className="checkout-loading-bar" />
                  <span>Loading Whop checkout...</span>
                </div>
              }
            />

            <p className="checkout-caption">
              External payment providers may briefly redirect for authorization, but buyers return
              to <strong>rokitg.fun/welcome</strong> to finish.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
