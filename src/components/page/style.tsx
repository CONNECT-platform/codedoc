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

    '.container': {
      maxWidth: '768px',
      padding: '32px',
      margin: '0 auto',
      marginBottom: '64px'
    },
  }
}));