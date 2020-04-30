import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const FormulaStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  formula: {
    background: theme.formula.light.background,
    color: theme.formula.light.text,
    borderRadius: 3,
    padding: 16,

    'body.dark &': {
      background: theme.formula.dark.background,
      color: theme.formula.dark.text,
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        background: theme.formula.dark.background,
        color: theme.formula.dark.text,
      }
    },

    'body.dark-mode-animate &': {
      transition: 'background .3s, color .3s',
    },

    '&.big': {
      fontSize: 32,
    },

    '&.center': {
      '& > div': {
        textAlign: 'center'
      }
    }
  },

  line: {
    overflow: 'auto',
    position: 'relative',
    padding: '16px 32px',
    borderRadius: 3,
    cursor: 'pointer',
    '&:hover': {
      background: theme.formula.light.highlight,

      'body.dark &': { background: theme.formula.dark.highlight },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          background: theme.formula.dark.highlight,
        }
      },

      'body.dark-mode-animate &': {
        transition: 'background .3s',
      },
    },

    '& .counter': {
      position: 'absolute',
      left: 8,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontSize: 10,
      opacity: .5,
      width: 32,
      textAlign: 'left',
    }
  }
}));