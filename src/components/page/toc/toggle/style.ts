import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../theme';


export const ToCToggleStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  tocToggle: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 48, height: 48,
    cursor: 'pointer',
    opacity: .25,
    overflow: 'hidden',
    position: 'relative',
    transition: 'opacity .15s',
    '&:hover': { opacity: 1 },
  },
  bar: {
    width: 24,
    height: 2,
    borderRadius: 2,
    position: 'absolute',
    background: theme.light.text,
    transformOrigin: 'center',
    transition: 'transform .15s, opacity .15s',

    '&:first-child': { transform: 'translateY(-6px)' },
    '&:last-child': { transform: 'translateY(6px)' },

    'body.dark &': {
      background: theme.dark.text,
    },

    '.active>&': {
      opacity: 0,
      '&:first-child': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
      '&:last-child': { transform: 'translateY(0) rotate(-45deg)', opacity: 1 },
    },
  },
}));
