import { RendererLike } from '@connectv/html';
import {ThemedComponentThis} from "@connectv/jss-theme";

import {CodedocTheme} from "../../theme";

interface ButtonsOptions {}

export function Buttons(
  this: ThemedComponentThis<CodedocTheme>,
  options: ButtonsOptions,
  renderer: RendererLike<any, any>,
  content: any
) {
  const { rtl } = this.theme.theme;
  return <div style={`text-align: ${rtl ? 'left' : 'right'}`}>{content}</div>
}
