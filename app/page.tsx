import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getHeroActionsHtml } from '@/components/hero-actions';
import { mainCtaFlag, marketingFlags } from '@/flags';

type PageProps = {
  params: Promise<{ code: string }>;
};

export default async function Page({ params }: PageProps) {
  const { code } = await params;
  const mainCta = await mainCtaFlag(code, marketingFlags);
  const heroHtml = getHeroActionsHtml(mainCta);

  let body = readFileSync(
    join(process.cwd(), 'content/page-body.html'),
    'utf8',
  );
  body = body.replace('__HERO_ACTIONS__', heroHtml);

  return (
    <div
      style={{ display: 'contents' }}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
