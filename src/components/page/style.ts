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

      '&.dark' : {
        background: theme.dark.background,
        color: theme.dark.text,
      }
    },

    a: {
      color: theme.primary,
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
        textDecorationThickness: '2px',
      },
    },

    '.container': {
      maxWidth: '768px',
      padding: '32px',
      margin: '0 auto',
      marginBottom: '64px',
    },

    blockquote: {
      margin: 0,
      padding: '16px 40px',
      borderRadius: '3px',
      background: theme.quote.light.background,
      color: theme.quote.light.text,
      position: 'relative',

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
      },
    }
  }
}));