import { RendererLike } from '@connectv/html';
import { themedStyle, ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const DarkLightStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  darklight: {
    position: 'relative',
    overflow: 'hidden',

    'body.dark-mode-animate &>.light, &>.dark': {
      transition: 'opacity .3s, z-index .3s',
    },

    '&>.light': {
      'body.dark &': {
        opacity: 0,
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          opacity: 0,
        }
      },
    },

    '&>.dark': {
      position: 'absolute',
      opacity: 0,
      top: 0, left: 0, right: 0,
      zIndex: -1,

      'body.dark &': {
        opacity: 1,
        zIndex: 1,
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          opacity: 1,
          zIndex: 1,
        }
      },
    },
  },
}));


export function InLight(_: any, renderer: RendererLike<any, any>, content: any) {
  return <div class="light">{content}</div>
}


export function InDark(_: any, renderer: RendererLike<any, any>, content: any) {
  return <div class="dark">{content}</div>
}


export function DarkLight(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: RendererLike<any, any>, 
  content: any
) {
  const classes = this.theme.classes(DarkLightStyle);

  return <div class={classes.darklight}>{content}</div>
}
