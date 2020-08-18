import { funcTransport, onReady } from '@connectv/sdh/transport';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, take, concatMap, map, buffer, filter } from 'rxjs/operators';

import { getRenderer } from '../../transport/renderer';
import { copyToClipboard } from '../../transport/clipboard';
import { Toast } from '../util/toast';
import { headingLink } from './heading-link';


export function copyHeadings() {
  const renderer = getRenderer();

  onReady(() => {
    let sub: Subscription;

    const _exec = () => {
      if (sub) sub.unsubscribe();
      sub = new Subscription();

      document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(heading$ => {
        const link = headingLink(heading$);
  
        if (link) {
          const click$ = fromEvent(heading$, 'mousedown').pipe(
            filter(event => (event as MouseEvent).button === 0),
            concatMap(start => 
              fromEvent(heading$, 'mouseup').pipe(
                take(1),
                map(end => [start, end])
              )
            )
          );

          sub.add(
            click$.pipe(
              buffer(click$.pipe(debounceTime(200))),
              filter(buffer => buffer.length === 1),
              map(buffer => buffer[0]),
            )
            .subscribe(([start, end]) => {
              const [ms, me] = [start as MouseEvent, end as MouseEvent];
              const dx = ms.clientX - me.clientX;
              const dy = ms.clientY - me.clientY;
              if (Math.sqrt(dx * dx + dy * dy) < 10) {
                copyToClipboard(link, () => renderer.render(<Toast>
                  Link Copied to Clipboard!
                </Toast>).on(document.body));
              };
            })
          );
        }
      });
    };

    _exec(); window.addEventListener('navigation', _exec);
  });
}


export const copyHeadings$ = /*#__PURE__*/funcTransport(copyHeadings);
