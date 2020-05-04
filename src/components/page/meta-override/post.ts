import { OverrideTarget, OverrideBehavior } from './types';


function overrideMeta(html: HTMLDocument, target: OverrideTarget, behavior: OverrideBehavior, override: string) {
  let el$ = html.querySelector(`meta[name="${target}"]`);
  if (!el$) {
    el$ = html.createElement('meta');
    el$.setAttribute('name', target);
  }

  let content = el$.getAttribute('content') || '';

  if (behavior === 'replace') content = override;
  else {
    if (target === 'keywords') content = [
        ...content.split(',').map(_ => _.trim()), 
        ...override.split(',').map(_ => _.trim())
      ].join(', ');
    else content = [content.trim(), override.trim()].join(' ');
  }

  el$.setAttribute('content', content);
}


export function pageSpecificMeta(html: HTMLDocument) {
  html.body.querySelectorAll('[data-meta-override]').forEach(override$ => {
    overrideMeta(html, 
      override$.getAttribute('data-meta-override') as OverrideTarget,
      (override$.getAttribute('data-meta-override-behavior') || 'replace') as OverrideBehavior,
      override$.textContent || '',
    )
  });
}
