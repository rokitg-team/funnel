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

export function getReviewAvatarUrl(seed: string) {
  return `https://avatar.vercel.sh/${encodeURIComponent(seed)}`;
}

// Real reviews pulled from whop.com/@rokitg/reviews on 2026-05-18.
// 5.00 overall · 5 reviews on Whop. Two of the five had no written body
// (rating-only) so we surface the three with content.
export const reviews: Review[] = [
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

// Whop counts the silent ratings too. We keep the number accurate in copy
// even though we don't render a card for an empty review body.
export const totalWhopReviews = 5;
export const averageWhopRating = 5.0;
