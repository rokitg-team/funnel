import {
  type ClosedDoorModeVariant,
  getEffectiveClosedDoorMode,
  getMarketingCtaAnchorAttrs,
  getMarketingCtaHref,
  type HomepagePrimaryOfferVariant,
  type WhopCtaExperimentVariant,
} from '@/flags';
import { getJoinPlanHref } from '@/lib/access-plans';
import { getWaitlistHref } from '@/lib/waitlist';

export function getHeroActionsHtml(
  variant: WhopCtaExperimentVariant,
  offerVariant: HomepagePrimaryOfferVariant,
  closedDoorMode: ClosedDoorModeVariant,
  groupClosed: boolean,
): string {
  const effectiveClosedDoorMode = getEffectiveClosedDoorMode(closedDoorMode, groupClosed);

  let primaryHref = getMarketingCtaHref('hero', variant, effectiveClosedDoorMode === 'hard-close');
  let primaryAttrs = getMarketingCtaAnchorAttrs(
    'hero',
    variant,
    effectiveClosedDoorMode === 'hard-close',
  );
  let destination = 'lifetime';
  let plan = 'lifetime';
  let label = 'BUY LIFETIME DIRECT →';
  let eventName = 'lifetime-deal-init';

  if (effectiveClosedDoorMode !== 'hard-close') {
    if (offerVariant === 'free-trial') {
      primaryHref = getJoinPlanHref('free_trial', { cta: 'hero', variant, offer: offerVariant });
      primaryAttrs = '';
      destination = 'free_trial';
      plan = 'free_trial';
      label = 'START FREE TRIAL →';
      eventName = 'free-trial-init';
    } else if (offerVariant === 'waitlist-apply') {
      primaryHref = getWaitlistHref({ cta: 'hero', variant, offer: offerVariant });
      primaryAttrs = '';
      destination = 'waitlist';
      plan = 'waitlist';
      label = 'JOIN THE WAITLIST →';
      eventName = 'waitlist-cta';
    }
  } else {
    destination = 'waitlist';
    plan = 'waitlist';
    label = 'JOIN THE WAITLIST →';
    eventName = 'waitlist-cta';
  }

  return `<a href="${primaryHref}" ${primaryAttrs} class="btn-primary btn-cta-blue" onclick="va('event',{name:'${eventName}',data:{location:'hero',destination:'${destination}',plan:'${plan}',variant:'${variant}'}})">${label}</a>`;
}
