import { RendererLike } from '@connectv/html';
import { ThemedComponentThis, themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const ButtonStyle = themedStyle<CodedocTheme>(theme => ({
  button: {
    background: theme.primary,
    color: theme.primaryContrast,
    padding: '4px 8px',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '3px',
    border: `2px solid ${theme.primary}`,
    minWidth: '96px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background .15s, color .15s',
    textDecoration: 'none',

    '&:hover': {
      background: 'transparent',
      color: theme.primary
    }
  },
}));


export interface ButtonOptions {
  url?: string;
  onclick?: string;
  label: string;
}


export function Button(
  this: ThemedComponentThis<CodedocTheme>,
  options: ButtonOptions,
  renderer: RendererLike<any, any>,
) {
  const classes = this.theme.classes(ButtonStyle);

  if (options.url)
    return <a class={classes.button} href={options.url} target="_blank">{options.label || ''}</a>
  else
    return <button class={classes.button} onclick={options.onclick || ''}>{options.label || ''}</button>
}
