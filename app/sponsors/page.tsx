import type { Metadata } from 'next';
import Image from 'next/image';
import { ExtendedSponsorFeature } from '@/components/extended-sponsor-feature';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { type SponsorCatalogItem, SponsorsCatalog } from '@/components/sponsors-catalog';
import { extendedInsiderLeakFlag } from '@/flags';

export const metadata: Metadata = {
  title: 'Sponsors & Partners — RokitG',
  description:
    'Brands I work with. Featured sponsors: Extended, FOMO, and PROPR. Then the rest of the stack I personally use.',
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
const FOMO_URL = 'https://fomo.family/r/rokitg';
const BYBIT_URL = 'https://www.bybit.com/invite?ref=ROKITG';
const POLYMARKET_PROFILE_URL = 'https://polymarket.com/@rokitg';
const POLYMARKET_REFERRAL_URL = 'https://polymarket.com/?r=rokitgfun';
const AXIOM_URL = 'https://axiom.pro/@rokitg';

type Partner = SponsorCatalogItem & {
  id: string;
};

// Real reflinks, ranked top → bottom by YTD earnings.
// Codes and slugs are baked into the URLs.
const partners: Partner[] = [
  {
    id: 'breakout',
    name: 'BREAKOUT',
    category: 'PERPS',
    protocolType: 'Prop firm',
    blockchains: ['CEX / offchain'],
    refCode: 'ROKIT',
    bonus: 'Kraken-backed prop firm · code ROKIT',
    desc: 'Funded prop route backed by Kraken and still one of the strongest performance-first links in the stack.',
    primaryUrl: BREAKOUT_URL,
    primaryLabel: 'Open Breakout',
    logoSrc: '/brand/sponsors/breakout.ico',
    logoAlt: 'Breakout logo',
    searchTerms: ['kraken', 'funded', 'trader mayne', 'prop'],
  },
  {
    id: 'bybit',
    name: 'BYBIT',
    category: 'PERPS',
    protocolType: 'Centralized exchange',
    blockchains: ['CEX / offchain'],
    refCode: 'ROKITG',
    bonus: 'Recommended CEX route for perps',
    desc: 'The clean centralized perps venue in the stack. Good for size, familiar execution, and a simpler route for traders who do not want pure onchain flow.',
    primaryUrl: BYBIT_URL,
    primaryLabel: 'Open Bybit',
    logoSrc: '/brand/sponsors/bybit.svg',
    logoAlt: 'Bybit wordmark',
    logoWide: true,
    heroSrc: '/brand/sponsors/bybit-feature.svg',
    heroAlt: 'Bybit sponsor visual',
    theme: 'bybit',
    searchTerms: ['cex', 'centralized', 'trading', 'perpetuals'],
  },
  {
    id: 'polymarket',
    name: 'POLYMARKET',
    category: 'PREDICTION',
    protocolType: 'Prediction market',
    blockchains: ['Polygon'],
    refCode: 'rokitgfun',
    bonus: 'Referral link first · public profile secondary',
    desc: 'Prediction market venue with your public profile attached for credibility. Main CTA should drive the referral flow, while the profile stays one click away for social proof.',
    primaryUrl: POLYMARKET_REFERRAL_URL,
    primaryLabel: 'Open referral',
    secondaryUrl: POLYMARKET_PROFILE_URL,
    secondaryLabel: 'rokitg.eth',
    logoSrc: '/brand/sponsors/polymarket-logo-white.png',
    logoAlt: 'Polymarket logo',
    logoWide: true,
    searchTerms: ['markets', 'bets', 'prediction', 'event market'],
  },
  {
    id: 'basedbot',
    name: 'BASEDBOT',
    category: 'TOOL',
    protocolType: 'Trading bot',
    blockchains: ['Solana', 'Base'],
    bonus: 'Fee discount on referral signup',
    desc: 'On-chain trading bot for memecoin sniping and auto-buys. Fast routing, clean Telegram UX.',
    primaryUrl: 'https://basedbot.app/r/rokitg',
    logoSrc: '/brand/sponsors/basedbot.png',
    logoAlt: 'BasedBot logo',
    searchTerms: ['bot', 'telegram', 'sniper', 'autobuy'],
  },
  {
    id: 'coinbase-advanced',
    name: 'COINBASE ADVANCED',
    category: 'EXCHANGE',
    protocolType: 'Centralized exchange',
    blockchains: ['CEX / offchain', 'Base'],
    bonus: 'Standard sign-up bonus',
    desc: 'EU/US-regulated, deep liquidity, low maker/taker fees on the Advanced Trade interface. My safe-CEX venue.',
    primaryUrl: 'https://advanced.coinbase.com/join/FGK2ELY',
    logoSrc: '/brand/sponsors/coinbase.ico',
    logoAlt: 'Coinbase logo',
    searchTerms: ['coinbase', 'regulated', 'advanced trade', 'base'],
  },
  {
    id: 'hyperliquid',
    name: 'HYPERLIQUID',
    category: 'PERPS',
    protocolType: 'Onchain perps',
    blockchains: ['EVM'],
    refCode: 'ROKIT',
    bonus: 'Direct join route with code ROKIT',
    desc: 'High-liquidity onchain perps venue with serious size, fast execution, and a cleaner direct route for traders who want one of the strongest crypto-native exchanges in the stack.',
    primaryUrl: 'https://app.hyperliquid.xyz/join/ROKIT',
    logoSrc: '/brand/sponsors/hyperliquid.svg',
    logoAlt: 'Hyperliquid wordmark',
    logoWide: true,
    heroSrc: '/brand/sponsors/hyperliquid-feature.svg',
    heroAlt: 'Hyperliquid sponsor visual',
    theme: 'hyperliquid',
    searchTerms: ['hyperliquid', 'hl', 'dex', 'perpetuals', 'no kyc', 'onchain'],
  },
  {
    id: 'hibachi',
    name: 'HIBACHI',
    category: 'PERPS',
    protocolType: 'Perp DEX',
    blockchains: ['EVM'],
    refCode: 'rokit',
    bonus: 'Fee rebate via /r/rokit',
    desc: 'Perp DEX with fast settlement and tight spreads. Newer venue, sharp execution.',
    primaryUrl: 'https://hibachi.xyz/r/rokit',
    logoSrc: '/brand/sponsors/hibachi.ico',
    logoAlt: 'Hibachi logo',
    searchTerms: ['dex', 'perps', 'rebate', 'onchain'],
  },
  {
    id: 'axiom',
    name: 'AXIOM.PRO',
    category: 'TOOL',
    protocolType: 'Trading workspace',
    blockchains: ['Solana'],
    bonus: 'Fast browser-native trading workspace',
    desc: 'High-speed browser trading surface for discovery, pulse tracking, and fast execution. Better presentation now matches how useful it actually is in the stack.',
    primaryUrl: AXIOM_URL,
    primaryLabel: 'Open Axiom',
    logoSrc: '/brand/sponsors/axiom.svg',
    logoAlt: 'Axiom wordmark',
    logoWide: true,
    heroSrc: '/brand/sponsors/axiom-feature.svg',
    heroAlt: 'Axiom sponsor visual',
    theme: 'axiom',
    searchTerms: ['pulse', 'browser', 'workspace', 'research', 'solana'],
  },
];

export default async function SponsorsPage() {
  const showExtendedInsiderLeak = await extendedInsiderLeakFlag();

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

        <ExtendedSponsorFeature showInsiderLeak={showExtendedInsiderLeak} />

        <section className="fomo-feature" aria-labelledby="fomo-title">
          <a
            href={FOMO_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="fomo-card"
            data-va-location="sponsor-fomo-featured"
            data-va-event="fomo-ref-click"
            aria-label="Open FOMO with RokitG referral"
          >
            <div className="fomo-aurora" aria-hidden="true" />
            <div className="fomo-content">
              <div className="fomo-copy">
                <div className="fomo-head">
                  <span className="fomo-pill">#2 Featured Sponsor · mobile-first flow</span>
                  <span className="fomo-logo-wrap">
                    <Image
                      src="/brand/sponsors/fomo-family.svg"
                      alt=""
                      className="fomo-logo-mark"
                      width={28}
                      height={28}
                    />
                    <span className="fomo-logo">FOMO</span>
                  </span>
                </div>

                <h2 id="fomo-title" className="fomo-title">
                  SOCIAL TRADING.
                  <br />
                  <span className="fomo-violet">FASTEST MOBILE LOOP.</span>
                </h2>
                <p className="fomo-sub">
                  If you want the smoother mobile-native route, FOMO is still one of the cleanest
                  apps in the stack. Fast funding, strong UX, and a much easier onboarding path for
                  people who want to move quickly from content into trading.
                </p>

                <div className="fomo-perks">
                  <div className="fomo-perk">
                    <div className="fomo-perk-num">FAST</div>
                    <div className="fomo-perk-label">Onboarding</div>
                  </div>
                  <div className="fomo-perk">
                    <div className="fomo-perk-num">MOBILE</div>
                    <div className="fomo-perk-label">Native UX</div>
                  </div>
                  <div className="fomo-perk">
                    <div className="fomo-perk-num">LIVE</div>
                    <div className="fomo-perk-label">Social flow</div>
                  </div>
                </div>

                <div className="fomo-cta">
                  OPEN FOMO WITH ROKITG <span>→</span>
                </div>
              </div>

              <div className="fomo-gallery" aria-hidden="true">
                <div className="fomo-gallery-main">
                  <Image
                    src="/brand/sponsors/fomo-space-bg.webp"
                    alt=""
                    className="fomo-gallery-bg"
                    width={1200}
                    height={800}
                  />
                  <Image
                    src="/brand/sponsors/fomo-astronaut.webp"
                    alt=""
                    className="fomo-gallery-astronaut"
                    width={540}
                    height={540}
                  />
                  <Image
                    src="/brand/sponsors/fomo-mobile-app.webp"
                    alt=""
                    className="fomo-gallery-phone"
                    width={420}
                    height={860}
                  />
                </div>
                <div className="fomo-gallery-strip">
                  <Image
                    src="/brand/sponsors/fomo-leaderboard.webp"
                    alt=""
                    className="fomo-gallery-shot"
                    width={620}
                    height={420}
                  />
                  <Image
                    src="/brand/sponsors/fomo-desktop.webp"
                    alt=""
                    className="fomo-gallery-shot"
                    width={620}
                    height={420}
                  />
                </div>
              </div>
            </div>
          </a>
        </section>

        {/* ─── FEATURED SPONSOR #3 — PROPR ─────────────── */}
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
                <span className="propr-pill">#3 Featured Sponsor · Founding Affiliate</span>
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

        <SponsorsCatalog partners={partners} />

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
