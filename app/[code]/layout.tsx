import { generatePermutations } from 'flags/next';
import { marketingFlags } from '@/flags';

export async function generateStaticParams() {
  const codes = await generatePermutations(marketingFlags);
  return codes.map((code) => ({ code }));
}

export default function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
