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

  return <div class={classes.footer}>
    <div class="left"><ToCToggle$/></div>
    <div class="main">
      <div class="inside">{content}</div>
    </div>
    <div class="right"><DarkModeSwitch$/></div>
  </div>
}


export { FooterStyle } from './style';
