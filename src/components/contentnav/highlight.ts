import { funcTransport } from '@connectv/sdh/transport';


export function contentNavHighlight() {
  window.addEventListener('load', () => {
    const links: {a$: HTMLElement, ref$: HTMLElement}[] = [];
    document.querySelectorAll('a[data-content-highlight]').forEach(_a$ => {
      let a$ = _a$ as HTMLElement;
      const id = a$.getAttribute('data-content-highlight');
      if (id) {
        const ref$ = document.getElementById(id);
        if (ref$) {
          links.push({ a$, ref$ });
        }
      }
    });

    function update() {
      let noactive = true;
      let latest: HTMLElement | undefined;

      links.forEach(({a$, ref$}) => {
        const top = ref$.getBoundingClientRect().top;
        if (top < window.innerHeight - 96 && top > 0) {
          noactive = false;
          a$.classList.add('active');
        }
        else {
          if (top < 0) latest = a$;
          a$.classList.remove('active');
        }
      });

      if (noactive) latest?.classList.add('active');
    }

    if (links.length > 0) {
      update();
      document.addEventListener('scroll', () => setTimeout(update, 1));
    }
  });
}


export const contentNavHighlight$ = funcTransport(contentNavHighlight);
