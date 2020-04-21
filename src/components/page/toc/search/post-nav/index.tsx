import Color from 'color';
import { funcTransport } from '@connectv/sdh/transport';

import { getRenderer } from '../../../../../transport/renderer';
import { SearchSwitcher } from './switcher';


export function postNavSearch() {
  let query: string | undefined = undefined;
  let switcher$: HTMLElement;

  window.addEventListener('on-navigation-search', (event: any) => {
    query = event.detail.query;
  });

  window.addEventListener('navigation', () => {
    if (query) setTimeout(() => {
      search(query || '');
      query = undefined;
    }, 300);
  });

  window.addEventListener('same-page-navigation', () => {
    if (query) search(query);
    query = undefined;
  });

  const renderer = getRenderer();

  function search(query: string) {
    const q = query.toLowerCase();
    const highlights$: HTMLElement[] = [];
    const container$ = document.getElementById('-codedoc-container');
    if (container$) {
      const _scan = (el$: Node, query: RegExp) => {
        if (el$ instanceof Text) {
          const text = el$.textContent;
          const _match = query.exec(text?.toLowerCase() || '');
          if (text && _match) {
            const matched = _match[0];
            const before = text.substr(0, _match.index);
            const match = text.substr(_match.index, matched.length);
            const after = text.substr(_match.index + matched.length);

            let color: Color<string> | string = Color(window.getComputedStyle(el$.parentElement as any).color);
            if (color.saturationv() < .2) {
              color = color.isLight() ? 'teal' : 'yellow';
            }
            else color = color.rotate(90).alpha(.35);

            el$.textContent = after;
            const before$ = document.createTextNode(before);
            const match$ = <span data-no-search style={`
                              background: ${color.toString()}; 
                              display: inline-block; 
                              vertical-align: middle;
                              transform-origin: center;
                              transition: transform .15s
                              `}>{match}</span>;
            highlights$.push(match$);
            renderer.render(<fragment>{before$}{match$}</fragment>).before(el$);
            _scan(before$, query);
            _scan(el$, query);
          }
        }
        else {
          if (el$ instanceof HTMLElement && (el$.hasAttribute('data-no-search') || el$.classList.contains('icon-font')))
            return;

          el$.childNodes.forEach(n => _scan(n, query));
        }
      };

      _scan(container$, new RegExp(q));

      if (highlights$.length == 0) {
        const split = q.split(' ');
        if (split.length > 0) {
          _scan(container$, new RegExp(split.join('\\s+.*\\s+')));
          if (highlights$.length == 0) {
            split.forEach(part => _scan(container$, new RegExp(part)));
          }
        }
      }
    }

    if (switcher$) switcher$.remove();

    switcher$ = <SearchSwitcher elements={highlights$} query={query}/>;
    renderer.render(switcher$).on(document.body);
  }

  (window as any)._find = search;
}


export const postNavSearch$ = /*#__PURE__*/funcTransport(postNavSearch);
