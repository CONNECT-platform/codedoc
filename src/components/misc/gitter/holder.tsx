import { State } from '@connectv/core';
import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';
import { GitterStyle } from './style';


export interface GitterHolderOptions {
  state: State,
  room: string,
}


export function GitterHolder(
  this: ThemedComponentThis<CodedocTheme>,
  { state, room }: GitterHolderOptions,
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(GitterStyle);
  return <div class={`${classes.holder} is-collapsed`}>
    <div class="toolbar">
      <a class="icon-font" href={`https://gitter.im/${room}`} target="_blank">open_in_new</a>
      <a class="icon-font" onclick={() => state.value = !state.value}>close</a>
    </div>
  </div>;
}
