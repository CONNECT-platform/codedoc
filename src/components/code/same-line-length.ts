import { funcTransport } from '@connectv/sdh/transport';


export function sameLineLengthInCodes() {
  window.addEventListener('load', () => {
    document.querySelectorAll('pre>code').forEach(code$ => {
      let max = 0;
      code$.querySelectorAll('div').forEach(line$ => {
        if (max < line$.offsetWidth) max = line$.offsetWidth;
      });

      code$.querySelectorAll('div').forEach(line$ => {
        line$.style.width = `${max}px`;
      });
    });
  });
}


export const sameLineLengthInCodes$ = funcTransport(sameLineLengthInCodes);
