import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '../../../../theme';


export const ToCPrevNextStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  prevnext: {
    display: 'flex',
    margin: '64px 0',

    '@media screen and (max-width: 1200px)': {
      display: 'block'
    },
  },

  label: {
    opacity: .75,
    fontSize: 12,
  },

  title: {
    fontSize: 20,
  },

  button: {
    flexGrow: 1,
    flexBasis: 0,
    display: 'flex',
    padding: 16,
    cursor: 'pointer',
    alignItems: 'center',
    borderRadius: 8,

    opacity: .5,
    boxShadow: '0 1px 3px rgba(0, 0, 0, .1)',
    transition: 'box-shadow .15s, transform .15s, opacity .15s !important',

    'body.dark &': { boxShadow: '0 1px 3px rgba(0, 0, 0, .25)', },
    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': { boxShadow: '0 1px 3px rgba(0, 0, 0, .25)', },
    },

    '&:hover': {
      opacity: 1,
      boxShadow: '0 2px 6px rgba(0, 0, 0, .1)',
      'body.dark &': { boxShadow: '0 2px 6px rgba(0, 0, 0, .25)', },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': { boxShadow: '0 2px 6px rgba(0, 0, 0, .25)', },
      },
      transform: 'translateY(-4px)',
    },

    '& $label, & $title': {
      'body.dark-mode-animate &': { transition: 'color .3s' },

      color: theme.light.text,
      'body.dark &': { color: theme.dark.text, },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': { color: theme.dark.text, },
      },
    },

    '&:hover $label, &:hover $title': {
      color: theme.light.primary,
      'body.dark &': { color: theme.dark.primary, },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': { color: theme.dark.primary, },
      },
    },

    '&:not(:last-child)': {
      marginRight: 16,

      '@media screen and (max-width: 1200px)': {
        marginRight: 0
      },
    },

    textDecoration: 'none !important',

    '& span': { display: 'block' },
    '&>div': { flexGrow: 1, },

    '&.prev': {
      flexDirection: 'row-reverse',
      '&>div': { textAlign: 'right' },
    }
  },
}));
