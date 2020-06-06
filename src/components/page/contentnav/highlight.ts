import { funcTransport, onReady } from '@connectv/sdh/transport';


export function contentNavHighlight() {
  onReady(() => {
    let links: {a$: HTMLElement, ref$: HTMLElement}[] = [];

    const _exec = () => {
      links = [];
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
    };

    _exec(); window.addEventListener('navigation', _exec);

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

      const target = links.find(l => l.a$.classList.contains('active'))?.a$;
      if (target) {
        const parent = target.parentElement as HTMLElement;
        if (parent.scrollHeight != parent.offsetHeight) {
          parent.scrollTop = target.offsetTop - parent.offsetHeight / 3;
        }
      }
    }

    if (links.length > 0) {
      update();
      document.addEventListener('scroll', () => setTimeout(update, 1));
      window.addEventListener('navigation', update);
    }
  });
}


export const contentNavHighlight$ = /*#__PURE__*/funcTransport(contentNavHighlight);
