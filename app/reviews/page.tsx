import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { reviews } from '@/lib/reviews';

export const metadata: Metadata = {
  title: 'Reviews — RokitG',
  description:
    'See what members say about RokitG crypto signals. Real results from traders in The Circle.',
};

export default function ReviewsPage() {
  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <>
      <SiteNav active="reviews" />

      <main className="reviews-page">
        <section className="reviews-hero">
          <div className="section-tag">{'// MEMBER REVIEWS'}</div>
          <h1>
            TRADERS WHO
            <br />
            <span className="green">ACTUALLY PRINT</span>
          </h1>
          <p className="reviews-hero-sub">
            {reviews.length} verified member stories ·{' '}
            <strong>{average.toFixed(1)}</strong> average rating
          </p>
          <div className="hero-actions">
            <a
              href="https://whop.com/the-circle-vip"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
            >
              JOIN THE CIRCLE →
            </a>
            <Link href="/#pricing" className="btn-ghost">
              VIEW PRICING
            </Link>
          </div>
        </section>

        <section className="reviews-grid-section">
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article key={review.id} className="testi-card review-card">
                <div
                  className="stars"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {'★'.repeat(review.rating)}
                </div>
                {review.plan ? (
                  <span className="review-plan">{review.plan}</span>
                ) : null}
                <p className="testi-text">{review.text}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{review.initials}</div>
                  <div>
                    <div className="testi-name">{review.name}</div>
                    <div className="testi-handle">{review.handle}</div>
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
              href="https://whop.com/the-circle-vip"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
              style={{ fontSize: 15, padding: '20px 48px' }}
            >
              JOIN THE CIRCLE →
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
