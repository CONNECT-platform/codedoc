import { RendererLike } from '@connectv/html';
import { themedStyle, ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const ToCHeadingStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
  }
}));


export function ToCHeading(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: RendererLike<any, any>, 
  content: any
) {
  const classes = this.theme.classes(ToCHeadingStyle);
  return <div class={classes.heading}>{content}</div>
}
