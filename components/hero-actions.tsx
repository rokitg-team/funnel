import type { WhopCtaExperimentVariant } from '@/flags';

export function getHeroActionsHtml(_variant: WhopCtaExperimentVariant): string {
  const heroHref = 'https://rokitg.fun/whop?plan=base&cta=hero&variant=hero-embed-preview';

  return `<a href="${heroHref}" class="btn-primary btn-cta-blue" onclick="va('event',{name:'cta-main',data:{location:'hero',destination:'whop',plan:'base',variant:'hero-embed-preview'}})">START FREE TRIAL →</a>`;
}
