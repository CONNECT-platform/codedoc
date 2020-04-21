import { state } from '@connectv/core';
import { RendererLike, ref } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../../theme';
import { SearchSwitcherStyles } from './styles';


export interface SearchSwitcherOptions {
  elements: HTMLElement[];
  query: string;
}


export function SearchSwitcher(
  this: ThemedComponentThis<CodedocTheme>,
  options: SearchSwitcherOptions,
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(SearchSwitcherStyles);

  const holder = ref<HTMLElement>();
  const index = state(1);
  let focused: HTMLElement | undefined = undefined;

  const focus = (element: HTMLElement) => {
    if (focused) focused.style.transform = '';
    element.style.transform = 'scale(1.15)';
    focused = element;
    let delay = 1;

    let parent = focused.parentElement;
    while (parent) {
      if (parent.hasAttribute('data-tab-title')) {
        if (!parent.classList.contains('selected')) {
          const ref = parent.getAttribute('data-tab-title');
          const btn$ = parent
                        .parentElement
                        ?.querySelector(`.selector>button[data-tab-title="${ref}"]`);
          if (btn$) {
            (btn$ as HTMLButtonElement).click();
            delay = 300;
          }
        }
      }

      parent = parent.parentElement;
    }

    setTimeout(() => focused?.scrollIntoView({ block: 'center' }), delay);
  }

  const next = () => {
    if (index.value >= options.elements.length) index.value = 1;
    else index.value++;

    focus(options.elements[index.value - 1]);
  }

  const prev = () => {
    if (index.value <= 1) index.value = options.elements.length;
    else index.value --;

    focus(options.elements[index.value - 1]);
  }

  const keyhandler = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') prev();
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next();
    if (event.key === 'Escape') {
      holder.$.remove();
      event.preventDefault();
    }
  };

  this.track({
    bind() {
      document.addEventListener('keydown', keyhandler);
      focus(options.elements[0]);
    },

    clear() {
      document.removeEventListener('keydown', keyhandler);
      options.elements.forEach(element => {
        renderer.render(<fragment>{element.textContent}</fragment>).before(element);
        element.remove();
      });
    }
  })

  return <div class={classes.holder} _ref={holder}>
    <span class="icon-font" onclick={() => holder.$.remove()}>close</span>
    <span class="icon-font" onclick={() => {
      localStorage.setItem('-codedoc-search-query', options.query);
      document.getElementById('-codedoc-search-btn')?.click()
    }}>list</span>
    <span class={classes.content}>
      {options.elements.length > 0 ? 
        <fragment>{index}/{options.elements.length}</fragment> :
        'No Exact Match'
      }
    </span>
    <span class="icon-font" onclick={prev}>chevron_left</span>
    <span class="icon-font" onclick={next}>chevron_right</span>
  </div>;
}
