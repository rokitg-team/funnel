import { redirect } from 'next/navigation';

type LegacyLifetimeDealPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function withQuery(path: string, params: Record<string, string | string[] | undefined>) {
  const url = new URL(path, 'https://rokitg.fun');

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' && value) {
      url.searchParams.set(key, value);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (item) {
          url.searchParams.append(key, item);
        }
      }
    }
  }

  return `${url.pathname}${url.search}`;
}

export default async function LegacyLifetimeDealPage({
  searchParams,
}: LegacyLifetimeDealPageProps) {
  redirect(withQuery('/lifetime', (await searchParams) ?? {}));
}
