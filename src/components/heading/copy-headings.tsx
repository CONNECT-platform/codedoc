import { funcTransport, onReady } from '@connectv/sdh/transport';

import { getRenderer } from '../../transport/renderer';
import { copyToClipboard } from '../../transport/clipboard';
import { Overlay } from '../util/overlay';
import { headingLink } from './heading-link';


export function copyHeadings() {
  const renderer = getRenderer();

  onReady(() => {
    const _exec = () => {
      document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(heading$ => {
        const link = headingLink(heading$);
  
        if (link) {
          heading$.addEventListener('click', () => {
            copyToClipboard(link, () => renderer.render(<Overlay>
              Copied to Clipboard!
              <br/>
              <a href={link} style="font-size: 14px">{link}</a>
            </Overlay>).on(document.body));
          });
        }
      });
    };

    _exec(); window.addEventListener('navigation', _exec);
  });
}


export const copyHeadings$ = funcTransport(copyHeadings);
