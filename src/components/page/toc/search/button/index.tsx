import { source } from '@connectv/core';
import { RendererLike, ref } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../../theme';
import { ToCSearchBtnStyle } from './style';
import { ToCSearchOverlay } from '../overlay';


export interface ToCSearchBtnOptions {
  label?: string;
  query: any;
  results: any;
}


export function ToCSearchBtn(
  this: ThemedComponentThis<CodedocTheme>,
  options: ToCSearchBtnOptions,
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(ToCSearchBtnStyle);
  const results = this.expose.in('results');
  const query = this.expose.out('query', source());
  const holder = ref<HTMLElement>();

  const keyhandler = (event: KeyboardEvent) => {
    if (event.key === 'f' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      holder.$.click();
    }
  };

  this.track({
    bind() {
      document.addEventListener('keydown', keyhandler);
    },

    clear() {
      document.removeEventListener('keydown', keyhandler);
    }
  });

  return <div _ref={holder} class={classes.holder} id="-codedoc-search-btn" onclick={() => {
    renderer.render(
      <ToCSearchOverlay 
        placeholder={options.label || 'Search the docs...'}
        query={(q: string) => query.send(q)}
        results={results}/>
    ).on(document.body);
  }}>
    <span class="label">{options.label || 'Search the docs...'}</span>
    <span class="icon-font">search</span>
  </div>
}


export { ToCSearchBtnStyle } from './style';