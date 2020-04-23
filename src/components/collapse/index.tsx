import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';
import { CollapseStyle } from './style';
import { CollapseControl$ } from './collapse-control';


export interface CollapseOptions {
  label: string;
  default?: 'open' | 'closed';
}


export function Collapse(
  this: ThemedComponentThis<CodedocTheme>,
  options: CollapseOptions,
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(CollapseStyle);
  return (
    <div class={`${classes.collapse} ${options.default === 'open' ? 'open' : ''}`}>
      <CollapseControl$/>
      <div class="label" onclick="this.parentElement.classList.toggle('open')">
        <span class="text">{options.label}</span>
        <span class="icon-font closed">chevron_right</span>
      </div>
      <div class="content">{content}</div>
    </div>
  );
}

export { CollapseStyle } from './style';
