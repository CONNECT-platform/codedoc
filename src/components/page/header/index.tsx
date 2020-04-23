import { ThemedComponentThis } from '@connectv/jss-theme';
import { RendererLike } from '@connectv/html';

import { CodedocTheme } from '../../../theme';
import { HeaderStyle } from './style';


export function Header(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(HeaderStyle);
  return <div class={classes.header}>{content}</div>
}


export { HeaderStyle } from './style';