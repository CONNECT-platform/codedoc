import color from 'color';
import { RendererLike } from '@connectv/html';
import { ThemedComponentThis, themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const ButtonStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  button: {
    background: theme.light.primary,
    color: theme.light.primaryContrast,
    padding: '4px 16px',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '3px',
    border: `2px solid ${theme.light.primary}`,
    minWidth: '96px',
    height: '40px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    margin: 8,
    marginRight: 0,
    verticalAlign: 'middle',

    'body.dark-mode-animate &': {
      transition: 'background .15s, color .15s, border-color .15s',
    },

    '&.icon': {
      padding: 0,
      minWidth: 0,
      width: '40px',
      fontSize: '24px',
    },

    '&[disabled]': {
      background: color(theme.light.text).alpha(.35).toString(),
      border: color(theme.light.text).alpha(.35).toString(),
      color: theme.light.background,
    },

    'body.dark &': {
      background: theme.dark.primary,
      borderColor: theme.dark.primary,
      color: theme.dark.primaryContrast,

      '&[disabled]': {
        background: color(theme.dark.text).alpha(.35).toString(),
        border: color(theme.dark.text).alpha(.35).toString(),
        color: theme.dark.background,
      },
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        background: theme.dark.primary,
        borderColor: theme.dark.primary,
        color: theme.dark.primaryContrast,

      '&[disabled]': {
        background: color(theme.dark.text).alpha(.35).toString(),
        border: color(theme.dark.text).alpha(.35).toString(),
        color: theme.dark.background,
      },
      }
    },

    '&:hover:not([disabled])': {
      background: 'transparent',
      color: theme.light.primary,
      textDecoration: 'none',

      'body.dark &': {
        background: 'transparent',
        color: theme.dark.primary,
      },
  
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          background: 'transparent',
          color: theme.dark.primary,
        }
      },
    },
  },

  '@global': {
    a: {
      '&$button': {
        height: '28px',
        '&.icon': { height: '36px', width: '36px' }
      }
    }
  }
}));


export interface ButtonOptions {
  url?: string;
  onclick?: string;
  label: string;
  icon?: string;
}


export function Button(
  this: ThemedComponentThis<CodedocTheme>,
  options: ButtonOptions,
  renderer: RendererLike<any, any>,
) {
  const classes = this.theme.classes(ButtonStyle);
  let _class = classes.button;
  if (options.icon === 'true') _class += ' icon icon-font';


  if (options.url)
    return <a class={_class}
              href={options.url}
              {...(
                (
                  options.url.startsWith('/')
                  || options.url.startsWith('#')
                )? {} : {target: '_blank'})}>
              {options.label || ''}
           </a>
  else
    return <button class={_class} onclick={options.onclick || ''}>{options.label || ''}</button>
}
