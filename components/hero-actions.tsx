const WHOP_URL = 'https://whop.com/the-circle-vip';

export function getHeroActionsHtml(): string {
  return `<a href="${WHOP_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-cta-blue" onclick="va('event',{name:'CTA Click',data:{location:'hero'}})">JOIN THE CIRCLE →</a>
      <a href="#signals" class="btn-ghost" onclick="va('event',{name:'CTA Click',data:{location:'hero-secondary'}})">SEE SIGNALS ↓</a>`;
}
