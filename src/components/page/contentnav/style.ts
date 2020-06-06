import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const ContentNavStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  contentnav: {
    position: 'fixed',
    right: 0,
    bottom: 96,
    width: 'calc(50vw - 496px)',
    maxHeight: '45vh',
    overflow: 'auto',
    borderLeft: `1px dashed ${theme.light.border}`,
    paddingLeft: 48,
    marginLeft: 64,
    fontSize: 12,
    scrollBehavior: 'initial',

    '@media screen and (max-width: 1200px)': {
      display: 'none',
    },

    '& a': {
      display: 'block',
      color: theme.light.text,
      textDecoration: 'none',
      opacity: .2,

      'body.dark-mode-animate &': {
        transition: 'color .3s, opacity .3s',
      },

      '&:hover, &.active': {
        color: theme.light.primary,
        opacity: 1,
      },

      '&.h2': { marginLeft: 12 },
      '&.h3': { marginLeft: 24 },
      '&.h4': { marginLeft: 36 },
      '&.h5': { marginLeft: 48 },
      '&.h6': { marginLeft: 60 },
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        borderColor: theme.dark.border,
        '& a': {
          color: theme.dark.text,
          '&:hover, &.active': { color: theme.dark.primary },
        },
      },
    },

    'body.dark &': {
      borderColor: theme.dark.border,
      '& a': {
        color: theme.dark.text,
        '&:hover, &.active': { color: theme.dark.primary },
      },
    },
  }
}));