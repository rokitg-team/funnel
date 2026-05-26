import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { BLINK_PRIMARY_CTA_LABEL, BLINK_TOKEN_URL } from '@/lib/blink';

export const metadata: Metadata = {
  title: 'Watch RokitG Live on Kick',
  description: 'Live charts, real-time calls, and trade reviews from @rokitdotgg. Follow on Kick.',
};

// PLACEHOLDER — replace with real Kick channel
const KICK_URL = 'https://kick.com/rokitgg';

export default function KickPage() {
  return (
    <>
      <SiteNav />

      <main className="platform-page kick-bg kick-brand">
        <section className="platform-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            KICK — LIVE STREAMS
          </div>
          <h1>
            WATCH ME
            <br />
            <span className="green">WORK.</span>
          </h1>
          <p className="sub">
            Charts open. Mic on. Live trade reviews, market structure, and Q&amp;A direct from{' '}
            <strong>@rokitdotgg</strong>. <strong>Free to watch.</strong>
          </p>
          <div className="platform-actions">
            <a
              href={BLINK_TOKEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
              data-va-location="kick-blink-hero"
              data-va-event="blink-token-click"
            >
              {BLINK_PRIMARY_CTA_LABEL}
            </a>
            <a
              href={KICK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              data-va-location="kick-watch"
              data-va-event="kick-cta"
            >
              WATCH NOW ↗
            </a>
          </div>
        </section>

        <section>
          <div className="section-tag">{'// WHAT GOES DOWN'}</div>
          <h2>
            LIVE CHARTS.
            <br />
            <span className="green">LIVE CALLS.</span>
          </h2>
          <p className="section-sub">
            The stream is where the work happens in public. No edits, no scripts — just the charts,
            the read, and the trade.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feat-icon">📺</div>
              <div className="feat-title">LIVE TRADING</div>
              <p className="feat-desc">
                Watch entries, exits, and risk management in real-time. See the thinking behind
                every call.
              </p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">🗣️</div>
              <div className="feat-title">Q&amp;A SESSIONS</div>
              <p className="feat-desc">
                Drop questions in chat. Get answers about charts, setups, and where the cycle is
                heading.
              </p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">📊</div>
              <div className="feat-title">MARKET REVIEWS</div>
              <p className="feat-desc">
                Daily market structure breakdowns. What&apos;s moving, what&apos;s broken,
                what&apos;s coiling.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-tag" style={{ textAlign: 'center' }}>
              {'// GO LIVE WITH ME'}
            </div>
            <h2>
              FOLLOW
              <br />
              <span className="green">ON KICK.</span>
            </h2>
            <p>Get notified the moment the stream goes live.</p>
            <a
              href={BLINK_TOKEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
              style={{ fontSize: 15, padding: '20px 48px' }}
              data-va-location="kick-blink-final"
              data-va-event="blink-token-click"
            >
              {BLINK_PRIMARY_CTA_LABEL}
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){document.querySelectorAll('[data-va-location]').forEach(function(el){el.addEventListener('click',function(){try{if(typeof window.va!=='function')return;var location=this.getAttribute('data-va-location');var eventName=this.getAttribute('data-va-event')||'kick-click';window.va('event',{name:eventName,data:{location:location,page:'kick'}})}catch(e){}})})})();`,
        }}
      />
    </>
  );
}
