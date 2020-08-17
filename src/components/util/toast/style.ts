import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../transport';



export const ToastStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  container: {
    userSelect: 'none',
    position: 'fixed',
    zIndex: 1000,
    top: 32, left: 0, right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translateY(-64px)',
    opacity: 0,
    transition: 'transform .15s, opacity .15s',
    '&.moving': {
      transition: 'none',
    },

    '&[data-visible]': {
      transform: 'translateY(0)',
      opacity: 1,
    }
  },

  toast: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    background: 'rgba(64, 64, 64, .65)',
    margin: '0  auto',
    padding: 16,
    minWidth: 384,
    maxWidth: 768,
    borderRadius: 8,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',

    '$container.no-blur &': {
      background: 'rgba(64, 64, 64, .97)',
    },

    '&>a': {
      color: 'white',
    },

    '@media screen and (max-width: 1200px)': {
      minWidth: '0',
      width: 'calc(100vw - 64px)',
    },
  },

  content: {
    flexGrow: 1,
  },

  actions: {
    flexShrink: 0,
    display: 'flex',
    '& > button, & > a': {
      padding: 4,
      background: 'rgba(192, 192, 192, .15)',
      transition: 'background .15s',
      '&:hover': {
        background: 'rgba(192, 192, 192, .35)',
      },
      color: 'white',
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 32,
      height: 32,
      marginLeft: 8,
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
    }
  }
}));