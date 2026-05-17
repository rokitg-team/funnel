export function getHeroActionsHtml(mainCta: boolean): string {
  if (mainCta) {
    return `<a href="https://whop.com/the-circle-vip" target="_blank" rel="noopener noreferrer" class="btn-primary" onclick="va('event',{name:'CTA Click',data:{location:'hero'}})">JOIN THE CIRCLE →</a>`;
  }

  return `<a href="#signals" class="btn-ghost" onclick="va('event',{name:'CTA Click',data:{location:'hero'}})">SEE SIGNALS ↓</a>`;
}
