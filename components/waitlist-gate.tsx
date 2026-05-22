import Link from 'next/link';
import { getWaitlistEmbedUrl, getWaitlistHref, hasEmbeddedWaitlistForm } from '@/lib/waitlist';

type WaitlistGateProps = {
  source: string;
  heading?: string;
  accent?: string;
  subtitle?: string;
  compact?: boolean;
};

const DEFAULT_SUBTITLE =
  'The Circle is temporarily closed to new members. Join the waitlist to get first notice when spots reopen, direct-buy windows come back, or a new intake batch goes live.';

export function WaitlistGate({
  source,
  heading = 'THE GROUP IS',
  accent = 'CURRENTLY CLOSED.',
  subtitle = DEFAULT_SUBTITLE,
  compact = false,
}: WaitlistGateProps) {
  const embedUrl = getWaitlistEmbedUrl({ source });
  const waitlistHref = getWaitlistHref({ source, mode: 'closed' });
  const hasEmbed = hasEmbeddedWaitlistForm();

  return (
    <section
      className={`waitlist-gate${compact ? ' is-compact' : ''}`}
      data-va-section="waitlist-gate"
    >
      <div className="waitlist-copy">
        <div className="section-tag">{'// CLOSED DOOR FUNNEL'}</div>
        <h2>
          {heading}
          <br />
          <span className="green">{accent}</span>
        </h2>
        <p className="section-sub">{subtitle}</p>

        <div className="waitlist-proof-row">
          <div className="waitlist-proof-card">
            <strong>Organic only</strong>
            <span>Traffic is landing from X, Instagram, and word of mouth.</span>
          </div>
          <div className="waitlist-proof-card">
            <strong>Mobile-first buyers</strong>
            <span>Most visitors are on phone, so the form stays fast and one-screen clean.</span>
          </div>
          <div className="waitlist-proof-card">
            <strong>Priority reopening notice</strong>
            <span>Waitlist leads hear first when direct-buy windows and new slots open again.</span>
          </div>
        </div>
      </div>

      <div className="waitlist-form-shell">
        <div className="waitlist-form-head">
          <div>
            <div className="waitlist-form-label">Priority intake</div>
            <div className="waitlist-form-title">Join the waitlist</div>
          </div>
          <div className="waitlist-form-pill">spots reopen in waves</div>
        </div>

        {hasEmbed ? (
          <iframe
            data-tally-src={embedUrl}
            src={embedUrl}
            title="The Circle waitlist form"
            loading="lazy"
            className="waitlist-iframe"
          />
        ) : (
          <div className="waitlist-fallback-card">
            <strong>Add your Tally form URL to finish the live embed.</strong>
            <p>
              Set <code>NEXT_PUBLIC_WAITLIST_TALLY_FORM_URL</code> to your Tally share link and this
              section will immediately render the embedded waitlist form.
            </p>
            <Link href={waitlistHref} className="btn-primary btn-cta-blue">
              OPEN WAITLIST PAGE →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
