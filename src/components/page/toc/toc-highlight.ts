import { funcTransport, onReady } from '@connectv/sdh/transport';

import { polyfillCustomEvent } from '../../../util/custom-event';


export function tocHighlight() {
  polyfillCustomEvent();

  let current$: HTMLAnchorElement | undefined;

  function highlightCurrentToCLink(url: string) {
    const toc = document.getElementById('-codedoc-toc');
    if (toc) {
      let curr$: HTMLAnchorElement | undefined;
      toc.querySelectorAll('a').forEach(a$ => {
        if (a$.getAttribute('href') === url) {
          if (!curr$) curr$ = a$;
          a$.classList.add('current');
        }
        else a$.classList.remove('current');
      });

      if (curr$) {
        curr$.dispatchEvent(new CustomEvent('collapse-open', {bubbles: true}));
        if (curr$ !== current$) current$?.dispatchEvent(new CustomEvent('collapse-close', {bubbles: true}));

        current$ = curr$;
      }
    }
  }

  onReady(() => highlightCurrentToCLink(location.pathname));
  window.addEventListener('navigation-start', event => highlightCurrentToCLink((event as any).detail.url));
}


export const tocHighlight$ = funcTransport(tocHighlight);