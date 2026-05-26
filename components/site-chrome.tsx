import Link from 'next/link';
import { getGroupClosedEnabled } from '@/flags';
import { getLifetimePrimaryHref } from '@/lib/access-plans';
import { BLINK_NAV_CTA_LABEL, BLINK_TOKEN_URL } from '@/lib/blink';
import { getWaitlistHref } from '@/lib/waitlist';

type SiteChromeProps = {
  active?: 'home' | 'reviews' | 'whop' | 'newsletter' | 'kick' | 'sponsors' | 'transparency';
};

export async function SiteNav({ active }: SiteChromeProps) {
  const cls = (key: SiteChromeProps['active']) => (active === key ? 'nav-link-active' : undefined);
  const primaryHref = BLINK_TOKEN_URL;
  const isPrimaryExternal = true;
  const ctaLabel = BLINK_NAV_CTA_LABEL;

  return (
    <nav>
      <Link href="/" className="logo">
        ROKIT<span>G</span>
      </Link>
      <div className="links">
        <Link href="/whop" className={cls('whop')}>
          Whop
        </Link>
        <Link href="/newsletter" className={cls('newsletter')}>
          Newsletter
        </Link>
        <Link href="/kick" className={cls('kick')}>
          Kick
        </Link>
        <Link href="/sponsors" className={cls('sponsors')}>
          Sponsors
        </Link>
        <Link href="/transparency" className={cls('transparency')}>
          Transparency
        </Link>
        <Link href="/reviews" className={cls('reviews')}>
          Reviews
        </Link>
        <a
          href={primaryHref}
          className="nav-cta"
          target={isPrimaryExternal ? '_blank' : undefined}
          rel={isPrimaryExternal ? 'noopener noreferrer' : undefined}
        >
          {ctaLabel}
        </a>
      </div>
    </nav>
  );
}

export async function SiteFooter() {
  const groupClosed = await getGroupClosedEnabled();
  const primaryHref = groupClosed
    ? getWaitlistHref({ cta: 'footer', mode: 'closed' })
    : getLifetimePrimaryHref({ cta: 'footer', variant: 'footer-direct' });
  const isPrimaryExternal = primaryHref.startsWith('http');
  const ctaLabel = groupClosed ? 'JOIN WAITLIST' : 'BUY LIFETIME';

  return (
    <footer>
      <div className="logo">
        ROKIT<span>G</span>.FUN
      </div>
      <div className="footer-links">
        <a
          href={primaryHref}
          target={isPrimaryExternal ? '_blank' : undefined}
          rel={isPrimaryExternal ? 'noopener noreferrer' : undefined}
        >
          {ctaLabel}
        </a>
        <Link href="/sponsors">SPONSORS</Link>
        <a href="https://x.com/rokitdotgg" target="_blank" rel="noopener noreferrer">
          X / @ROKITDOTGG
        </a>
        <Link href="/links">ALL LINKS</Link>
        <Link href="/whop">WHOP</Link>
        <Link href="/newsletter">NEWSLETTER</Link>
        <Link href="/kick">KICK</Link>
        <Link href="/transparency">TRANSPARENCY</Link>
        <Link href="/sponsors">SPONSORS</Link>
        <Link href="/reviews">REVIEWS</Link>
      </div>
      <div className="footer-copy">© 2026 ROKITG · NOT FINANCIAL ADVICE</div>
    </footer>
  );
}
