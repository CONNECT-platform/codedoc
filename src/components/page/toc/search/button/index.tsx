import { source, sink } from '@connectv/core';
import { RendererLike } from '@connectv/html';
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

  return <div class={classes.holder} onclick={() => {
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
