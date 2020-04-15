import { funcTransport } from '@connectv/sdh/transport';
import { copyToClipboard } from '../../transport/clipboard';
import { copyConfirm } from './copy-confirm';


function _findTarget(anchor$: Element): HTMLElement | undefined {
  if (anchor$.previousElementSibling) {
    const nephew$ = anchor$.previousElementSibling.querySelector('pre>code');
    if (nephew$) return nephew$ as HTMLElement;

    const target$ = _findTarget(anchor$.previousElementSibling);
    if (target$) return target$;
    else if (anchor$.parentElement) return _findTarget(anchor$.parentElement);
  }

  if (anchor$.parentElement)
    return _findTarget(anchor$.parentElement);
}


export function smartCopy(el$: HTMLElement, self = false) {
  const target$ = self ? el$ : _findTarget(el$);
  if (target$) {
    const lines$: HTMLElement[] = [];

    if (target$.classList.contains('has-selection'))
      target$.querySelectorAll('div').forEach((line$ => {
        if (line$.classList.contains('selected'))
          lines$.push(line$);
      }));
    else
      target$.querySelectorAll('div').forEach(line$ => lines$.push(line$));

    copyToClipboard(
      lines$.map(line$ => line$.getAttribute('data-content')).join('\n'),
      () => copyConfirm(...lines$)
    );
  }
}


export function initSmartCopy() {
  (window as any).smartCopy = smartCopy;
}


export const smartCopy$ = /*#__PURE__*/funcTransport(initSmartCopy);