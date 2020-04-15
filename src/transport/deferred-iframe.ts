import { funcTransport, onReady } from '@connectv/sdh/transport';


export function loadDeferredIFrames() {
  onReady(() => {
    const _exec = () => {
      setTimeout(() => {
        document.querySelectorAll('iframe[deferred-src]').forEach(frame$ => {
          (frame$ as HTMLIFrameElement).src = frame$.getAttribute('deferred-src') || '';
        });
      }, 100);
    };

    _exec();
    window.addEventListener('navigation', _exec);
  });
}


export const deferredIframes$ = /*#__PURE__*/funcTransport(loadDeferredIFrames);
