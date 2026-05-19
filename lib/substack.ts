const SUBSTACK_URL = 'https://rokitg.substack.com';
const SUBSTACK_FEED = `${SUBSTACK_URL}/feed`;

export type SubstackPost = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
};

export type CuratedSubstackEmbed = {
  id: string;
  kind: 'post' | 'note';
  title: string;
  url: string;
  embedHtml: string;
  teaser?: boolean;
};

// Official embeds are copied manually from Substack's Share -> More -> Embed flow.
// Keep this repo-owned and trusted; do not populate from arbitrary remote HTML.
export const curatedSubstackEmbeds: CuratedSubstackEmbed[] = [];

function decode(html: string): string {
  return html
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripTags(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pluck(block: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = block.match(re);
  return match ? decode(match[1]).trim() : null;
}

export function formatSubstackDate(rfc: string, locale = 'en-US'): string {
  try {
    const date = new Date(rfc);
    return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return rfc;
  }
}

export async function fetchSubstackPosts(limit = 3): Promise<SubstackPost[]> {
  try {
    const res = await fetch(SUBSTACK_FEED, {
      next: { revalidate: 1800 },
      headers: { 'User-Agent': 'rokitg.fun/1.0 (+https://rokitg.fun)' },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

    return items.slice(0, limit).map((block) => {
      const rawDesc = pluck(block, 'description') ?? '';
      const excerpt = stripTags(rawDesc).slice(0, 180).trim();

      return {
        title: pluck(block, 'title') ?? 'Untitled',
        link: pluck(block, 'link') ?? SUBSTACK_URL,
        pubDate: pluck(block, 'pubDate') ?? '',
        excerpt: excerpt ? `${excerpt}${rawDesc.length > 180 ? '…' : ''}` : '',
      };
    });
  } catch {
    return [];
  }
}

export function getHomepageSubstackTeaser(): CuratedSubstackEmbed | null {
  return curatedSubstackEmbeds.find((embed) => embed.teaser) ?? null;
}

export { SUBSTACK_FEED, SUBSTACK_URL };
