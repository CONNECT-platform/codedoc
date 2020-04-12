import { funcTransport } from '@connectv/sdh/transport';


export function postNavSearch() {
  let query: string | undefined = undefined;

  window.addEventListener('on-navigation-search', (event: any) => {
    query = event.detail.query;
  });

  window.addEventListener('navigation', () => {
    if (query && (window as any).find) {
      (window as any).find(query, false, false, true);
      query = undefined;
    }
  });
}


export const postNavSearch$ = funcTransport(postNavSearch);
