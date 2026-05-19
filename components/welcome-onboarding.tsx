'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';
import {
  // DISCORD_DISPLAY,
  // DISCORD_LABEL,
  // DISCORD_URL,
  TELEGRAM_DISPLAY,
  TELEGRAM_URL,
  // WHATSAPP_DISPLAY,
  // WHATSAPP_URL,
} from '@/lib/contact';

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

export function WelcomeOnboarding() {
  const searchParams = useSearchParams();
  // const [showWhatsApp, setShowWhatsApp] = useState(false);
  const status = searchParams.get('status');
  const receiptId = searchParams.get('receipt_id');
  const isError = status === 'error';

  return (
    <div className="welcome-shell">
      <div className="welcome-main-card">
        <div className="hero-badge">
          <div className="badge-dot" />
          THE CIRCLE — ACCESS ACTIVATION
        </div>
        <h1>
          {isError ? 'CHECKOUT NEEDED.' : 'WELCOME'}
          <br />
          <span className="green">{isError ? 'LET’S GET YOU IN.' : 'YOU’RE INSIDE.'}</span>
        </h1>
        <p className="sub">
          {isError
            ? 'Your payment was canceled or interrupted. Re-open the embedded checkout and we’ll get you through cleanly.'
            : 'Your Whop access is live. Follow these steps to join the community, sync Discord, and start catching calls right away.'}
        </p>
        {receiptId ? <div className="checkout-result-meta">Receipt: {receiptId}</div> : null}

        {isError ? (
          <div className="welcome-error-actions">
            <Link href="/join" className="btn-primary btn-cta-blue">
              RE-OPEN CHECKOUT
            </Link>
            <Link href="/whop" className="btn-ghost">
              SEE OFFER DETAILS
            </Link>
          </div>
        ) : (
          <>
            <div className="welcome-steps-card">
              <div className="welcome-steps-head">
                <div className="checkout-result-label">What to do first</div>
                <div className="success-guide-title">Step-by-step setup</div>
              </div>
              <ol className="success-steps">
                <li>
                  <strong>Open your Whop purchase.</strong> Whop should already show your access and
                  next actions after payment.
                </li>
                <li>
                  <strong>Join the Discord.</strong> Use the community/chat area inside Whop and
                  connect your Discord account in one click.
                </li>
                <li>
                  <strong>Check the private signal feed.</strong> That&apos;s where the live calls,
                  entries, targets, and updates land first.
                </li>
                <li>
                  <strong>Save direct contacts.</strong> Telegram and Discord are below if you want
                  a fast line, and WhatsApp can be revealed for personal contact.
                </li>
              </ol>
            </div>

            <div className="welcome-direct-actions">
              <a
                href="https://whop.com/the-circle-vip"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-cta-blue"
                onClick={() => track('welcome-open-whop', { location: 'welcome' })}
              >
                OPEN THE CIRCLE
              </a>
            </div>
          </>
        )}
      </div>

      <aside className="welcome-contact-card">
        <div className="checkout-result-label">Direct contact</div>
        <h2>Need a human fast?</h2>
        <p>
          Keep these saved so members can reach you if they need onboarding help or reassurance
          after joining.
        </p>

        <div className="welcome-contact-list">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="welcome-contact-link"
          >
            <div>
              <strong>Telegram</strong>
              <span>{TELEGRAM_DISPLAY}</span>
            </div>
          </a>
        </div>
      </aside>
    </div>
  );
}
