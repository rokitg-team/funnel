export type Review = {
  id: string;
  name: string;
  handle: string;
  initials: string;
  rating: number;
  text: string;
  highlight?: string;
  plan?: string;
};

export const reviews: Review[] = [
  {
    id: 'jake-k',
    name: 'Jake K.',
    handle: '@jakektrades',
    initials: 'JK',
    rating: 5,
    plan: 'Pro',
    highlight: '+47%',
    text: 'Hit +47% on the PEPE call last week. Rokit called the exact bottom. This group is different from all the others I\'ve tried.',
  },
  {
    id: 'marco-r',
    name: 'Marco R.',
    handle: '@marcoaltcoin',
    initials: 'MR',
    rating: 5,
    plan: 'Basic',
    highlight: '$800 → $2,100',
    text: 'I was losing money every month. First week in the group I turned $800 into $2,100. The signals are incredibly clean.',
  },
  {
    id: 'sam-l',
    name: 'Sam L.',
    handle: '@samuellcrypto',
    initials: 'SL',
    rating: 5,
    plan: 'Pro',
    highlight: '10x',
    text: 'Best investment I made this year — and I mean the membership, not even the trades. Already made 10x the cost back in week 2.',
  },
  {
    id: 'tina-w',
    name: 'Tina W.',
    handle: '@tinawif',
    initials: 'TW',
    rating: 5,
    plan: 'Elite',
    highlight: '+31%',
    text: 'The WIF short last month paid for my entire year. Entries and stops are so clear I finally stopped overtrading.',
  },
  {
    id: 'dev-p',
    name: 'Dev P.',
    handle: '@devonchain',
    initials: 'DP',
    rating: 5,
    plan: 'Pro',
    highlight: '3 months',
    text: 'Three months in and I\'m consistently green. The weekly recaps alone are worth the subscription.',
  },
  {
    id: 'alex-m',
    name: 'Alex M.',
    handle: '@alexmdegens',
    initials: 'AM',
    rating: 5,
    plan: 'Basic',
    highlight: 'first win',
    text: 'First signal I took was a BONK long — nailed target 2. I\'ve been in paid groups before and this is the only one that delivered.',
  },
  {
    id: 'nina-c',
    name: 'Nina C.',
    handle: '@ninacalls',
    initials: 'NC',
    rating: 5,
    plan: 'Pro',
    highlight: 'clarity',
    text: 'Love that every call shows risk/reward upfront. No hype, no guessing — just levels and context. Exactly what I needed.',
  },
  {
    id: 'ryan-t',
    name: 'Ryan T.',
    handle: '@ryanthechart',
    initials: 'RT',
    rating: 5,
    plan: 'Elite',
    highlight: '1-on-1',
    text: 'Elite tier monthly call helped me size positions properly. The private alpha channel catches moves before they hit the main feed.',
  },
  {
    id: 'lisa-h',
    name: 'Lisa H.',
    handle: '@lisahodl',
    initials: 'LH',
    rating: 5,
    plan: 'Basic',
    highlight: '+22%',
    text: 'Started with Basic to test it out. Averaged +22% on my last five trades following the signals. Upgraded to Pro immediately.',
  },
];
