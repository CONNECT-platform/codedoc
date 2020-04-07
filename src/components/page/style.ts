import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '../../theme';


export const PageStyle = themedStyle<CodedocTheme>(theme => ({
  '@global': {
    '*': {
      scrollBehavior: 'smooth'
    },

    body: {
      background: theme.light.background,
      color: theme.light.text,
      width: '100vw',
      overflowX: 'hidden',
      margin: 0,
      padding: 0,

      '&.dark-mode-animate': {
        transition: 'color .3s, background .3s',
      },
    },

    a: {
      color: theme.light.primary,

      '&:hover': {
        textDecoration: 'underline',
        textDecorationThickness: '2px',
      },

      'body.dark-mode-animate &': {
        transition: 'color .3s',
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          color: theme.dark.primary,
        }
      },

      'body.dark &': {
        color: theme.dark.primary,
      },
    },

    '.container': {
      maxWidth: 768,
      padding: 32,
      paddingTop: 96,
      margin: '0 auto',
      marginBottom: 64,
      transition: 'opacity .15s',
    },

    blockquote: {
      margin: 0,
      padding: '16px 40px',
      borderRadius: 3,
      background: theme.quote.light.background,
      color: theme.quote.light.text,
      position: 'relative',

      'body.dark-mode-animate &': {
        transition: 'color .3s, background .3s',
      },

      '&:after': {
        content: "''",
        position: 'absolute',
        left: '16px',
        top: '16px',
        bottom: '16px',
        width: '8px',
        display: 'block',
        background: `radial-gradient(circle at center, ${theme.quote.light.border} 50%, transparent 52%),transparent`, 
        backgroundSize: '4px 4px',

        'body.dark-mode-animate &': {
          transition: 'color .3s, background .3s',
        }
      },
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate)': {
        background: theme.dark.background,
        color: theme.dark.text,

        '& blockquote': {
          background: theme.quote.dark.background,
          color: theme.quote.dark.text,
  
          '&:after': {
            background: `radial-gradient(circle at center, ${theme.quote.dark.border} 50%, transparent 52%),transparent`,
            backgroundSize: '4px 4px',
          },
        },
      }
    },

    'body.dark': {
      background: theme.dark.background,
      color: theme.dark.text,

      '& blockquote': {
        background: theme.quote.dark.background,
        color: theme.quote.dark.text,

        '&:after': {
          background: `radial-gradient(circle at center, ${theme.quote.dark.border} 50%, transparent 52%),transparent`,
          backgroundSize: '4px 4px',
        },
      },
    },

    img: {
      maxWidth: '100%',
    },

    iframe: {
      width: '100%',
      borderRadius: 3,
      border: 'none',
      background: 'white',
      
    },
  }
}));