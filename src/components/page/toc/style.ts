import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const TocStyle = themedStyle<CodedocTheme>(theme => ({
  toc: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    padding: 32,
    width: 'calc(50vw - 496px)',
    transform: 'translateX(-50vw)',
    borderRight: `1px solid ${theme.toc.light.border}`,

    background: theme.toc.light.background,

    'body.dark-mode-animate &': { 
      transition: 'background .3s, border-color .3s',

      '&.animated': {
        transition: 'transform .3s, background .3s, border-color .3s',
      }
    },

    'body.dark &': { 
      borderColor: theme.toc.dark.border,
      background: theme.toc.dark.background 
    },
    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        borderColor: theme.toc.dark.border,
        background: theme.toc.dark.background,
      },
    },

    '@media screen and (max-width: 1200px)': {
      width: 'calc(100vw - 64px)',
      transform: 'translateX(-100vw)',
    },

    '&.animated': {
      transition: 'transform .3s',
    },

    '&.active': {
      transform: 'translateX(0)',
    },

    '& p': { margin: 0 },

    '& a': {
      display: 'block',
      textDecoration: 'none',
      borderRadius: 3,
      marginLeft: -8,
      marginRight: -32,
      padding: 8,
      border: `1px solid transparent`,
      borderRight: 'none',

      'body.dark-mode-animate &': { transition: 'border-color .3s, background .3s' },

      '&:hover': {
        background: theme.light.background,
        textDecoration: 'none',

        'body.dark &': { background: theme.dark.background },
        '@media (prefers-color-scheme: dark)': {
          'body:not(.dark-mode-animate) &': {
            background: theme.dark.background,
          },
        },
      },

      '&.current': {
        marginRight: -33,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: theme.toc.light.border,
        background: theme.light.background,

        'body.dark &': { 
          borderColor: theme.toc.dark.border,
          background: theme.dark.background,
        },

        '@media (prefers-color-scheme: dark)': {
          'body:not(.dark-mode-animate) &': {
            borderColor: theme.toc.dark.border,
            background: theme.dark.background,
          },
        },

        '@media screen and (max-width: 1200px)': {
          marginRight: -8,
          borderRadius: 3,
          borderRight: '1px solid',
        },
      },
    },
  }
}));
