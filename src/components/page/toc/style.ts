import Color from 'color';
import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const TocStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  toc: {
    position: 'fixed',
    display: 'flex',
    zIndex: 101,
    flexDirection: 'column',
    left: theme.rtl ? 'unset' : 0,
    right: theme.rtl ? 0 : 'unset',
    top: 0,
    bottom: 0,
    paddingBottom: 64,
    width: 'calc(50vw - 464px)',
    transform: theme.rtl ? 'translateX(50vw)' : 'translateX(-50vw)',
    borderRight: theme.rtl ? 'none' : `1px solid ${theme.toc.light.border}`,
    borderLeft: theme.rtl ? `1px solid ${theme.toc.light.border}` : 'none',

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
      width: '100vw',
      transform: theme.rtl ? 'translateX(110vw)' : 'translateX(-110vw)',
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
      marginLeft: theme.rtl ? 1 : -8,
      marginRight: theme.rtl ? -8 : 1,
      padding: 8,
      border: `1px solid transparent`,
      ...(theme.rtl ? {
        borderLeft: 'none',
      } : {
        borderRight: 'none',
      }),

      'body.dark-mode-animate &': { transition: 'border-color .3s, background .3s' },

      '&:hover': {
        background: theme.light.background,
        textDecoration: 'none',

        'body.dark &': { background: Color(theme.dark.background).lighten(.02).toString() },
        '@media (prefers-color-scheme: dark)': {
          'body:not(.dark-mode-animate) &': {
            background: Color(theme.dark.background).lighten(.02).toString(),
          },
        },
      },

      '&.current': {
        ...(theme.rtl ? {
          marginLeft: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        } : {
          marginRight: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }),
        borderColor: theme.toc.light.border,
        background: theme.light.background,

        'body.dark &': { 
          borderColor: theme.toc.dark.border,
          background: Color(theme.dark.background).lighten(.02).toString(),
        },

        '@media (prefers-color-scheme: dark)': {
          'body:not(.dark-mode-animate) &': {
            borderColor: theme.toc.dark.border,
            background: theme.dark.background,
          },
        },

        '@media screen and (max-width: 1200px)': {
          ...(theme.rtl ? {
            marginLeft: -8,
            borderLeft: '1px solid',
          } : {
            marginRight: -8,
            borderRight: '1px solid',
          }),
          borderRadius: 3,
        },
      },
    },
  },

  content: {
    flexGrow: 1,
    overflow: 'auto',
    padding: 32,
    ...(theme.rtl ? {
      paddingLeft: 0,
      marginLeft: -1,
    } : {
      paddingRight: 0,
      marginRight: -1,
    }),

    '@media screen and (max-width: 1200px)': {
      ...(theme.rtl ? {
        paddingLeft: 32,
        marginLeft: 0,
      } : {
        paddingRight: 32,
        marginRight: 0,
      }),
    },
  },
  search: {

  },
}));
