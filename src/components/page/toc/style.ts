import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';
import { autoId } from '@connectv/html';


export const TocStyle = themedStyle<CodedocTheme>(theme => ({
  toc: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 64,
    padding: 32,
    width: 'calc(50vw - 496px)',
    transform: 'translateY(100vh)',

    '@media screen and (max-width: 1200px)': {
      width: '100vw',
      background: theme.light.background,

      'body.dark-mode-animate &': { 
        transition: 'background .3s',

        '&.animated': {
          transition: 'transform .3s, background .3s',
        }
      },

      'body.dark &': { background: theme.dark.background },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          background: theme.dark.background,
        },
      },
    },

    '&.animated': {
      transition: 'transform .3s',
    },

    '&.active': {
      transform: 'translateY(0)',
    },

    '& a': {
      display: 'block',
      textDecoration: 'none',
      margin: '8px 0',
      paddingBottom: 8,
      borderBottom: `1px dashed ${theme.light.border}`,

      'body.dark-mode-animate &': {
        transition: 'borderColor .3s',
      },

      'body.dark &': {
        borderColor: theme.dark.border,
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          borderColor: theme.dark.border,
        },
      },
    },
  }
}));
