import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { CodedocTheme } from '../../theme';
import { FootnoteStyle } from './style';



export function Footnote(
  this: ThemedComponentThis<CodedocTheme>,
  options: {id?: string},
  renderer: RendererLike<any, any>,
  children: any,
) {
  if (options.id) {
    return <marker data-footnote data-footnote-id={options.id}>{children}</marker>
  } else {
    return <marker data-footnote>{children}</marker>
  }
}


export function FootnoteBlock(
  this: ThemedComponentThis<CodedocTheme>,
  options: {id: string},
  renderer: RendererLike<any, any>,
  children: any,
) {
  return <marker data-footnote data-footnote-block data-footnote-id={options.id}>{children}</marker>
}


export function Footnotes(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(FootnoteStyle);
  return <div data-footnotes class={classes.footnotes}></div>
}
