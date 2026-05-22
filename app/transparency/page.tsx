import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '@/components/site-chrome';
import { getWhopReviewStats } from '@/lib/reviews';
import { getTreasuryTransparency } from '@/lib/transparency';

export const metadata: Metadata = {
  title: 'Transparency — The Circle Treasury',
  description:
    'Public treasury page for The Circle: current BTC holdings, treasury value, cumulative purchases, and value per shareholder.',
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatSignedCurrency(value: number) {
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${formatCurrency(value)}`;
}

function formatPercent(value: number) {
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${(value * 100).toFixed(2)}%`;
}

function formatBtc(value: number) {
  return `${value.toFixed(8)} BTC`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function buildLinePath(values: number[], width: number, height: number, padding: number) {
  if (values.length === 0) {
    return '';
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  return values
    .map((value, index) => {
      const x = padding + (innerWidth * index) / Math.max(values.length - 1, 1);
      const y = height - padding - ((value - min) / range) * innerHeight;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

function buildAreaPath(values: number[], width: number, height: number, padding: number) {
  if (values.length === 0) {
    return '';
  }

  const line = buildLinePath(values, width, height, padding);
  const innerWidth = width - padding * 2;
  const endX = padding + innerWidth;
  const baselineY = height - padding;
  return `${line} L ${endX.toFixed(2)} ${baselineY.toFixed(2)} L ${padding.toFixed(2)} ${baselineY.toFixed(2)} Z`;
}

function buildMarkerPoints(values: number[], width: number, height: number, padding: number) {
  if (values.length === 0) {
    return [];
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  return values.map((value, index) => {
    const x = padding + (innerWidth * index) / Math.max(values.length - 1, 1);
    const y = height - padding - ((value - min) / range) * innerHeight;
    return { x, y };
  });
}

export default async function TransparencyPage() {
  const reviewStats = await getWhopReviewStats();
  const treasury = getTreasuryTransparency(reviewStats.memberCount);
  const width = 960;
  const height = 360;
  const padding = 30;
  const cumulativeValues = treasury.chartPoints.map((point) => point.cumulativeBtc);
  const linePath = buildLinePath(cumulativeValues, width, height, padding);
  const areaPath = buildAreaPath(cumulativeValues, width, height, padding);
  const markerPoints = buildMarkerPoints(cumulativeValues, width, height, padding);

  return (
    <>
      <SiteNav active="transparency" />

      <main className="transparency-page">
        <section className="transparency-hero">
          <div className="hero-badge">
            <div className="badge-dot" />
            TREASURY TRANSPARENCY · LIVE MEMBERS FROM WHOP · MANUAL LEDGER SYNC
          </div>
          <h1>
            SHOW THE <span className="green">STACK.</span>
            <br />
            SHOW THE BITCOIN.
          </h1>
          <p className="transparency-sub">
            This page exposes the current BTC treasury snapshot, cumulative holdings, and recent
            purchases behind The Circle. Member count is pulled live from Whop, while treasury buys
            are synced from the operator ledger so the public can see the capital base growing in
            plain sight.
          </p>
          <div className="transparency-hero-strip">
            <div className="transparency-pill">
              <span>As of</span>
              <strong>{formatDate(treasury.asOf)}</strong>
            </div>
            <div className="transparency-pill">
              <span>Active shareholders</span>
              <strong>{treasury.activeMembers}</strong>
            </div>
            <div className="transparency-pill">
              <span>Whop source</span>
              <strong>{reviewStats.whopProductTitle}</strong>
            </div>
          </div>
        </section>

        <section className="transparency-stat-grid">
          <article className="transparency-stat-card featured">
            <span className="transparency-stat-label">Treasury value</span>
            <strong>{formatCurrency(treasury.currentTreasuryValueUsd)}</strong>
            <p>Current marked value of the BTC treasury visible on the Whop treasury snapshot.</p>
          </article>
          <article className="transparency-stat-card">
            <span className="transparency-stat-label">Value per shareholder</span>
            <strong>{formatCurrency(treasury.valuePerShareholderUsd)}</strong>
            <p>Current treasury value divided by the live active member count from Whop.</p>
          </article>
          <article className="transparency-stat-card">
            <span className="transparency-stat-label">Cumulative BTC holdings</span>
            <strong>{formatBtc(treasury.currentTreasuryBalanceBtc)}</strong>
            <p>
              {treasury.purchaseCount} tracked purchases routed into the treasury ledger so far.
            </p>
          </article>
          <article className="transparency-stat-card">
            <span className="transparency-stat-label">Average buy-in</span>
            <strong>{formatCurrency(treasury.avgBuyPriceUsd)}</strong>
            <p>Blended USD cost basis across the current BTC treasury stack.</p>
          </article>
        </section>

        <section className="transparency-chart-shell">
          <div className="transparency-chart-copy">
            <div className="section-tag">{'// CUMULATIVE HOLDINGS'}</div>
            <h2>
              BTC TREASURY
              <br />
              <span className="green">BUILD CURVE</span>
            </h2>
            <p>
              Each marker is a treasury purchase. The line shows cumulative BTC held, which is the
              cleanest way to show capital compounding without pretending we have a direct public
              treasury API from Whop.
            </p>
            <div className="transparency-legend">
              <span>
                <i className="legend-swatch legend-swatch-line" />
                cumulative BTC
              </span>
              <span>
                <i className="legend-swatch legend-swatch-buy" />
                treasury buy
              </span>
            </div>
          </div>

          <div className="transparency-chart-frame">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="transparency-chart"
              role="img"
              aria-label="Cumulative bitcoin treasury holdings over recent purchases"
            >
              <defs>
                <linearGradient id="treasuryArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(91,169,255,0.38)" />
                  <stop offset="100%" stopColor="rgba(91,169,255,0)" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((ratio) => (
                <line
                  key={ratio}
                  x1={padding}
                  x2={width - padding}
                  y1={padding + (height - padding * 2) * ratio}
                  y2={padding + (height - padding * 2) * ratio}
                  className="transparency-grid-line"
                />
              ))}
              <path d={areaPath} fill="url(#treasuryArea)" />
              <path d={linePath} className="transparency-line-path" />
              {markerPoints.map((point, index) =>
                index === 0 ? null : (
                  <g key={treasury.chartPoints[index].date}>
                    <circle cx={point.x} cy={point.y} r="9" className="transparency-marker-glow" />
                    <circle cx={point.x} cy={point.y} r="5.5" className="transparency-marker-dot" />
                  </g>
                ),
              )}
            </svg>

            <div className="transparency-axis">
              {treasury.chartPoints.map((point) => (
                <span key={point.date}>{point.label}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="transparency-detail-grid">
          <article className="transparency-panel">
            <div className="transparency-panel-head">
              <div>
                <div className="section-tag">{'// RECENT PURCHASES'}</div>
                <h3>Treasury activity</h3>
              </div>
              <div className="transparency-mini-stat">
                <span>Unrealized PnL</span>
                <strong className={treasury.unrealizedPnlUsd >= 0 ? 'is-up' : 'is-down'}>
                  {formatSignedCurrency(treasury.unrealizedPnlUsd)} ·{' '}
                  {formatPercent(treasury.unrealizedPnlPct)}
                </strong>
              </div>
            </div>

            <div className="transparency-activity-list">
              {treasury.entries
                .slice()
                .reverse()
                .map((entry) => (
                  <div key={entry.id} className="transparency-activity-row">
                    <div>
                      <strong>Bought Bitcoin</strong>
                      <span>
                        {formatDate(entry.date)} · {entry.note}
                      </span>
                    </div>
                    <div className="transparency-activity-values">
                      <strong>{formatCurrency(entry.usd)}</strong>
                      <span>{formatBtc(entry.btc)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </article>

          <article className="transparency-panel">
            <div className="transparency-panel-head">
              <div>
                <div className="section-tag">{'// METHODOLOGY'}</div>
                <h3>How this page is calculated</h3>
              </div>
            </div>

            <div className="transparency-methodology">
              <div className="transparency-method-row">
                <span>Current treasury balance</span>
                <strong>{formatBtc(treasury.currentTreasuryBalanceBtc)}</strong>
              </div>
              <div className="transparency-method-row">
                <span>Current treasury value</span>
                <strong>{formatCurrency(treasury.currentTreasuryValueUsd)}</strong>
              </div>
              <div className="transparency-method-row">
                <span>Total cost basis</span>
                <strong>{formatCurrency(treasury.totalCostBasisUsd)}</strong>
              </div>
              <div className="transparency-method-row">
                <span>Implied BTC mark</span>
                <strong>{formatCurrency(treasury.spotPriceUsd)}</strong>
              </div>
              <div className="transparency-method-row">
                <span>Shareholder denominator</span>
                <strong>{treasury.activeMembers} active members</strong>
              </div>
            </div>

            <p className="transparency-method-note">
              Whop gives us the live company/member layer. The treasury side is currently synced
              from the operator ledger and dashboard snapshot rather than scraped from a private
              dashboard route, so the page stays stable and honest.
            </p>
          </article>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
