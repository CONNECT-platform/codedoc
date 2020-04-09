import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../../theme';


export const ToCSearchOverlayStyle = themedStyle<CodedocTheme>(theme => ({
  overlay: {
    zIndex: 1000,
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0, left: 0, bottom: 0, right: 0,
    background: 'rgba(0, 0, 0, .65)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },


  content: {
    width: 'calc(50vw - 32px)',
    height: 'calc(75vh - 32px)',
    padding: 16,

    '@media screen and (max-width: 1200px)': {
      width: 'calc(100vw - 32px)',
      height: 'calc(100vh - 32px)',
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
      },
    },

    color: '#e0e0e0',
  },

  results: {
    '& .loading': {
      textAlign: 'center',
      marginTop: 96,
      fontSize: 64,
      opacity: .25,
    },

    '& .empty': {
      fontSize: 24,
      fontStyle: 'italic',
      opacity: .25,
    }
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
