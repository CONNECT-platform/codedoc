import { funcTransport, onReady } from '@connectv/sdh/transport';

import { polyfillCustomEvent } from '../../../transport/custom-event';


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
        if (curr$ !== current$) current$?.dispatchEvent(new CustomEvent('collapse-close', {bubbles: true}));
        curr$.dispatchEvent(new CustomEvent('collapse-open', {bubbles: true}));

        current$ = curr$;
      }
    }
  }

  onReady(() => setTimeout(() => highlightCurrentToCLink(location.pathname), 200));
  window.addEventListener('navigation-start', event => highlightCurrentToCLink((event as any).detail.url));
}


export const tocHighlight$ = /*#__PURE__*/funcTransport(tocHighlight);