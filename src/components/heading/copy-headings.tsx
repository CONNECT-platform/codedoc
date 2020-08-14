import { funcTransport, onReady } from '@connectv/sdh/transport';

import { getRenderer } from '../../transport/renderer';
import { copyToClipboard } from '../../transport/clipboard';
import { Toast } from '../util/toast';
import { headingLink } from './heading-link';


export function copyHeadings() {
  const renderer = getRenderer();

  onReady(() => {
    const _exec = () => {
      document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(heading$ => {
        const link = headingLink(heading$);
  
        if (link) {
          heading$.addEventListener('mousedown', event => {
            const og = event as MouseEvent;
            const listener = (event: MouseEvent) => {
              const dx = event.clientX - og.clientX;
              const dy = event.clientY - og.clientY;
              if (Math.sqrt(dx * dx + dy * dy) < 10) {
                copyToClipboard(link, () => renderer.render(<Toast>
                  Link Copied to Clipboard!
                </Toast>).on(document.body));
              };
              heading$.removeEventListener('mouseup', listener as any);
            };
            heading$.addEventListener('mouseup', listener as any);
          });
        }
      });
    };

    _exec(); window.addEventListener('navigation', _exec);
  });
}


export const copyHeadings$ = /*#__PURE__*/funcTransport(copyHeadings);
