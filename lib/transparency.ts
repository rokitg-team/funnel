export type TreasuryLedgerEntry = {
  id: string;
  date: string;
  btc: number;
  usd: number;
  note: string;
  source: string;
};

export type TreasuryChartPoint = {
  date: string;
  label: string;
  cumulativeBtc: number;
  purchaseUsd: number;
};

const ledgerEntries: TreasuryLedgerEntry[] = [
  {
    id: 'btc-2026-05-15',
    date: '2026-05-15',
    btc: 0.00012126,
    usd: 9.87,
    note: 'First BTC treasury buy',
    source: 'Whop treasury',
  },
  {
    id: 'btc-2026-05-18',
    date: '2026-05-18',
    btc: 0.00064317,
    usd: 49.51,
    note: 'Added on weakness',
    source: 'Whop treasury',
  },
  {
    id: 'btc-2026-05-21',
    date: '2026-05-21',
    btc: 0.00056029,
    usd: 43.6,
    note: 'Top-up before close',
    source: 'Whop treasury',
  },
];

const CURRENT_TREASURY_VALUE_USD = 102.87;
const CURRENT_TREASURY_BALANCE_BTC = 0.00132472;
const LEDGER_SYNC_DATE = '2026-05-21T23:00:00.000Z';

function formatAxisLabel(date: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(date));
}

function buildChartSeries(entries: TreasuryLedgerEntry[]): TreasuryChartPoint[] {
  let cumulativeBtc = 0;
  const points: TreasuryChartPoint[] = [
    {
      date: '2026-05-12',
      label: formatAxisLabel('2026-05-12'),
      cumulativeBtc: 0,
      purchaseUsd: 0,
    },
  ];

  for (const entry of entries) {
    cumulativeBtc += entry.btc;
    points.push({
      date: entry.date,
      label: formatAxisLabel(entry.date),
      cumulativeBtc,
      purchaseUsd: entry.usd,
    });
  }

  return points;
}

export function getTreasuryTransparency(activeMembers: number) {
  const totalCostBasisUsd = ledgerEntries.reduce((sum, entry) => sum + entry.usd, 0);
  const totalPurchasedBtc = ledgerEntries.reduce((sum, entry) => sum + entry.btc, 0);
  const avgBuyPriceUsd = totalCostBasisUsd / totalPurchasedBtc;
  const valuePerShareholderUsd = activeMembers > 0 ? CURRENT_TREASURY_VALUE_USD / activeMembers : 0;
  const unrealizedPnlUsd = CURRENT_TREASURY_VALUE_USD - totalCostBasisUsd;
  const unrealizedPnlPct = totalCostBasisUsd > 0 ? unrealizedPnlUsd / totalCostBasisUsd : 0;
  const spotPriceUsd = CURRENT_TREASURY_VALUE_USD / CURRENT_TREASURY_BALANCE_BTC;

  return {
    activeMembers,
    asOf: LEDGER_SYNC_DATE,
    avgBuyPriceUsd,
    chartPoints: buildChartSeries(ledgerEntries),
    currentTreasuryBalanceBtc: CURRENT_TREASURY_BALANCE_BTC,
    currentTreasuryValueUsd: CURRENT_TREASURY_VALUE_USD,
    entries: ledgerEntries,
    purchaseCount: ledgerEntries.length,
    spotPriceUsd,
    totalCostBasisUsd,
    totalPurchasedBtc,
    unrealizedPnlPct,
    unrealizedPnlUsd,
    valuePerShareholderUsd,
  };
}
