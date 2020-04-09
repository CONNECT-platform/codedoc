import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../../theme';
import { ToCSearchBtnStyle } from './style';
import { ToCSearchOverlay } from '../overlay';


export interface ToCSearchBtnOptions {
  label?: string;
}


export function ToCSearchBtn(
  this: ThemedComponentThis<CodedocTheme>,
  options: ToCSearchBtnOptions,
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(ToCSearchBtnStyle);

  return <div class={classes.holder} onclick={() => {
    renderer.render(<ToCSearchOverlay placeholder={options.label || 'Search the docs...'}/>).on(document.body);
  }}>
    <span class="label">{options.label || 'Search the docs...'}</span>
    <span class="icon-font">search</span>
  </div>
}
