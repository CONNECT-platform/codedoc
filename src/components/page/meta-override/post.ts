import { OverrideTarget, OverrideBehavior } from './types';


function overrideMeta(html: HTMLDocument, target: OverrideTarget, behavior: OverrideBehavior, override: string) {
  let el$ = html.querySelector(`meta[name="${target}"]`);

  if (!el$) {
    el$ = html.createElement('meta');
    el$.setAttribute('name', target);
    html.head.append(el$);
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


function addCanonical(html: HTMLDocument, content: string) {
  const el$ = html.createElement('link');
  el$.setAttribute('rel', 'canonical');
  el$.setAttribute('href', content);
  html.head.append(el$);
}


function addMetaWithProp(html: HTMLDocument, prop: string, content: string) {
  const el$ = html.createElement('meta');
  el$.setAttribute('property', prop);
  el$.setAttribute('content', content);
  html.head.append(el$);
}


export function pageSpecificMeta(html: HTMLDocument) {
  html.body.querySelectorAll('[data-meta-override]').forEach(override$ => {
    const target = override$.getAttribute('data-meta-override') as OverrideTarget;
    const behavior = (override$.getAttribute('data-meta-override-behavior') || 'replace') as OverrideBehavior;
    const content = override$.textContent || '';

    if (target === 'canonical') addCanonical(html, content);
    else overrideMeta(html, target, behavior, content);
  });

  html.body.querySelectorAll('[data-meta-override-property]').forEach(override$ => {
    const prop = override$.getAttribute('data-meta-override-property') || '';
    const content= override$.textContent || '';

    addMetaWithProp(html, prop, content);
  });
}
