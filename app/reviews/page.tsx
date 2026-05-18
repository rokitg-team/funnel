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
