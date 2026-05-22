import { DEFAULT_CTA_VARIANT, getMarketingCtaAnchorAttrs, getMarketingCtaHref } from '@/flags';

export function getHeroActionsHtml(groupClosed: boolean): string {
  const primaryHref = getMarketingCtaHref('hero', groupClosed);
  const primaryAttrs = getMarketingCtaAnchorAttrs('hero', groupClosed);
  const destination = groupClosed ? 'waitlist' : 'lifetime';
  const plan = destination;
  const label = groupClosed ? 'JOIN THE WAITLIST →' : 'BUY LIFETIME DIRECT →';
  const eventName = groupClosed ? 'waitlist-cta' : 'lifetime-deal-init';

  return `<a href="${primaryHref}" ${primaryAttrs} class="btn-primary btn-cta-blue" onclick="va('event',{name:'${eventName}',data:{location:'hero',destination:'${destination}',plan:'${plan}',variant:'${DEFAULT_CTA_VARIANT}'}})">${label}</a>`;
}
