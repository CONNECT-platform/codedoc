import { funcTransport } from '@connectv/sdh/transport';


export function codeSelection() {
  window.addEventListener('load', () => {
    document.querySelectorAll('pre code').forEach(code$ => {
      code$.childNodes.forEach(child => {
        const line$ = child as HTMLElement;
  
        line$.addEventListener('mouseenter', event => {
          if (event.which === 1) {
            line$.classList.add('selected');
          }
        });
  
        line$.addEventListener('mousedown', event => {
          if (!event.shiftKey) code$.childNodes.forEach(child => {
            if (child !== line$) (child as HTMLElement).classList.remove('selected');
          });
  
          line$.classList.toggle('selected');
        });
  
        line$.addEventListener('click', event => {
          if (!event.shiftKey) line$.classList.remove('selected');
        });
      });
    });
  });
}


export const codeSelection$ = funcTransport(codeSelection);
