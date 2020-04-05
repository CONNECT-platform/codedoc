import { funcTransport } from '@connectv/sdh/transport';

import { getRenderer } from '../../util/renderer';
import { copyToClipboard } from '../../util/clipboard';
import { Overlay } from '../util/overlay';
import { headingLink } from './heading-link';


export function copyHeadings() {
  const renderer = getRenderer();

  window.addEventListener('load', () => {
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading$ => {
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
  });
}


export const copyHeadings$ = funcTransport(copyHeadings);
