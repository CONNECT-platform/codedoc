import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../../theme';


export const ToCSearchOverlayStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  overlay: {
    zIndex: 1000,
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0, left: 0, bottom: 0, right: 0,
    background: 'rgba(64, 64, 64, .65)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    opacity: 0,
    transition: 'opacity .15s',
    '&.active': {opacity: 1},
  },


  content: {
    width: 'calc(50vw - 32px)',
    height: 'calc(75vh - 32px)',
    overflow: 'auto',
    padding: 16,

    '@media screen and (max-width: 1200px)': {
      width: 'calc(100vw - 64px)',
      height: 'calc(100vh - 64px)',
      padding: 32,
    },

    '& .top': {
      display: 'flex',
      alignItems: 'center',

      '& input': {
        background: 'none',
        border: 'none',
        outline: 'none',
        fontSize: 24,
        display: 'block',
        flexGrow: 1,
        color: 'white',

        '&::placeholder': {
          color: 'rgba(255, 255, 255, .25)',
        }
      },
    },

    color: '#e0e0e0',
  },

  results: {
    '& .loading': {
      textAlign: 'center',
      marginTop: 128,
      fontSize: 24,
    },

    '& .empty': {
      fontSize: 24,
      fontStyle: 'italic',
      opacity: .25,
    },

    '& a': {
      display: 'flex',
      alignItems: 'center',
      color: 'white !important',
      textDecoration: 'none !important',
      padding: 16,
      fontSize: 24,
      margin: '0 -16',
      borderRadius: 3,
      opacity: .75,
      outline: 'none',
      background: 'transparent',
      borderBottom: '1px solid rgba(255, 255, 255, .05)',
      cursor: 'pointer',
      transition: 'background .15s, opacity .15s, border-color .15s !important',

      '&:hover, &:focus': {
        opacity: 1,
        background: 'rgba(156, 156, 156, .25)',
        borderColor: 'transparent',
      },

      '& .title': {
        flexGrow: 1,
      },

      '& .current': {
        fontSize: 12,
        color: theme.light.primary,
        'body.dark &': {
          color: theme.dark.primary,
        }
      },
    },
  },

  close: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    opacity: .25,
    width: 64,
    height: 64,
    borderRadius: 3,
    transition: 'opacity .15s',
    '&:hover': {opacity: 1},

    '&:before, &:after': {
      content: '" "',
      background: 'white',
      borderRadius: 2,
      width: 48,
      height: 2,
      position: 'absolute',
      transformOrigin: 'center',
    },
    '&:before': { transform: 'rotate(45deg)'},
    '&:after': { transform: 'rotate(-45deg)'},
  },
}));
