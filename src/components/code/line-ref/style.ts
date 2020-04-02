import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const RefBoxStyle = themedStyle<CodedocTheme>(theme => ({
  refbox: {
    position: 'fixed',
    cursor: 'pointer',
    background: theme.light.background,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0, 0, 0, .12)',
    maxWidth: 256,
    fontSize: 13,
    zIndex: 100,
    padding: 8,
    transition: 'opacity .15s',
    opacity: 0,

    'body.dark &': {
      background: theme.dark.background,
      boxShadow: '0 2px 6px rgba(0, 0, 0, .5)',
    },

    '&.active, &:hover:not(.vanishing)': { opacity: 1 },

    '& .icon-font': {
      verticalAlign: 'middle',
      marginRight: 8,
    },

    '& a': {
      textDecoration: 'none',
      '&:hover': { textDecoration: 'underline '},
    },
  }
}));
