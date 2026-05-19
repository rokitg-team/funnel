const DEFAULT_SITE_ORIGIN = 'https://rokitg.fun';

function normalizeSiteOrigin(value: string | undefined) {
  if (!value) {
    return DEFAULT_SITE_ORIGIN;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return DEFAULT_SITE_ORIGIN;
  }

  try {
    return new URL(trimmed).origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export const SITE_ORIGIN = normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export function getSiteUrl(path = '/') {
  return new URL(path, SITE_ORIGIN).toString();
}
