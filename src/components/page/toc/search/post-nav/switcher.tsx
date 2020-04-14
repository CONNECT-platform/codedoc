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

    let parent = focused.parentElement;
    while (parent) {
      if (parent.hasAttribute('data-tab-title')) {
        const ref = parent.getAttribute('data-tab-title');
        const btn$ = parent
                      .parentElement
                      ?.querySelector(`.selector>button[data-tab-title="${ref}"]`);
        if (btn$) (btn$ as HTMLButtonElement).click();
      }
      parent = parent.parentElement;
    }

    setTimeout(() => focused?.scrollIntoView({ block: 'center' }), 300);
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

  this.track({
    bind() {
      focus(options.elements[0]);
    },

    clear() {
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
    <span class={classes.content}>{index}/{options.elements.length}</span>
    <span class="icon-font" onclick={prev}>chevron_left</span>
    <span class="icon-font" onclick={next}>chevron_right</span>
  </div>;
}
