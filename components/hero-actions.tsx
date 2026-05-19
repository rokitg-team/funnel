import type { WhopCtaExperimentVariant } from '@/flags';
import { getLifetimePrimaryAnchorAttrs, getLifetimePrimaryHref } from '@/lib/access-plans';

export function getHeroActionsHtml(variant: WhopCtaExperimentVariant): string {
  const lifetimeHref = getLifetimePrimaryHref({ cta: 'hero', variant });
  const lifetimeAttrs = getLifetimePrimaryAnchorAttrs();

  return `<a href="${lifetimeHref}" ${lifetimeAttrs} class="btn-primary btn-cta-blue" onclick="va('event',{name:'cta-main',data:{location:'hero',destination:'lifetime',plan:'lifetime',variant:'${variant}'}})">BUY LIFETIME DIRECT →</a>`;
}
