import Link from 'next/link';

type SiteChromeProps = {
  active?: 'home' | 'reviews';
};

export function SiteNav({ active }: SiteChromeProps) {
  return (
    <nav>
      <Link href="/" className="logo">
        ROKIT<span>G</span>
      </Link>
      <div className="links">
        <Link href="/#signals">Signals</Link>
        <Link href="/#features">Features</Link>
        <Link href="/#pricing">Pricing</Link>
        <Link href="/reviews" className={active === 'reviews' ? 'nav-link-active' : undefined}>
          Reviews
        </Link>
        <a
          href="https://whop.com/the-circle-vip"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          JOIN NOW →
        </a>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="logo">
        ROKIT<span>G</span>.FUN
      </div>
      <div className="footer-links">
        <a href="https://x.com/rokitdotgg" target="_blank" rel="noopener noreferrer">
          TWITTER / X
        </a>
        <Link href="/#pricing">PRICING</Link>
        <Link href="/reviews">REVIEWS</Link>
        <a
          href="/#pricing"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          JOIN NOW →
        </a>
      </div>
      <div className="footer-copy">© 2026 ROKITG · NOT FINANCIAL ADVICE</div>
    </footer>
  );
}
