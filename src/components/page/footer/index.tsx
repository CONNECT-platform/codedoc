import { ExtensibleRenderer } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';
import { FooterStyle } from './style';
import { DarkModeSwitch$ } from '../../darkmode';
import { ToCToggle$ } from '../toc/toggle';


export function Footer(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: ExtensibleRenderer, 
  content: any
) {
  const classes = this.theme.classes(FooterStyle);
  const { rtl } = this.theme.theme;
  return <div class={classes.footer}>
    <div class={rtl ? "right" : "left"}><ToCToggle$/></div>
    <div class="main">
      <div class="inside">{content}</div>
    </div>
    <div class={rtl ? "left" : "right"}><DarkModeSwitch$/></div>
  </div>
}


export { FooterStyle } from './style';
