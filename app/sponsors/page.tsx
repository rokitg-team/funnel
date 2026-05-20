import type { Metadata } from 'next';
import Image from 'next/image';
import { SiteFooter, SiteNav } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Sponsors & Partners — RokitG',
  description:
    'Brands I work with. Lead sponsors: Breakout (Kraken-backed prop firm) and PROPR (Founding Affiliate). Code ROKIT on both. Plus the rest of the stack I use.',
};

// ──────────────────────────────────────────────
// LEAD SPONSORS — top-priority refs.
// Prop firms convert hard; both pay strong commissions.
// ──────────────────────────────────────────────
const PROPR_URL = 'https://app.propr.xyz/r/ROKIT';
const PROPR_CODE = 'ROKIT';

// breakoutprop.com · Kraken-backed · Trader Mayne cosign · code ROKIT
// URL pattern is the homepage with the code applied at checkout — confirm
// final referral URL with Breakout team and swap if they issue a dedicated
// /r/ROKIT or ?ref= link.
const BREAKOUT_URL = 'https://breakoutprop.com/?ref=ROKIT';
const BREAKOUT_CODE = 'ROKIT';
const FOMO_URL = 'https://fomo.family/r/rokitg';
const EXTENDED_URL = 'https://app.extended.exchange/join/ROKITG';
const EXTENDED_CODE = 'ROKITG';
const POLYMARKET_PROFILE_URL = 'https://polymarket.com/@rokitg';
const POLYMARKET_REFERRAL_URL = 'https://polymarket.com/?r=rokitgfun';

type Partner = {
  id: string;
  name: string;
  category: 'EXCHANGE' | 'PERPS' | 'DEX' | 'TOOL' | 'WALLET' | 'PREDICTION';
  bonus: string;
  desc: string;
  primaryUrl: string;
  primaryLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  logoSrc: string;
  logoAlt: string;
  logoWide?: boolean;
};

// Real reflinks, ranked top → bottom by YTD earnings.
// Codes and slugs are baked into the URLs.
const partners: Partner[] = [
  {
    id: 'polymarket',
    name: 'POLYMARKET',
    category: 'PREDICTION',
    bonus: 'Referral link first · public profile secondary',
    desc: 'Prediction market venue with your public profile attached for credibility. Main CTA should drive the referral flow, while the profile stays one click away for social proof.',
    primaryUrl: POLYMARKET_REFERRAL_URL,
    primaryLabel: 'Open referral',
    secondaryUrl: POLYMARKET_PROFILE_URL,
    secondaryLabel: 'rokitg.eth',
    logoSrc: '/brand/sponsors/polymarket-logo-white.png',
    logoAlt: 'Polymarket logo',
    logoWide: true,
  },
  {
    id: 'basedbot',
    name: 'BASEDBOT',
    category: 'TOOL',
    bonus: 'Fee discount on referral signup',
    desc: 'On-chain trading bot for memecoin sniping and auto-buys. Fast routing, clean Telegram UX.',
    primaryUrl: 'https://basedbot.app/r/rokitg',
    logoSrc: '/brand/sponsors/basedbot.png',
    logoAlt: 'BasedBot logo',
  },
  {
    id: 'coinbase-advanced',
    name: 'COINBASE ADVANCED',
    category: 'EXCHANGE',
    bonus: 'Standard sign-up bonus',
    desc: 'EU/US-regulated, deep liquidity, low maker/taker fees on the Advanced Trade interface. My safe-CEX venue.',
    primaryUrl: 'https://advanced.coinbase.com/join/FGK2ELY',
    logoSrc: '/brand/sponsors/coinbase.ico',
    logoAlt: 'Coinbase logo',
  },
  {
    id: 'haste',
    name: 'HASTE',
    category: 'PERPS',
    bonus: 'Fee discount with code ROKIT',
    desc: 'On-chain perps with clean UX. No KYC, no custodian risk. Solid backup venue for size.',
    primaryUrl: 'https://haste.com/?r=ROKIT',
    logoSrc: '/brand/sponsors/haste.png',
    logoAlt: 'Haste logo',
    logoWide: true,
  },
  {
    id: 'hibachi',
    name: 'HIBACHI',
    category: 'PERPS',
    bonus: 'Fee rebate via /r/rokit',
    desc: 'Perp DEX with fast settlement and tight spreads. Newer venue, sharp execution.',
    primaryUrl: 'https://hibachi.xyz/r/rokit',
    logoSrc: '/brand/sponsors/hibachi.ico',
    logoAlt: 'Hibachi logo',
  },
];

export default function SponsorsPage() {
  return (
    <>
      <SiteNav active="sponsors" />

      <main className="platform-page">
        <section className="platform-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            OFFICIAL SPONSORS &amp; PARTNERS
          </div>
          <h1>
            BRANDS I
            <br />
            <span className="green">WORK WITH.</span>
          </h1>
          <p className="sub">
            Every brand on this page is one I&apos;ve personally vetted and use. You get the bonus,
            the brand pays me a commission. No surprises, no shilling, no fluff.
          </p>
        </section>

        {/* ─── LEAD SPONSOR #1 — BREAKOUT ─────────────── */}
        <section className="breakout-feature" aria-labelledby="breakout-title">
          <a
            href={BREAKOUT_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="breakout-card"
            data-va-location="sponsor-breakout-featured"
            data-va-event="breakout-ref-click"
            aria-label="Get a Breakout prop firm account with code ROKIT"
          >
            <div className="breakout-aurora" aria-hidden="true" />
            <div className="breakout-content">
              <div className="breakout-head">
                <span className="breakout-pill">#1 Lead Sponsor · Official Partnership</span>
              </div>

              {/* Co-brand lockup — mirrors the official breakout × RokitG asset */}
              <div className="breakout-cobrand" aria-hidden="true">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="breakout-wordmark-wrap">
                    <Image
                      src="/brand/sponsors/breakout.ico"
                      alt=""
                      className="breakout-brandmark"
                      width={34}
                      height={34}
                    />
                    <div className="breakout-wordmark">
                      <span className="b">b</span>reakout
                    </div>
                  </div>
                  <div className="breakout-wordmark-sub">powered by Kraken</div>
                </div>
                <div className="breakout-cobrand-x">×</div>
                <div className="breakout-cobrand-rokit">
                  <Image
                    src="/brand/laser-pfp.jpg"
                    alt=""
                    className="breakout-cobrand-avatar"
                    width={38}
                    height={38}
                    unoptimized
                  />
                  RokitG
                </div>
              </div>

              <div className="breakout-codebox" aria-hidden="true">
                <span className="breakout-codebox-label">
                  <span>USE</span>
                  <span>CODE</span>
                </span>
                <span className="breakout-codebox-code">{BREAKOUT_CODE}</span>
              </div>
              <div className="breakout-tagline">
                breakoutprop.com · <strong>Kraken-backed · cosigned by Trader Mayne</strong>
              </div>

              <h2 id="breakout-title" className="breakout-title">
                TRADE THEIR CAPITAL.
                <br />
                <span className="breakout-cyan">KEEP THE EDGE.</span>
              </h2>
              <p className="breakout-sub">
                Pass the challenge, get funded, keep the profit split. Backed by{' '}
                <strong>Kraken</strong>, cosigned by <strong>Trader Mayne</strong>, and the prop
                firm I&apos;m officially partnered with.{' '}
                <strong>If you only use one link on this page, make it this one.</strong>
              </p>
              <div className="breakout-perks">
                <div className="breakout-perk">
                  <div className="breakout-perk-num">KRAKEN</div>
                  <div className="breakout-perk-label">Backed</div>
                </div>
                <div className="breakout-perk">
                  <div className="breakout-perk-num">MAYNE</div>
                  <div className="breakout-perk-label">Cosigned</div>
                </div>
                <div className="breakout-perk">
                  <div className="breakout-perk-num">CODE</div>
                  <div className="breakout-perk-label breakout-code">{BREAKOUT_CODE}</div>
                </div>
              </div>
              <div className="breakout-cta">
                Get funded at breakoutprop.com <span>→</span>
              </div>
            </div>
          </a>
        </section>

        {/* ─── LEAD SPONSOR #2 — PROPR ─────────────── */}
        <section className="propr-feature" aria-labelledby="propr-title">
          <a
            href={PROPR_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="propr-card"
            data-va-location="sponsor-propr-featured"
            data-va-event="propr-ref-click"
            aria-label="Sign up to PROPR with code ROKIT"
          >
            <div className="propr-aurora" aria-hidden="true" />
            <div className="propr-content">
              <div className="propr-head">
                <span className="propr-pill">#2 Lead Sponsor · Founding Affiliate</span>
                <span className="propr-logo-wrap">
                  <Image
                    src="/brand/sponsors/propr.svg"
                    alt=""
                    className="propr-logo-mark"
                    width={24}
                    height={24}
                  />
                  <span className="propr-logo">PROPR</span>
                </span>
              </div>
              <h2 id="propr-title" className="propr-title">
                FOUNDING AFFILIATE OF
                <br />
                <span className="propr-emerald">PROPR.</span>
              </h2>
              <p className="propr-sub">
                I&apos;ve been with PROPR since day one. Direct line to the team, priority support
                for anyone I send, and a partnership built on a long-term creator relationship — not
                a one-off promo. <strong>The trusted long-game pick.</strong>
              </p>
              <div className="propr-perks">
                <div className="propr-perk">
                  <div className="propr-perk-num">FOUNDING</div>
                  <div className="propr-perk-label">Affiliate</div>
                </div>
                <div className="propr-perk">
                  <div className="propr-perk-num">PRIORITY</div>
                  <div className="propr-perk-label">Support</div>
                </div>
                <div className="propr-perk">
                  <div className="propr-perk-num">CODE</div>
                  <div className="propr-perk-label propr-code">{PROPR_CODE}</div>
                </div>
              </div>
              <div className="propr-cta">
                Sign up at app.propr.xyz/r/{PROPR_CODE} <span>→</span>
              </div>
            </div>
          </a>
        </section>

        <section className="fomo-feature" aria-labelledby="fomo-title">
          <a
            href={FOMO_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="fomo-card"
            data-va-location="sponsor-fomo-featured"
            data-va-event="fomo-ref-click"
            aria-label="Open FOMO with RokitG referral link"
          >
            <div className="fomo-aurora" aria-hidden="true" />
            <div className="fomo-content">
              <div className="fomo-copy">
                <div className="fomo-head">
                  <span className="fomo-logo-wrap">
                    <Image
                      src="/brand/sponsors/fomo-family.svg"
                      alt=""
                      className="fomo-logo-mark"
                      width={28}
                      height={28}
                    />
                    <span className="fomo-logo">fomo</span>
                  </span>
                </div>
                <h2 id="fomo-title" className="fomo-title">
                  WHERE TRADERS
                  <br />
                  <span className="fomo-violet">BECOME LEGENDS.</span>
                </h2>
                <p className="fomo-sub">
                  Social-first trading app with clean mobile UX, leaderboard loops, and fast funding
                  flow. This is the app-native pick on the page, so it deserves more than a generic
                  tile. <strong>Priority partner after the prop firms.</strong>
                </p>
                <div className="fomo-perks">
                  <div className="fomo-perk">
                    <div className="fomo-perk-num">APPLE PAY</div>
                    <div className="fomo-perk-label">Buy in one tap</div>
                  </div>
                  <div className="fomo-perk">
                    <div className="fomo-perk-num">LEADERBOARD</div>
                    <div className="fomo-perk-label">Top trader loops</div>
                  </div>
                  <div className="fomo-perk">
                    <div className="fomo-perk-num">ROKITG</div>
                    <div className="fomo-perk-label">Discount Code</div>
                  </div>
                </div>
                <div className="fomo-cta">
                  Open fomo.family/r/rokitg <span>→</span>
                </div>
              </div>

              <div className="fomo-gallery" aria-hidden="true">
                <div className="fomo-gallery-main">
                  <Image
                    src="/brand/sponsors/fomo-space-bg.webp"
                    alt=""
                    className="fomo-gallery-bg"
                    width={1024}
                    height={631}
                  />
                  <Image
                    src="/brand/sponsors/fomo-astronaut.webp"
                    alt=""
                    className="fomo-gallery-astronaut"
                    width={463}
                    height={745}
                  />
                  <Image
                    src="/brand/sponsors/fomo-mobile-app.webp"
                    alt=""
                    className="fomo-gallery-phone"
                    width={552}
                    height={782}
                  />
                </div>
                <div className="fomo-gallery-strip">
                  <Image
                    src="/brand/sponsors/fomo-leaderboard.webp"
                    alt=""
                    className="fomo-gallery-shot"
                    width={460}
                    height={460}
                  />
                  <Image
                    src="/brand/sponsors/fomo-apple-pay.webp"
                    alt=""
                    className="fomo-gallery-shot"
                    width={460}
                    height={460}
                  />
                </div>
              </div>
            </div>
          </a>
        </section>

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
                  <span className="extended-pill">
                    #4 Featured Sponsor · CEO-approved affiliate
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

                <h2 id="extended-title" className="extended-title">
                  ON-CHAIN PERPS.
                  <br />
                  <span className="extended-cyan">DIRECT CEO INTRO.</span>
                </h2>
                <p className="extended-sub">
                  Just got added as an official affiliate after speaking directly with the CEO. If
                  you join through RokitG, you get the current referral push:{' '}
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
                  Use code {EXTENDED_CODE} for the current Extended campaign, built around bonus
                  points, lower fees, and a cleaner on-chain perps setup.
                </p>
                <div className="extended-panel-button">2X points boost live now</div>
              </div>
            </div>
          </a>
        </section>

        <div className="refs-divider">
          <span>{'// Other partners I use'}</span>
        </div>

        <div className="refs-grid">
          {partners.map((p) => (
            <article key={p.id} className={`ref-card${p.secondaryUrl ? ' ref-card-dual' : ''}`}>
              <div className="ref-visual" aria-hidden="true">
                <Image src={p.logoSrc} alt="" className="ref-visual-mark" width={92} height={92} />
              </div>
              <div className="ref-card-head">
                <div className={`ref-logo${p.logoWide ? ' ref-logo-wide' : ''}`}>
                  <Image
                    src={p.logoSrc}
                    alt={p.logoAlt}
                    className="ref-logo-img"
                    width={p.logoWide ? 104 : 36}
                    height={36}
                  />
                </div>
                <span className="ref-category">{p.category}</span>
              </div>
              <div className="ref-name">{p.name}</div>
              <div className="ref-bonus">{p.bonus}</div>
              <p className="ref-desc">{p.desc}</p>
              <div className="ref-actions">
                <a
                  href={p.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="ref-cta"
                  data-va-location={
                    p.id === 'polymarket' ? 'polymarket-referral' : `sponsor-${p.id}`
                  }
                  data-va-event={`${p.id}-ref-click`}
                >
                  {p.primaryLabel ?? 'Sign up'} <span>→</span>
                </a>
                {p.secondaryUrl ? (
                  <a
                    href={p.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="ref-cta ref-cta-secondary"
                    data-va-location={
                      p.id === 'polymarket' ? 'polymarket-profile' : `sponsor-${p.id}-secondary`
                    }
                    data-va-event={
                      p.id === 'polymarket' ? 'polymarket-profile-click' : `${p.id}-secondary-click`
                    }
                  >
                    {p.secondaryLabel}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <p className="ref-disclosure">
          Disclosure: links on this page are affiliate or partner links. You pay nothing extra and
          may receive a bonus. I receive a commission or rebate when you sign up. I only list brands
          I actually use.
        </p>
      </main>

      <SiteFooter />

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){document.querySelectorAll('[data-va-location]').forEach(function(el){el.addEventListener('click',function(){try{if(typeof window.va!=='function')return;var location=this.getAttribute('data-va-location');var eventName=this.getAttribute('data-va-event')||'sponsor-click';window.va('event',{name:eventName,data:{location:location,page:'sponsors'}})}catch(e){}})})})();`,
        }}
      />
    </>
  );
}
