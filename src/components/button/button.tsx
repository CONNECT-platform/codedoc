import { RendererLike } from '@connectv/html';
import { ThemedComponentThis, themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const ButtonStyle = themedStyle<CodedocTheme>(theme => ({
  button: {
    background: theme.primary,
    color: theme.primaryContrast,
    padding: '4px 16px',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '3px',
    border: `2px solid ${theme.primary}`,
    minWidth: '96px',
    height: '40px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background .15s, color .15s',
    textDecoration: 'none',
    fontSize: '16px',
    marginLeft: '8px',
    verticalAlign: 'middle',

    '&.icon': {
      padding: 0,
      minWidth: 0,
      width: '40px',
      fontSize: '24px',
    },

    '&:hover': {
      background: 'transparent',
      color: theme.primary,
      textDecoration: 'none',
    }
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
    return <a class={_class} href={options.url} target="_blank">{options.label || ''}</a>
  else
    return <button class={_class} onclick={options.onclick || ''}>{options.label || ''}</button>
}
