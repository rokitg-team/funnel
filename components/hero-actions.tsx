import { DEFAULT_CTA_VARIANT } from '@/flags';
import { BLINK_PRIMARY_CTA_LABEL, BLINK_TOKEN_URL } from '@/lib/blink';

export function getHeroActionsHtml(_groupClosed: boolean): string {
  return `<a href="${BLINK_TOKEN_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-cta-blue" onclick="window.rokitTrack && window.rokitTrack('blink-token-click',{location:'hero',destination:'blink',plan:'blink',variant:'${DEFAULT_CTA_VARIANT}'})">${BLINK_PRIMARY_CTA_LABEL}</a>`;
}
