import { funcTransport, onReady } from '@connectv/sdh/transport';


export function tocHighlight() {
  function highlightCurrentToCLink(url: string) {
    const toc = document.getElementById('-codedoc-toc');
    if (toc) {
      toc.querySelectorAll('a').forEach(a$ => {
        if (a$.getAttribute('href') === url) a$.classList.add('current');
        else a$.classList.remove('current');
      });
    }
  }

  onReady(() => highlightCurrentToCLink(location.pathname));
  window.addEventListener('navigation-start', event => highlightCurrentToCLink((event as any).detail.url));
}


export const tocHighlight$ = funcTransport(tocHighlight);