export type Review = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatarSeed: string;
  rating: number;
  text: string;
  highlight?: string;
  plan?: string;
  date?: string;
};

export type WhopReviewStats = {
  averageRating: number;
  memberCount: number;
  reviews: Review[];
  source: 'fallback' | 'live';
  totalReviews: number;
  updatedAt: string;
  whopProductTitle: string;
  whopUrl: string;
};

type OwnedWhopNode = {
  createdAt?: number | null;
  id?: string;
  industryType?: string | null;
  logo?: {
    sourceUrl?: string | null;
  } | null;
  memberCount?: number | null;
  publishedReviewsCount?: number | null;
  reviewsAverage?: number | null;
  route?: string | null;
  title?: string | null;
};

const WHOP_PROFILE_URL = 'https://whop.com/@rokitg/';
const WHOP_ROUTE = 'the-circle-vip';
const DEFAULT_WHOP_URL = `https://whop.com/${WHOP_ROUTE}`;

export function getReviewAvatarUrl(seed: string) {
  return `https://avatar.vercel.sh/${encodeURIComponent(seed)}`;
}

// Written highlights we can still show even if Whop does not expose the raw
// review bodies in its public server HTML.
const fallbackReviews: Review[] = [
  {
    id: 'frejoshi',
    name: 'frejoshi',
    handle: '@frejoshi',
    initials: 'FJ',
    avatarSeed: 'frejoshi',
    rating: 5,
    plan: 'The Circle',
    highlight: 'Day one',
    date: '2026-05-16',
    text: "Met Rokit a while ago in the trenches, and I know he's for sure one to pay attention to. Which is why I had no hesitation joining when he launched this group. He's delivered since day one — and even better, sharp traders attract sharp traders, so the group has compounded into something genuinely high-signal.",
  },
  {
    id: 'zijox',
    name: 'zijox',
    handle: '@zijox',
    initials: 'ZJ',
    avatarSeed: 'zijox',
    rating: 5,
    plan: 'The Circle',
    highlight: 'Perps + onchain',
    date: '2026-05-16',
    text: 'New group, but if you want to join a group of people who want to WIN and are constantly online, give it a try. Also good calls from rokit whether its perps or onchain — always a good tail/confluence.',
  },
  {
    id: 'kain-mckain',
    name: 'Kain Mckain',
    handle: '@kainmckain',
    initials: 'KM',
    avatarSeed: 'kainmckain',
    rating: 5,
    plan: 'The Circle',
    highlight: 'Early days',
    date: '2026-05-15',
    text: 'Nice new group. Owner eager to grow it. Can see this becoming big over time — but very early for now.',
  },
];

const fallbackReviewStats: WhopReviewStats = {
  averageRating: 5,
  memberCount: 45,
  reviews: fallbackReviews,
  source: 'fallback',
  totalReviews: 7,
  updatedAt: new Date('2026-05-21T00:00:00.000Z').toISOString(),
  whopProductTitle: 'The Circle',
  whopUrl: DEFAULT_WHOP_URL,
};

function extractBalancedJsonArray(input: string, anchor: string) {
  const anchorIndex = input.indexOf(anchor);
  if (anchorIndex < 0) {
    return null;
  }

  const start = anchorIndex + anchor.length;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < input.length; i += 1) {
    const char = input[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === '[') {
      depth += 1;
      continue;
    }

    if (char !== ']') {
      continue;
    }

    depth -= 1;

    if (depth === 0) {
      return input.slice(start, i + 1);
    }
  }

  return null;
}

function parseOwnedWhops(html: string) {
  const nodesJson = extractBalancedJsonArray(html, '"ownedWhops":{"nodes":');

  if (!nodesJson) {
    return [];
  }

  try {
    const parsed = JSON.parse(nodesJson) as OwnedWhopNode[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toLiveStats(node: OwnedWhopNode): WhopReviewStats | null {
  const route = node.route?.trim();
  const title = node.title?.trim();
  const totalReviews = node.publishedReviewsCount;
  const averageRating = node.reviewsAverage;
  const memberCount = node.memberCount;

  if (
    !route ||
    !title ||
    typeof totalReviews !== 'number' ||
    typeof averageRating !== 'number' ||
    typeof memberCount !== 'number'
  ) {
    return null;
  }

  return {
    averageRating,
    memberCount,
    reviews: fallbackReviews,
    source: 'live',
    totalReviews,
    updatedAt: new Date().toISOString(),
    whopProductTitle: title,
    whopUrl: `https://whop.com/${route}`,
  };
}

export async function getWhopReviewStats(): Promise<WhopReviewStats> {
  try {
    const response = await fetch(WHOP_PROFILE_URL, {
      cache: 'no-store',
      headers: {
        'user-agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return fallbackReviewStats;
    }

    const html = await response.text();
    const ownedWhops = parseOwnedWhops(html);
    const circle = ownedWhops.find((node) => node.route === WHOP_ROUTE);

    return toLiveStats(circle ?? {}) ?? fallbackReviewStats;
  } catch {
    return fallbackReviewStats;
  }
}
