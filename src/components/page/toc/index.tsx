import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';
import { TocStyle } from './style';


export function Toc(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(TocStyle);
  return <div id="-codedoc-toc" class={classes.toc}>{content}</div>
}
