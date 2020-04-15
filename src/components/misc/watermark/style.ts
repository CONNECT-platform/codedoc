import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const WatermarkStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  watermark: {
    fontSize: 8,
    cursor: 'pointer',
    opacity: .2,
    display: 'inline-block',
    color: theme.light.text,
    textDecoration: 'none !important',
    transition: 'opacity .15s',

    'body.dark-mode-animate &': {
      transition: 'opacity .15s, color .3s',
    },

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        color: theme.dark.text,
      },
    },

    'body.dark &': {
      color: theme.dark.text,
    },

    '& svg': {
      display: 'block',
      marginTop: '.25rem',
      width: '2.8rem',
      '& g': {
        fill: theme.light.text,

        'body.dark-mode-animate &': {
          transition: 'fill .3s',
        },

        'body.dark &': {
          fill: theme.dark.text,
        },

        '@media (prefers-color-scheme: dark)': {
          'body:not(.dark-mode-animate) &': {
            fill: theme.dark.text,
          },
        },
      }
    }
  }
}));
