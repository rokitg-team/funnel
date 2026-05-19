export const WAITLIST_PATH = '/waitlist';
export const WAITLIST_TALLY_FORM_URL =
  process.env.NEXT_PUBLIC_WAITLIST_TALLY_FORM_URL?.trim() ?? '';

function normalizeTallyUrl(value: string) {
  if (!value) {
    return '';
  }

  if (value.startsWith('https://tally.so/embed/')) {
    return value;
  }

  if (value.startsWith('https://tally.so/r/')) {
    return value.replace('https://tally.so/r/', 'https://tally.so/embed/');
  }

  return value;
}

export function getWaitlistHref(extras: Record<string, string | undefined> = {}) {
  const url = new URL(WAITLIST_PATH, 'https://rokitg.fun');

  for (const [param, value] of Object.entries(extras)) {
    if (value) {
      url.searchParams.set(param, value);
    }
  }

  return `${url.pathname}${url.search}`;
}

export function getWaitlistEmbedUrl(extras: Record<string, string | undefined> = {}) {
  const base = normalizeTallyUrl(WAITLIST_TALLY_FORM_URL);

  if (!base) {
    return '';
  }

  const url = new URL(base);
  url.searchParams.set('transparentBackground', '1');
  url.searchParams.set('dynamicHeight', '1');

  for (const [param, value] of Object.entries(extras)) {
    if (value) {
      url.searchParams.set(param, value);
    }
  }

  return url.toString();
}

export function hasEmbeddedWaitlistForm() {
  return Boolean(normalizeTallyUrl(WAITLIST_TALLY_FORM_URL));
}
