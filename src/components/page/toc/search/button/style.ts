import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../../theme';


export const ToCSearchBtnStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  holder: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 32px',
    userSelect: 'none',
    opacity: .35,
    cursor: 'pointer',
    transition: 'opacity .15s, background .15s',

    '& .label': {
      fontSize: 14,
      flexGrow: 1,
      display: 'block',
    },

    '&:hover': {
      opacity: 1,
      background: theme.quote.light.background,

      'body.dark &': {
        background: theme.quote.dark.background,
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          background: theme.quote.dark.background,
        }
      },
    },
  }
}));
