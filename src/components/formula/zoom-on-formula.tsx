import { funcTransport, onReady } from '@connectv/sdh/transport';
import { copyToClipboard } from '../../transport/clipboard';

import { getRenderer } from '../../transport/renderer';
import { Overlay } from '../util/overlay';


export function zoomOnFormula() {
  const renderer = getRenderer();

  onReady(() => {
    const _exec = () => {
      document.querySelectorAll('[data-formula]').forEach(div$ => {
        div$.addEventListener('click', () => {
          const clone$ = div$.cloneNode(true) as HTMLElement;
          clone$.querySelector('.counter')?.remove();
          clone$.setAttribute('class', '');
          copyToClipboard(clone$.getAttribute('data-formula') || '', () => {
            renderer.render(<Overlay>
              <div style="white-space: nowrap">
                {clone$}
              </div>
            </Overlay>).on(document.body);
          });
        });
      });
    };

    _exec(); window.addEventListener('navigation', _exec);
  });
}


export const zoomOnFormula$ = /*#__PURE__*/funcTransport(zoomOnFormula);