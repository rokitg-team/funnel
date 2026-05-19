import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { TrustedEmbed } from '@/components/trusted-embed';
import {
  curatedSubstackEmbeds,
  fetchSubstackPosts,
  formatSubstackDate,
  SUBSTACK_URL,
} from '@/lib/substack';

export const metadata: Metadata = {
  title: "Newsletter — rokitg's circle",
  description:
    "Read and subscribe to rokitg's circle. Trade breakdowns and weekly recaps from @rokitdotgg. Refer friends, earn USDC.",
};

export default async function NewsletterPage() {
  const posts = await fetchSubstackPosts();

  return (
    <>
      <SiteNav active="newsletter" />

      <main className="platform-page substack-bg substack-brand">
        <section className="platform-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            ROKITG&apos;S CIRCLE · NEWSLETTER
          </div>
          <h1>
            READ THE
            <br />
            <span className="green">CIRCLE.</span>
          </h1>
          <p className="sub">
            Long-form trade breakdowns, market structure notes, and weekly recaps from{' '}
            <strong>@rokitdotgg</strong> — direct to your inbox.
            <br />
            <span className="substack-accent">
              <strong>Subscribe now for free.</strong>
            </span>
          </p>
          <div className="platform-actions">
            <a
              href={`${SUBSTACK_URL}/subscribe`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
              data-va-location="newsletter-subscribe"
              data-va-event="newsletter-hero-subscribe"
            >
              SUBSCRIBE FREE →
            </a>
          </div>
        </section>

        {curatedSubstackEmbeds.length > 0 ? (
          <section>
            <div className="section-tag">{'// OFFICIAL SUBSTACK EMBEDS'}</div>
            <h2>
              READ IT
              <br />
              <span className="green">IN PLACE.</span>
            </h2>
            <p className="section-sub">
              Official post and note embeds copied directly from Substack when a piece is worth
              featuring here.
            </p>

            <div className="substack-embed-grid">
              {curatedSubstackEmbeds.map((embed) => (
                <article key={embed.id} className="substack-embed-card">
                  <div className="substack-embed-meta">
                    <span>{embed.kind === 'note' ? 'SUBSTACK NOTE' : 'SUBSTACK POST'}</span>
                    <a
                      href={embed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-va-location={`newsletter-embed-${embed.id}`}
                      data-va-event="newsletter-embed-open"
                    >
                      Open on Substack ↗
                    </a>
                  </div>
                  <h3 className="substack-embed-title">{embed.title}</h3>
                  <TrustedEmbed html={embed.embedHtml} className="substack-embed-shell" />
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {posts.length > 0 && (
          <section>
            <div className="section-tag">{'// LATEST POSTS'}</div>
            <h2>
              FRESH OFF
              <br />
              <span className="green">THE PRESS.</span>
            </h2>
            <p className="section-sub">
              Live from <strong>rokitg.substack.com</strong> — auto-refreshes every 30 minutes.
            </p>

            <div className="post-grid">
              {posts.map((post, index) => (
                <a
                  key={post.link}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-card"
                  data-va-location={`newsletter-post-${index}`}
                  data-va-event={`newsletter-post-open-${index + 1}`}
                >
                  <div className="post-meta">
                    <span className="post-date">{formatSubstackDate(post.pubDate)}</span>
                    <span className="post-source">rokitg.substack.com</span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  {post.excerpt ? <p className="post-excerpt">{post.excerpt}</p> : null}
                  <div className="post-cta">
                    Read on Substack <span>→</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="section-tag">{'// WHAT YOU GET'}</div>
          <h2>
            EVERY POST.
            <br />
            <span className="green">EVERY SETUP.</span>
          </h2>
          <p className="section-sub">
            The newsletter is the receipts. Where every call gets the full context — chart, thesis,
            risk, what happened after.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feat-icon">📈</div>
              <div className="feat-title">TRADE BREAKDOWNS</div>
              <p className="feat-desc">
                Post-mortems on every major call. Why it worked, what to watch for next time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">🗞️</div>
              <div className="feat-title">WEEKLY RECAPS</div>
              <p className="feat-desc">
                The week in crypto. What pumped, what dumped, what&apos;s next on the radar.
              </p>
            </div>
            <div className="feature-card">
              <div className="feat-icon">💸</div>
              <div className="feat-title">REFERRAL USDC</div>
              <p className="feat-desc">
                Substack&apos;s referral program pays out in USDC. Invite friends, stack stables.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-tag" style={{ textAlign: 'center' }}>
              {'// FREE TO READ'}
            </div>
            <h2>
              SUBSCRIBE.
              <br />
              <span className="green">READ THE CIRCLE.</span>
            </h2>
            <p>Free posts. Paid tier coming. Always direct to your inbox.</p>
            <a
              href={`${SUBSTACK_URL}/subscribe`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-cta-blue"
              data-va-event="newsletter-final-subscribe"
              data-va-location="newsletter-subscribe"
            >
              SUBSCRIBE FREE →
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){document.querySelectorAll('[data-va-location]').forEach(function(el){el.addEventListener('click',function(){try{if(typeof window.va!=='function')return;var location=this.getAttribute('data-va-location');var eventName=this.getAttribute('data-va-event')||'newsletter-click';window.va('event',{name:eventName,data:{location:location,page:'newsletter'}})}catch(e){}})})})();`,
        }}
      />
    </>
  );
}
