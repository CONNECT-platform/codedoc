import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '../../../../../theme';


export const SearchSwitcherStyles = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  holder: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    zIndex: 800,
    bottom: 96,
    height: 48,
    width: 384,
    padding: 8,
    borderRadius: 8,
    left: 'calc(50vw - 192px)',
    background: 'rgba(64, 64, 64, .65)',
    backdropFilter: 'blur(12px)',
    color: 'white',
    WebkitBackdropFilter: 'blur(12px)',

    '@media screen and (max-width: 448px)': {
      width: 'calc(100vw - 48px)',
      left: 16,
    },

    '& .icon-font': {
      userSelect: 'none',
      width: 48,
      height: 48,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      opacity: .35,
      transition: 'background .15s, opacity .15s',
      borderRadius: 3,
      '&:hover': {
        opacity: 1,
        background: 'rgba(156, 156, 156, .5)',
      },
    },
  },

  content: {
    flexGrow: 1,
    textAlign: 'center',
  }
}));