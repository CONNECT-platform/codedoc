import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const GitterStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  toggle: {
    cursor: 'pointer',
  },
  holder: {
    position: 'fixed',
    right: 32,
    bottom: 32,
    width: 480,
    maxWidth: 'calc(100vw - 64px)',
    height: 640,
    maxHeight: 'calc(100vh - 64px)',
    background: 'white',
    zIndex: 200,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0, 0, 0, .2)',
    overflow: 'hidden',
    transition: 'transform .3s, opacity .3s',

    '@media screen and (max-width: 600px)': {
      right: 16,
      bottom: 16,
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: 'calc(100vh - 32px)'
    },

    '& iframe': {
      marginTop: 56,
      width: '100%',
      height: 'calc(100% - 56px)',
    },

    '&.is-collapsed': {
      transform: 'translateX(480px)',
      opacity: 0,
    },

    '& .gitter-chat-embed-action-bar': {
      display: 'none',
    },

    '& .toolbar': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      background: 'white',
      zIndex: 6,
      padding: 16,
      textAlign: 'right',

      '& a': {
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#424242',
        marginLeft: '16px',
        opacity: .25,
        transition: 'opacity .15s',
        '&:hover': {opacity: 1},
      }
    },
  },
}));
