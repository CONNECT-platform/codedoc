import { funcTransport, onReady } from '@connectv/sdh/transport';


export function sameLineLengthInCodes() {
  onReady(() => {
    const _exec = () => {
      document.querySelectorAll('pre>code').forEach(code$ => {
        let max = 0;
        code$.querySelectorAll('div').forEach(line$ => {
          if (max < line$.offsetWidth) max = line$.offsetWidth;
        });
  
        code$.querySelectorAll('div').forEach(line$ => {
          line$.style.width = `${max}px`;
        });
      });
    }

    _exec(); window.addEventListener('navigation', _exec);
  });
}


export const sameLineLengthInCodes$ = /*#__PURE__*/funcTransport(sameLineLengthInCodes);
