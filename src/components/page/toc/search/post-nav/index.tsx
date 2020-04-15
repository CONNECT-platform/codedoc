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
    if (query) search(query);
    query = undefined;
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
      const _scan = (el$: Node) => {
        if (el$ instanceof Text) {
          const text = el$.textContent;
          const index = text?.toLowerCase().indexOf(q);
          if (text && index !== undefined && index > -1) {
            const before = text.substr(0, index);
            const match = text.substr(index, query.length);
            const after = text.substr(index + query.length);

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
            _scan(before$);
            _scan(el$);
          }
        }
        else {
          if (el$ instanceof HTMLElement && (el$.hasAttribute('data-no-search') || el$.classList.contains('icon-font')))
            return;

          el$.childNodes.forEach(_scan);
        }
      };

      _scan(container$);
    }

    if (highlights$.length > 0) {
      if (switcher$) switcher$.remove();

      switcher$ = <SearchSwitcher elements={highlights$} query={query}/>;
      renderer.render(switcher$).on(document.body);
    }
  }

  (window as any)._find = search;
}


export const postNavSearch$ = funcTransport(postNavSearch);
