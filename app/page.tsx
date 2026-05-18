import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getHeroActionsHtml } from '@/components/hero-actions';

export default function HomePage() {
  const heroHtml = getHeroActionsHtml();

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
