import { ExtensibleRenderer } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';
import { FooterStyle } from './style';
import { DarkModeSwitch$ } from '../darkmode';


export function Footer(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: ExtensibleRenderer, 
  content: any
) {
  const classes = this.theme.classes(FooterStyle);

  return <div class={classes.footer}>
    <div class="main">{content}</div>
    <div class="right"><DarkModeSwitch$/></div>
  </div>
}
