import { funcTransport, onReady } from '@connectv/sdh/transport';

import { copyToClipboard } from '../../transport/clipboard';
import { copyConfirm } from './copy-confirm';
import { smartCopy } from './smart-copy';


export function codeSelection() {
  onReady(() => {
    const _exec = () => {
      document.querySelectorAll('pre>code').forEach(code$ => {
        code$.querySelectorAll('div').forEach(line$ => {
          line$.addEventListener('mouseenter', event => {
            if (event.buttons === 1) {
              line$.classList.add('selected');
              line$.setAttribute('data-just-selected', 'true');
            }
          });
    
          line$.addEventListener('mousedown', event => {
            if (!event.shiftKey) {
              code$.childNodes.forEach(child => {
                if (child !== line$) (child as HTMLElement).classList.remove('selected');
              });
            }
    
            line$.classList.toggle('selected');
            if (line$.classList.contains('selected')) line$.setAttribute('data-just-selected', 'true');
          });
    
          line$.addEventListener('click', event => {
            if (!event.shiftKey) {
              line$.classList.remove('selected');
              line$.removeAttribute('data-just-selected');
              if (!code$.classList.contains('has-selection')) {
                const copyContent = line$.getAttribute('data-content') || '';
                if (copyContent.trim().length > 0)
                  copyToClipboard(copyContent, () => copyConfirm(line$));
              }
            }
          });
        });
  
        code$.addEventListener('mouseup', () => {
          setTimeout(() => {
            if (code$.querySelectorAll('.selected').length > 0) {
              document.querySelectorAll('pre>code').forEach(c$ => {
                if (c$ === code$) return;
                c$.classList.remove('has-selection');
                c$.querySelectorAll('.selected').forEach(l$ => l$.classList.remove('selected'));
              });

              code$.classList.add('has-selection');

              let start = -1;
              let end = -1;
              code$.querySelectorAll('div').forEach((line$, index) => {
                if (line$.hasAttribute('data-just-selected')) {
                  if (start === -1) start = end = index;
                  else end = index;
                }
              });
              code$.querySelectorAll('div').forEach((line$, index) => {
                if (index >= start && index <= end) {
                  line$.classList.add('selected');
                  line$.removeAttribute('data-just-selected');
                }
              });
            }
            else code$.classList.remove('has-selection');
          }, 5);
        });

        code$.addEventListener('mouseleave', () => {
          let start = -1;
          let end = -1;
          code$.querySelectorAll('div').forEach((line$, index) => {
            if (line$.hasAttribute('data-just-selected')) {
              if (start === -1) start = end = index;
              else end = index;
            }
          });
          code$.querySelectorAll('div').forEach((line$, index) => {
            if (index >= start && index <= end) {
              line$.classList.add('selected');
              line$.removeAttribute('data-just-selected');
            }
          });
        });
  
        code$.addEventListener('keydown', (ev: any) => {
          const event = ev as KeyboardEvent;
          if (event.key === 'c' && (event.metaKey || event.ctrlKey)) {
            if (code$.classList.contains('has-selection')) {
              smartCopy(code$ as HTMLElement, true);
            }
          }
        });
      });
    }

    _exec(); window.addEventListener('navigation', _exec);
  });
}


export const codeSelection$ = /*#__PURE__*/funcTransport(codeSelection);
