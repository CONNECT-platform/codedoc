import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '../../theme';


export const FooterStyle = themedStyle<CodedocTheme>(theme => ({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 64,
    background: theme.light.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    'body.dark-mode-animate &': {
      transition: 'background .3s',
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        background: theme.dark.background
      }
    },

    'body.dark &': {
      background: theme.dark.background,
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
    '& .right': { paddingRight: 32 },
  }
}));
