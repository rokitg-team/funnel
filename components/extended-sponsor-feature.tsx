'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const WHOP_LEAK_URL =
  'https://whop.com/experiences/exp_jAAK8ZxX89dh7g/post_1CbFmbVSgPkb9TXrM19GVr?a=rokitg';
const EXTENDED_URL = 'https://app.extended.exchange/join/ROKITG';
const EXTENDED_CODE = 'ROKITG';

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

function getMsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, midnight.getTime() - now.getTime());
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return { hours, minutes, seconds };
}

type ExtendedSponsorFeatureProps = {
  showInsiderLeak: boolean;
};

export function ExtendedSponsorFeature({ showInsiderLeak }: ExtendedSponsorFeatureProps) {
  const [countdownMs, setCountdownMs] = useState(() => getMsUntilMidnight());

  useEffect(() => {
    if (!showInsiderLeak) {
      return;
    }

    const interval = window.setInterval(() => {
      setCountdownMs(getMsUntilMidnight());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [showInsiderLeak]);

  const countdown = useMemo(() => formatCountdown(countdownMs), [countdownMs]);

  if (showInsiderLeak) {
    return (
      <section className="extended-feature" aria-labelledby="extended-title">
        <a
          href={WHOP_LEAK_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="extended-card extended-card-leak"
          data-va-location="sponsor-extended-insider-leak"
          data-va-event="extended-insider-leak-init"
          aria-label="Unlock insider Extended TGE details for a one-time $5 payment"
          onClick={() =>
            track('extended-insider-leak-init', {
              location: 'sponsor-extended-insider-leak',
              price: 5,
              destination: 'whop-post',
            })
          }
        >
          <div className="extended-aurora" aria-hidden="true" />
          <div className="extended-content">
            <div className="extended-copy">
              <div className="extended-head">
                <span className="extended-pill extended-pill-alert">
                  #1 Featured Sponsor · insider leak live now
                </span>
                <span className="extended-logo-wrap">
                  <Image
                    src="/brand/sponsors/extended.svg"
                    alt=""
                    className="extended-logo-mark"
                    width={28}
                    height={28}
                  />
                  <span className="extended-logo">EXTENDED</span>
                </span>
              </div>

              <div className="extended-leak-alert" role="status" aria-live="polite">
                <span className="extended-leak-label">one-time unlock closes in</span>
                <div className="extended-leak-time">
                  <strong>{countdown.hours}</strong>
                  <span>:</span>
                  <strong>{countdown.minutes}</strong>
                  <span>:</span>
                  <strong>{countdown.seconds}</strong>
                </div>
                <p>$5 reveal window shuts tonight.</p>
              </div>

              <h2 id="extended-title" className="extended-title">
                INSIDER INFO.
                <br />
                <span className="extended-cyan">TGE DETAILS LEAKED.</span>
              </h2>
              <p className="extended-sub">
                Limited-time paid drop for people who want the <strong>Extended TGE angle</strong>{' '}
                before it gets crowded. One-time <strong>$5 unlock</strong> to reveal the details,
                then route into the deeper stack from inside The Circle.
              </p>

              <div className="extended-perks">
                <div className="extended-perk">
                  <div className="extended-perk-num">$5</div>
                  <div className="extended-perk-label">One-time reveal</div>
                </div>
                <div className="extended-perk">
                  <div className="extended-perk-num">TGE</div>
                  <div className="extended-perk-label">Insider angle</div>
                </div>
                <div className="extended-perk">
                  <div className="extended-perk-num">NOW</div>
                  <div className="extended-perk-label">Limited window</div>
                </div>
              </div>

              <div className="extended-cta extended-cta-alert">
                UNLOCK THE $5 INSIDER LEAK <span>→</span>
              </div>
            </div>

            <div className="extended-panel extended-panel-alert" aria-hidden="true">
              <div className="extended-panel-badge">
                <Image
                  src="/brand/laser-pfp.jpg"
                  alt=""
                  className="extended-panel-avatar"
                  width={48}
                  height={48}
                  unoptimized
                />
                <span className="extended-panel-badge-text">operator note</span>
              </div>
              <div className="extended-panel-title">
                One-time micro payment. Direct reveal. No recurring fluff.
              </div>
              <p className="extended-panel-copy">
                This angle is being framed as a temporary insider info drop around Extended TGE
                details. Unlock it for $5, read the leak, then decide if you want the full route.
              </p>
              <div className="extended-panel-button">$5 reveal active now</div>
            </div>
          </div>
        </a>
      </section>
    );
  }

  return (
    <section className="extended-feature" aria-labelledby="extended-title">
      <a
        href={EXTENDED_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="extended-card"
        data-va-location="sponsor-extended-featured"
        data-va-event="extended-ref-click"
        aria-label="Join Extended with referral code ROKITG"
      >
        <div className="extended-aurora" aria-hidden="true" />
        <div className="extended-content">
          <div className="extended-copy">
            <div className="extended-head">
              <span className="extended-pill">#1 Featured Sponsor · CEO-approved affiliate</span>
              <span className="extended-logo-wrap">
                <Image
                  src="/brand/sponsors/extended.svg"
                  alt=""
                  className="extended-logo-mark"
                  width={28}
                  height={28}
                />
                <span className="extended-logo">EXTENDED</span>
              </span>
            </div>

            <h2 id="extended-title" className="extended-title">
              ON-CHAIN PERPS.
              <br />
              <span className="extended-cyan">DIRECT CEO INTRO.</span>
            </h2>
            <p className="extended-sub">
              Just got added as an official affiliate after speaking directly with the CEO. If you
              join through RokitG, you get the current referral push:{' '}
              <strong>10% points boost and 10% fee discount</strong>. This is now one of the
              cleanest on-chain perps routes on the page.
            </p>

            <div className="extended-perks">
              <div className="extended-perk">
                <div className="extended-perk-num">10%</div>
                <div className="extended-perk-label">Points boost</div>
              </div>
              <div className="extended-perk">
                <div className="extended-perk-num">10%</div>
                <div className="extended-perk-label">Fees discount</div>
              </div>
              <div className="extended-perk">
                <div className="extended-perk-num">CODE</div>
                <div className="extended-perk-label extended-code">{EXTENDED_CODE}</div>
              </div>
            </div>

            <div className="extended-cta">
              LIMITED-TIME 2X POINTS BOOST WITH {EXTENDED_CODE} <span>→</span>
            </div>
          </div>

          <div className="extended-panel" aria-hidden="true">
            <div className="extended-panel-badge">
              <Image
                src="/brand/laser-pfp.jpg"
                alt=""
                className="extended-panel-avatar"
                width={48}
                height={48}
                unoptimized
              />
              <span className="extended-panel-badge-text">invite active</span>
            </div>
            <div className="extended-panel-title">
              Get the RokitG invite and stack the limited-time boost.
            </div>
            <p className="extended-panel-copy">
              Use code {EXTENDED_CODE} for the current Extended campaign, built around bonus points,
              lower fees, and a cleaner on-chain perps setup.
            </p>
            <div className="extended-panel-button">2X points boost live now</div>
          </div>
        </div>
      </a>
    </section>
  );
}
