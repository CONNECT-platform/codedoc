import { Renderer } from '@connectv/html';
import { funcTransport } from '@connectv/sdh/transport';
import { theme } from '@connectv/jss-theme';

import { CodedocTheme } from '../theme';


let renderer: Renderer;

export function getRenderer() {
  if (!renderer) {
    if (!(window as any).theme) {
      throw new Error('Theme not specified!');
    }

    renderer = new Renderer().plug(theme<CodedocTheme>((window as any).theme));
  }

  return renderer;
}

export const getRenderer$ = /*#__PURE__*/funcTransport(getRenderer);
