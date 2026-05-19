import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'RokitG — All Links',
  description:
    'Every way to follow RokitG. The Circle on Whop, the Substack, the Kick stream, and exchange reflinks.',
  openGraph: {
    title: 'RokitG — All Links',
    description: 'The Circle · Substack · Kick · Reflinks',
    type: 'website',
  },
};

// ──────────────────────────────────────────────
// Destination URLs.
// Whop is real; the rest are placeholders to be
// swapped once final URLs are ready.
// ──────────────────────────────────────────────
const WHOP_URL = 'https://whop.com/the-circle-vip';
const PROPR_URL = 'https://app.propr.xyz/r/ROKIT';
const BREAKOUT_URL = 'https://breakoutprop.com/?ref=ROKIT'; // confirm final ref URL
const SPONSORS_URL = '/sponsors';
const SUBSTACK_URL = 'https://rokitg.substack.com';
const KICK_URL = 'https://kick.com/rokitgg'; // PLACEHOLDER — confirm handle
const X_URL = 'https://x.com/rokitdotgg';
const REVIEWS_URL = '/reviews';
const FOMO_URL = 'https://fomo.family/r/rokitg';

type LinkItem = {
  href: string;
  external: boolean;
  iconClass: string;
  iconLabel: string;
  title: string;
  sub: string;
  pill?: string;
  primary?: boolean;
  vaLocation: string;
  vaEvent: string;
};

const links: LinkItem[] = [
  {
    href: WHOP_URL,
    external: true,
    iconClass: 'link-icon-whop',
    iconLabel: 'W',
    title: 'JOIN THE CIRCLE — WHOP',
    sub: 'Live signals · 42 members · 5.0★ · $5/mo',
    pill: 'MAIN OFFER',
    primary: true,
    vaLocation: 'links-whop',
    vaEvent: 'links-whop',
  },
  {
    href: BREAKOUT_URL,
    external: true,
    iconClass: 'link-icon-breakout',
    iconLabel: 'B',
    title: 'BREAKOUT — CODE ROKIT',
    sub: 'Prop firm · Kraken-backed · Trader Mayne',
    pill: '#1 LEAD SPONSOR',
    primary: true,
    vaLocation: 'links-breakout',
    vaEvent: 'links-breakout',
  },
  {
    href: PROPR_URL,
    external: true,
    iconClass: 'link-icon-propr',
    iconLabel: 'P',
    title: 'PROPR — CODE ROKIT',
    sub: 'Founding Affiliate · priority support',
    pill: '#2 LEAD SPONSOR',
    primary: true,
    vaLocation: 'links-propr',
    vaEvent: 'links-propr',
  },
  {
    href: SPONSORS_URL,
    external: false,
    iconClass: 'link-icon-refs',
    iconLabel: 'S',
    title: 'ALL SPONSORS & PARTNERS',
    sub: 'Exchanges, perps, tools — the full stack',
    vaLocation: 'links-sponsors',
    vaEvent: 'links-sponsors',
  },
  {
    href: SUBSTACK_URL,
    external: true,
    iconClass: 'link-icon-substack',
    iconLabel: 'S',
    title: "ROKITG'S CIRCLE — SUBSTACK",
    sub: 'Free reads · refer friends, earn USDC',
    vaLocation: 'links-substack',
    vaEvent: 'links-substack',
  },
  {
    href: KICK_URL,
    external: true,
    iconClass: 'link-icon-kick',
    iconLabel: 'K',
    title: 'WATCH LIVE ON KICK',
    sub: 'Charts, calls, and trade reviews',
    vaLocation: 'links-kick',
    vaEvent: 'links-kick',
  },
  {
    href: X_URL,
    external: true,
    iconClass: 'link-icon-x',
    iconLabel: '\u{1D54F}',
    title: 'FOLLOW @ROKITDOTGG',
    sub: '1,561 followers · Cryptocurrency',
    vaLocation: 'links-x',
    vaEvent: 'links-x',
  },
  {
    href: FOMO_URL,
    external: true,
    iconClass: 'link-icon-fomo',
    iconLabel: 'F',
    title: 'JOIN FOMO',
    sub: 'FOMO family · earn USDC',
    vaLocation: 'links-fomo-family',
    vaEvent: 'links-fomo-family',
  },
  {
    href: REVIEWS_URL,
    external: false,
    iconClass: 'link-icon-refs',
    iconLabel: '★',
    title: 'READ MEMBER REVIEWS',
    sub: '5.0 average across the group',
    vaLocation: 'links-reviews',
    vaEvent: 'links-reviews',
  },
];

const VA_TRACK_SCRIPT = `
(function(){
  document.querySelectorAll('[data-va-location]').forEach(function(el){
    el.addEventListener('click', function(){
      try {
        if (typeof window.va === 'function') {
          window.va('event', {
            name: this.getAttribute('data-va-event') || 'links-click',
            data: {
              location: this.getAttribute('data-va-location'),
              page: 'links'
            }
          });
        }
      } catch (e) {}
    });
  });
})();
`;

export default function LinksPage() {
  return (
    <div className="link-page">
      <div className="link-bg" aria-hidden="true" />

      <div className="link-inner">
        <div className="link-profile">
          <Image
            src="/brand/laser-pfp.jpg"
            alt="RokitG"
            className="link-avatar"
            width={112}
            height={112}
            priority
            unoptimized
          />
          <div className="link-handle">
            ROKIT<span>G</span>
          </div>
          <div className="link-verified">@rokitdotgg · Verified</div>
          <div className="link-tagline">Cryptocurrency · The Circle</div>
          <div className="link-stats">
            <span>
              <strong>1,561</strong> followers
            </span>
            <span className="dot" aria-hidden="true" />
            <span>
              <strong>42</strong> in circle
            </span>
            <span className="dot" aria-hidden="true" />
            <span>
              <strong>5.0</strong>★
            </span>
          </div>
        </div>

        <div className="link-list">
          {links.map((item) => (
            <a
              key={item.vaLocation}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`link-card${item.primary ? ' link-card-primary' : ''}`}
              data-va-location={item.vaLocation}
              data-va-event={item.vaEvent}
            >
              <div className={`link-icon ${item.iconClass}`}>{item.iconLabel}</div>
              <div className="link-body">
                {item.pill ? <span className="link-pill">{item.pill}</span> : null}
                <div className="link-title">{item.title}</div>
                <div className="link-sub">{item.sub}</div>
              </div>
              <span className="link-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>

        <div className="link-footer">
          <Link href="/">rokitg.fun</Link>
          {' · '}
          <span>© 2026 ROKITG · NOT FINANCIAL ADVICE</span>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: VA_TRACK_SCRIPT }} />
    </div>
  );
}
