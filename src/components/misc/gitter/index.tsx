import { transport } from '@connectv/sdh/transport';
import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';
import { GitterStyle } from './style';
import { initGitter, gitterState } from './init';


export interface GitterOptions {
  room: string;
  label?: string;
  icon?: boolean;
}


export function GitterToggle(
  this: ThemedComponentThis<CodedocTheme>,
  options: GitterOptions, 
  renderer: RendererLike<any, any>,
) {
  initGitter(options.room);

  const classes = this.theme.classes(GitterStyle);

  return <a class={`${classes.toggle} ${options.icon?'icon-font':''}`}
            onclick={() => {
              const state = gitterState();
              if (state) state.value = !state.value;
            }}>
            {options.label || 'Community'}
          </a>;
}


export const GitterToggle$ = /*#__PURE__*/transport(GitterToggle);
export { GitterStyle } from './style';