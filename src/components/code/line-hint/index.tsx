import { Subject, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { funcTransport } from '@connectv/sdh/transport';

import { getRenderer } from '../../../util/renderer';
import { HintBox } from './component';


const commentRegex = new RegExp([
  /\/\/\s?\-\-\>\s*(.*[^\s])\s*$/,       // --> single line comments
  /\/\*\s?\-\-\>\s*(.*[^\s])\s*\*\/$/,   // --> multi line comments
  /\#\s?\-\-\>\s*(.*[^\s])\s*$/,         // --> python comments
  /\<\!\-\-\s?\>\s*(.*[^\s])\s*\-\-\>$/, // --> html comments
].map(r => `(?:${r.source})`).join('|'));


export function initHintBox() {
  window.addEventListener('load', () => {
    const renderer = getRenderer();
    const target = new Subject<HTMLElement | undefined>();
  
    renderer.render(<HintBox target={target}/>).on(document.body);

    document.querySelectorAll('pre>code>div').forEach(line$ => {
      let hint = ''; 
      let hint$: HTMLElement | undefined;
      line$.querySelectorAll('.token.comment').forEach(comment$ => {
        const match = commentRegex.exec(comment$.textContent || '');
        if (match) {
          hint = match.slice(1).find(_ => _) || hint;
          if (hint) hint$ = comment$ as HTMLElement;
        }
      });

      if (hint.length > 0 && hint$) {
        hint$.style.opacity = '.5';
        line$.setAttribute('data-hint', hint);
        fromEvent(line$, 'mouseenter').pipe(mapTo(line$ as HTMLElement)).subscribe(target);
        fromEvent(line$, 'mouseleave').pipe(mapTo(undefined)).subscribe(target);
      }
    });
  });
}


export const codeLineHints$ = funcTransport(initHintBox);
