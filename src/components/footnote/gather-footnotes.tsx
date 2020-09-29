import { funcTransport, onReady } from '@connectv/sdh/transport';
import { getRenderer } from '../../transport/renderer';


export function gatherFootnotes() {
  const renderer = getRenderer();

  onReady(() => {
    const _exec = () => {
      let counter = 1;
      let collected: { index: number, $: Element }[] = [];
      const countermap: {[id: string]: number} = {};

      document.querySelectorAll('[data-footnote], [data-footnotes]').forEach(child => {
        if (child.hasAttribute('data-footnote')) {
          const id = `--codedoc-footnote-${child.getAttribute('data-footnote-id') || counter}`;
          const index = (id in countermap) ? countermap[id] : (countermap[id] = counter++);
          if (child.childNodes.length > 0) {
            
            child.setAttribute('id', id);
            child.setAttribute('data-footnote-index', `${index}`);

            collected.push({ index, $: child });
          }

          if (!child.hasAttribute('data-footnote-block')) {
            renderer.render(<sup>
              <a href={`#${id}`} style="text-decoration: none"><b>{index}</b></a>
            </sup>).before(child);
          }
          child.remove();
        } else {
          collected.sort((a, b) => a.index - b.index).forEach(_ => {
            renderer.render(<div>
              <span><a><b>{_.index}</b></a></span> {_.$}
            </div>).on(child);
          });
          collected = [];
        }
      });
    };

    _exec(); window.addEventListener('navigation', _exec);
  });
}

export const gatherFootnotes$ = /*#__PURE__*/funcTransport(gatherFootnotes);