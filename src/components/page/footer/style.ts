import Color from 'color';
import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '../../../theme';


export const FooterStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 102,
    height: 64,
    background: Color(theme.light.background).alpha(.85).toString(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 -2px 6px rgba(0, 0, 0, .03)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',

    'body.dark-mode-animate &': {
      transition: 'background .3s',
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        background: Color(theme.dark.background).alpha(.85).toString()
      }
    },

    'body.dark &': {
      background: Color(theme.dark.background).alpha(.85).toString()
    },

    '& .main': { 
      flexGrow: 1, 
      textAlign: 'center',
      overflow: 'hidden',
      '&>.inside': {
        display: 'inline-flex',
        alignItems: 'center',
        maxWidth: '100%',
        overflow: 'auto',

        '& hr': {
          margin: 16,
          width: 2,
          height: 16,
          border: 'none',
          background: theme.light.border,

          'body.dark-mode-animate &': {
            transition: 'background .3s',
          },

          'body.dark &': {
            background: theme.dark.border,
          },

          '@media (prefers-color-scheme: dark)': {
            'body:not(.dark-mode-animate) &': {
              background: theme.dark.border,
            }
          },
        },

        '& a': {
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline '},
        },
      },
    },
    '& .left': { paddingLeft: 32 },
    '& .right': { paddingRight: 32 },

    '@media screen and (max-width: 800px)': {
      '& .left': { paddingLeft: 16 },
      '& .right': { paddingRight: 16 },
    },
  }
}));
