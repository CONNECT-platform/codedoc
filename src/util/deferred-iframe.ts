import { funcTransport } from '@connectv/sdh/transport';


export function loadDeferredIFrames() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('iframe[deferred-src]').forEach(frame$ => {
        (frame$ as HTMLIFrameElement).src = frame$.getAttribute('deferred-src') || '';
      });
    }, 100);
  });
}


export const deferredIframes$ = funcTransport(loadDeferredIFrames);
