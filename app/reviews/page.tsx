import type { Metadata } from 'next';
import Image from 'next/image';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { averageWhopRating, getReviewAvatarUrl, reviews, totalWhopReviews } from '@/lib/reviews';

export const metadata: Metadata = {
  title: 'Reviews — RokitG',
  description: `Real Whop reviews of The Circle. ${averageWhopRating.toFixed(1)}★ across ${totalWhopReviews} members. See what operators say.`,
};

const WHOP_URL = 'https://whop.com/the-circle-vip';

export default function ReviewsPage() {
  return (
    <>
      <SiteNav active="reviews" />

      <main className="reviews-page">
        <section className="reviews-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            VERIFIED ON WHOP · {averageWhopRating.toFixed(2)}★ · {totalWhopReviews} REVIEWS
          </div>
          <h1>
            SHOW ME <span className="green">THE</span>
            <br />
            RECEIPTS.
          </h1>
          <p className="reviews-hero-sub">
            Every review below is pulled from <strong>whop.com/@rokitg</strong>. <br />
            <strong>No edits, no curation</strong> — just what members wrote after joining.
          </p>
        </section>

        <section className="reviews-grid-section">
          <div className="reviews-grid">
            {reviews.map((r) => (
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
              {'// YOUR TURN'}
            </div>
            <h2>
              READY TO JOIN
              <br />
              <span className="green">THE CIRCLE?</span>
            </h2>
            <p>See the next signal the moment it drops.</p>
            <a
              href={WHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
              style={{ fontSize: 15, padding: '20px 48px' }}
              data-va-location="reviews-final"
              data-va-event="reviews-final-whop"
            >
              JOIN THE CIRCLE →
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
