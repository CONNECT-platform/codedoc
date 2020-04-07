import { funcTransport, onReady } from '@connectv/sdh/transport';


function polyfillCustomEvent() {
  if ( typeof window.CustomEvent === "function" ) return false; //If not IE

  function CustomEvent ( event: any, params: any ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  (window as any).CustomEvent = CustomEvent;
}


function navigate(url: string, push=true) {
  const container = document.getElementById('-codedoc-container') as HTMLElement;

  if (container) {
    container.style.opacity = '0';
    if (window.innerWidth <= 1200 && (window as any).codedocToggleToC)
      (window as any).codedocToggleToC(false);

    fetch(url)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');

      const title = document.head.querySelector('title');
      if (title) title.innerHTML = dom.head.querySelector('title')?.innerHTML || title.innerHTML;

      setTimeout(() => {
        container.innerHTML = dom.getElementById('-codedoc-container')?.innerHTML || '';
        container.querySelectorAll('script').forEach(s => eval(s.textContent || ''));
  
        setTimeout(() => container.style.opacity = '1', 10);
        window.dispatchEvent(new CustomEvent('navigation', { detail: { url } }));
        if (push) history.pushState(url, '', url);
      }, 150);
    });
  }
  else window.location.href = url;
}


export function smoothLoading() {
  polyfillCustomEvent();
  onReady(() => {
    if (!(window as any).__smooth_loading_plugged) {
      (window as any).__smooth_loading_plugged = true;
      document.addEventListener('click', event => {
        let target = event.target as HTMLElement;
      
        while (target && !(target as any).href) {
          target = target.parentNode as HTMLElement;
        }
      
        if (target && target.getAttribute('href')?.startsWith('/')) {
          const url = target.getAttribute('href') || '';
          event.preventDefault();
          navigate(url);
          return;
        }
      });

      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      window.addEventListener('popstate', event => {
        if (isSafari) window.location.href = event.state || '/';
        else navigate(event.state || '/', false);
      });
    }
  });
}

export const smoothLoading$ = funcTransport(smoothLoading);
