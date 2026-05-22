import type { Metadata } from 'next';
import Image from 'next/image';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { getReviewAvatarUrl, getWhopReviewStats } from '@/lib/reviews';

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getWhopReviewStats();

  return {
    title: 'Reviews — RokitG',
    description: `Live Whop proof for ${stats.whopProductTitle}. ${stats.averageRating.toFixed(1)}★ across ${stats.totalReviews} reviews and ${stats.memberCount} members.`,
  };
}

export default async function ReviewsPage() {
  const stats = await getWhopReviewStats();
  const hasLiveStats = stats.source === 'live';

  return (
    <>
      <SiteNav active="reviews" />

      <main className="reviews-page">
        <section className="reviews-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            {hasLiveStats ? 'LIVE FROM WHOP' : 'WHOP SNAPSHOT'} · {stats.averageRating.toFixed(2)}★
            · {stats.totalReviews} REVIEWS · {stats.memberCount} MEMBERS
          </div>
          <h1>
            SHOW ME <span className="green">THE</span>
            <br />
            RECEIPTS.
          </h1>
          <p className="reviews-hero-sub">
            The rating, review count, and member count on this page are pulled live from{' '}
            <strong>whop.com/@rokitg</strong>. <br />
            Written cards stay as highlighted member quotes unless Whop exposes public review bodies
            server-side.
          </p>

          <div className="reviews-stat-strip">
            <div className="reviews-stat-card">
              <span className="reviews-stat-label">Whop rating</span>
              <strong>{stats.averageRating.toFixed(2)}★</strong>
            </div>
            <div className="reviews-stat-card">
              <span className="reviews-stat-label">Published reviews</span>
              <strong>{stats.totalReviews}</strong>
            </div>
            <div className="reviews-stat-card">
              <span className="reviews-stat-label">Community size</span>
              <strong>{stats.memberCount}</strong>
            </div>
          </div>
        </section>

        <section className="reviews-grid-section">
          <div className="reviews-grid">
            {stats.reviews.map((r) => (
              <article key={r.id} className="testi-card review-card">
                {r.plan ? <span className="review-plan">{r.plan}</span> : null}
                <div className="stars" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {'★'.repeat(r.rating)}
                </div>
                <p className="testi-text">{r.text}</p>
                <div className="testi-author">
                  <Image
                    src={getReviewAvatarUrl(r.avatarSeed)}
                    alt={`${r.name} avatar`}
                    className="testi-avatar testi-avatar-image"
                    width={36}
                    height={36}
                  />
                  <div>
                    <div className="testi-name">{r.name}</div>
                    <div className="testi-handle">{r.handle}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section reviews-cta">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-tag" style={{ textAlign: 'center' }}>
              {'// LIVE WHOP PROOF'}
            </div>
            <h2>
              {stats.whopProductTitle.toUpperCase()}
              <br />
              <span className="green">ON WHOP</span>
            </h2>
            <p>
              {stats.memberCount} members in, {stats.totalReviews} published reviews, and a{' '}
              {stats.averageRating.toFixed(2)}★ average.
            </p>
            <a
              href={stats.whopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
              style={{ fontSize: 15, padding: '20px 48px' }}
              data-va-location="reviews-final"
              data-va-event="reviews-final-whop"
            >
              OPEN WHOP →
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){document.querySelectorAll('[data-va-location]').forEach(function(el){el.addEventListener('click',function(){try{if(typeof window.va!=='function')return;var location=this.getAttribute('data-va-location');var eventName=this.getAttribute('data-va-event')||'reviews-click';window.va('event',{name:eventName,data:{location:location,page:'reviews'}})}catch(e){}})})})();`,
        }}
      />
    </>
  );
}
