import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const RefBoxStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  refbox: {
    position: 'fixed',
    cursor: 'pointer',
    background: theme.light.background,
    borderRadius: 8,
    overflow: 'hidden',
    wordBreak: 'break-word',
    top: '100vh',
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

    '&.active, &:hover': { opacity: 1 },

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
