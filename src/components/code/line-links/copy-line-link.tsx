import { funcTransport, onReady } from '@connectv/sdh/transport';

import { getRenderer } from '../../../transport/renderer';
import { copyToClipboard } from '../../../transport/clipboard';
import { Overlay } from '../../util/overlay';
import { Toast } from '../../util/toast';
import { lineLink, linkedLines } from './line-link';


export function copyLineLinks() {
  const renderer = getRenderer();

  onReady(() => {
    const _exec = () => {
      document.querySelectorAll('pre>code>.-codedoc-code-line').forEach(line$ => {
        const counter$ = line$.querySelector('.-codedoc-line-counter');
        counter$?.addEventListener('click', event => {
          event.stopPropagation();

          const link = lineLink(line$ as HTMLElement);
          copyToClipboard(link!!, () => renderer.render(<Toast>
            Link Copied to Clipboard!
            <br/>
            <a href={link} style="font-size: 12px; color: white">{link}</a>
          </Toast>).on(document.body));
        });

        counter$?.addEventListener('mousedown', event => event.stopPropagation());
        counter$?.addEventListener('mouseup', event => event.stopPropagation());
      });
    };

    const _detect = () => {
      const linked = linkedLines();

      if (linked.length > 0) {
        linked[0].parentElement?.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
      }

      linked.forEach(line$ => {
        line$?.classList.add('selected');
        line$?.parentElement?.classList.add('has-selection');
      });

      if (linked.length > 0)
        setTimeout(() => linked[0]?.scrollIntoView({ block: 'center' }), 300);
    };

    _exec();
    _detect();

    window.addEventListener('navigation', () => { _exec(); _detect(); });
    window.addEventListener('hashchange', _detect);
  });
}

export const copyLineLiks$ = /*#__PURE__*/funcTransport(copyLineLinks);