import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const HintBoxStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  hintbox: {
    position: 'fixed',
    background: theme.light.background,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0, 0, 0, .12)',
    maxWidth: 256,
    fontSize: 13,
    zIndex: 100,
    top: '100vh',
    padding: 8,
    transition: 'top .15s, opacity .3s',
    opacity: 0,

    'body.dark &': {
      background: theme.dark.background,
      boxShadow: '0 2px 6px rgba(0, 0, 0, .5)',
    },

    '&.active': { opacity: 1 },

    '& .icon-font': {
      verticalAlign: 'middle',
      marginRight: 8,
      transform: 'rotate(180deg)',
    },
  }
}));
