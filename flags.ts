import { flag } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';

export const mainCtaFlag = flag<boolean>({
  key: 'main-cta',
  description: 'Join The Circle vs Navigation Links',
  defaultValue: false,
  options: [
    { value: false, label: 'Off' },
    { value: true, label: 'On' },
  ],
  adapter: vercelAdapter(),
});

export const marketingFlags = [mainCtaFlag] as const;
