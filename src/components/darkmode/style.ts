import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const DarkModeSwitchStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  dmSwitch: {
    overflow: 'hidden',
    display: 'inline-flex',
    width: 48, height: 48,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    opacity: .25,

    '&:hover': { opacity: 1, },

    'body.dark-mode-animate &': {
      transition: 'opacity .1s, transform .3s',
    },

    '& div': {
      position: 'absolute', 
      background: theme.light.text,

      'body.dark-mode-animate &': {
        transition: 'transform .3s, background .3s, opacity .3s',
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': { background: theme.dark.text },
      },
      'body.dark &': { background: theme.dark.text },
    },

    '& .arc, & .darc': { width: 16, height: 16, borderRadius: 16, },
    '& .darc': {
      background: theme.light.background,
      transform: 'translateX(24px)',
      opacity: 0,
    },

    '& .ray': { width: 6, height: 2, borderRadius: 2, },
    '& .ray.one': { transform: 'rotate(0deg) translateX(14px)', },
    '& .ray.two': { transform: 'rotate(45deg) translateX(14px)', },
    '& .ray.three': { transform: 'rotate(90deg) translateX(14px)', },
    '& .ray.four': { transform: 'rotate(135deg) translateX(14px)', },
    '& .ray.five': { transform: 'rotate(180deg) translateX(14px)', },
    '& .ray.six': { transform: 'rotate(225deg) translateX(14px)', },
    '& .ray.seven': { transform: 'rotate(270deg) translateX(14px)', },
    '& .ray.eight': { transform: 'rotate(315deg) translateX(14px)', },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        transform: 'rotate(-45deg)',

        '& .arc': { transform: 'scale(1.2)' },
        '& .darc': { transform: 'translateX(6px)', background: theme.dark.background, opacity: 1, },
        '& .ray': { transform: 'scale(0.001)', opacity: 0 },
      }
    },

    'body.dark &': {
      transform: 'rotate(-45deg)',

      '& .arc': { transform: 'scale(1.2)' },
      '& .darc': { transform: 'translateX(6px)', background: theme.dark.background, opacity: 1, },
      '& .ray': { transform: 'scale(0.001)', opacity: 0 },
    },
  }
}));
