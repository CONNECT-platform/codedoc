import Color from 'color';
import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const CollapseStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  collapse: {
    '&>.label': {
      cursor: 'pointer',
      display: 'flex',
      margin: '8px 0',
      alignItems: 'center',
      userSelect: 'none',

      '& .text': {flexGrow: 1},
      '& .icon-font': {
        marginRight: 32,
        'body.dark-mode-animate &': { transition: 'transform .15s', },
      },

      '&:hover': {
        color: theme.light.primary,
        transition: 'color .15s',

        'body.dark &': {
          color: theme.dark.primary,
        },

        '@media (prefers-color-scheme: dark)': {
          'body:not(.dark-mode-animate) &': {
            color: theme.dark.primary,
          }
        }
      },
    },

    '&>.content': {
      opacity: 0,
      maxHeight: 0,
      visibility: 'hidden',
      transition: 'opacity .3s',
      paddingLeft: 16,
      borderLeft: `2px solid ${Color(theme.light.border).alpha(.5).toString()}`,

      'body.dark-mode-animate &': {
        transition: 'transform .15s, opacity .15s, border-color .3s'
      },

      'body.dark &': { borderColor: Color(theme.dark.border).alpha(.5).toString() },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': { borderColor: Color(theme.dark.border).alpha(.5).toString() },
      },
    },

    '&.open': {
      '&>.content': { maxHeight: 'none', opacity: 1, visibility: 'visible' },
      '&>.label': {
        '& .icon-font': { transform: 'rotate(90deg)' }
      }
    },
  }
}));
