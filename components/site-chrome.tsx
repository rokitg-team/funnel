import Link from 'next/link';
import { getLifetimePrimaryHref } from '@/lib/access-plans';

type SiteChromeProps = {
  active?: 'home' | 'reviews' | 'whop' | 'newsletter' | 'kick' | 'sponsors';
};

export function SiteNav({ active }: SiteChromeProps) {
  const cls = (key: SiteChromeProps['active']) => (active === key ? 'nav-link-active' : undefined);
  const lifetimeHref = getLifetimePrimaryHref({ cta: 'nav', variant: 'nav-direct' });
  const isLifetimeExternal = lifetimeHref.startsWith('http');

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
          Reflinks
        </Link>
        <Link href="/reviews" className={cls('reviews')}>
          Reviews
        </Link>
        <a
          href={lifetimeHref}
          className="nav-cta"
          target={isLifetimeExternal ? '_blank' : undefined}
          rel={isLifetimeExternal ? 'noopener noreferrer' : undefined}
        >
          BUY LIFETIME →
        </a>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const lifetimeHref = getLifetimePrimaryHref({ cta: 'footer', variant: 'footer-direct' });
  const isLifetimeExternal = lifetimeHref.startsWith('http');

  return (
    <footer>
      <div className="logo">
        ROKIT<span>G</span>.FUN
      </div>
      <div className="footer-links">
        <a
          href={lifetimeHref}
          target={isLifetimeExternal ? '_blank' : undefined}
          rel={isLifetimeExternal ? 'noopener noreferrer' : undefined}
        >
          BUY LIFETIME
        </a>
        <Link href="/sponsors">REFLINKS</Link>
        <a href="https://x.com/rokitdotgg" target="_blank" rel="noopener noreferrer">
          X / @ROKITDOTGG
        </a>
        <Link href="/links">ALL LINKS</Link>
        <Link href="/whop">WHOP</Link>
        <Link href="/newsletter">NEWSLETTER</Link>
        <Link href="/kick">KICK</Link>
        <Link href="/sponsors">SPONSORS</Link>
        <Link href="/reviews">REVIEWS</Link>
      </div>
      <div className="footer-copy">© 2026 ROKITG · NOT FINANCIAL ADVICE</div>
    </footer>
  );
}
