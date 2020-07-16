import { funcTransport, onReady } from '@connectv/sdh/transport';

import { polyfillCustomEvent } from './custom-event';


let lastpath: string | undefined = undefined;


function navigate(url: string, push=true) {
  let container = document.getElementById('-codedoc-container') as HTMLElement;

  if (container) {
    if (window.innerWidth <= 1200 && (window as any).codedocToggleToC)
      (window as any).codedocToggleToC(false);

    if (push && url === location.pathname) {
      window.dispatchEvent(new CustomEvent('same-page-navigation', { detail: { url }}));
      return;
    }

    container.style.opacity = '0';
    if (push) {
      history.pushState(url, '', url);
      lastpath = location.pathname;
    }

    window.dispatchEvent(new CustomEvent('navigation-start', { detail: { url } }));
    fetch(url)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');

      const title = document.head.querySelector('title');
      if (title) title.innerHTML = dom.head.querySelector('title')?.innerHTML || title.innerHTML;

      setTimeout(() => {
        container.innerHTML = '';
        const _newc = dom.getElementById('-codedoc-container');
        if (_newc) {
          container.parentElement?.insertBefore(_newc, container);
          container.remove();
          container = _newc;
          container.style.transition = 'none';
          container.style.opacity = '0';
          container.querySelectorAll('script').forEach(s => {
            const _s = document.createElement('script');
            s.getAttributeNames().forEach(attr => _s.setAttribute(attr, s.getAttribute(attr)!!));
            _s.text = s.text;
            s.parentElement?.insertBefore(_s, s);
            s.remove();
          });
        }

        if (push) {
          document.documentElement.style.scrollBehavior = 'auto';
        }

        setTimeout(() => {
          if (push) {
            window.scroll(0, 0);
            setTimeout(() => {
              document.documentElement.style.scrollBehavior = '';
              if (window.location.hash) {
                document.querySelector(window.location.hash)?.scrollIntoView();
              }
            }, 10);
          }
          container.style.transition = '';
          container.style.opacity = '1';
        }, 50);
        window.dispatchEvent(new CustomEvent('navigation', { detail: { url } }));
      }, 150);
    });
  }
  else {
    window.location.href = url;
    lastpath = location.pathname;
  }
}


export function smoothLoading() {
  polyfillCustomEvent();
  onReady(() => {
    lastpath = location.pathname;
    if (!(window as any).__smooth_loading_plugged) {
      (window as any).__smooth_loading_plugged = true;
      document.addEventListener('click', event => {
        let target = event.target as HTMLElement;
      
        while (target && !(target as any).href) {
          target = target.parentNode as HTMLElement;
        }

        if (target && (target.getAttribute('href')?.startsWith('/')) && target.getAttribute('target') !== '_blank') {
          const url = target.getAttribute('href') || '';
          event.preventDefault();
          navigate(url);
          return;
        }
      });

      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      window.addEventListener('popstate', event => {
        if (location.pathname === lastpath) return;

        lastpath = location.pathname;

        if (isSafari) window.location.href = event.state || window.location.href;
        else navigate(event.state || window.location.href, false);
      });
    }
  });
}

export const smoothLoading$ = /*#__PURE__*/funcTransport(smoothLoading);
