import { Subject, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { funcTransport, onReady } from '@connectv/sdh/transport';

import { getRenderer } from '../../../transport/renderer';
import { RefBox } from './component';


const commentRegex = new RegExp([
  /\/\/\s?\@see\s(.*[^\s])\s*$/,             // --> single line comments
  /\/\*\s?\@see\s(.*[^\s])\s*\*\/$/,         // --> multi line comments
  /\#\@see\s(.*[^\s])\s*$/,                  // --> python comments
  /\<\!\-\-\s?\@see\s(.*[^\s])\s*\-\-\>$/,   // --> html comments
].map(r => `(?:${r.source})`).join('|'));


const mdlinkRegex = /\[(.*)\]\((.*)\)$/;


export function initCodeLineRef() {
  onReady(() => {
    const renderer = getRenderer();
    const target = new Subject<HTMLElement | undefined>();

    renderer.render(<RefBox target={target}/>).on(document.body);

    const _exec = () => {
      document.querySelectorAll('pre>code>div').forEach(line$ => {
        let ref = '';
        let ref$: HTMLElement | undefined;
  
        line$.querySelectorAll('.token.comment').forEach(comment$ => {
          const match = commentRegex.exec(comment$.textContent || '');
          if (match) {
            ref = match.slice(1).find(_ => _) || ref;
            if (ref) ref$ = comment$ as HTMLElement;
          }
        });
  
        if (ref.length > 0 && ref$) {
          ref$.remove();
          const match = mdlinkRegex.exec(ref);
          if (match) {
            line$.setAttribute('data-ref', match[2] || '');
            line$.setAttribute('data-ref-text', match[1] || '');
          }
          else 
            line$.setAttribute('data-ref', ref);
          fromEvent(line$, 'mouseenter').pipe(mapTo(line$ as HTMLElement)).subscribe(target);
          fromEvent(line$, 'mouseleave').pipe(mapTo(undefined)).subscribe(target);
        }
      });
    }

    _exec(); window.addEventListener('navigation', _exec);
  });
}

export const codeLineRef$ = /*#__PURE__*/funcTransport(initCodeLineRef);
