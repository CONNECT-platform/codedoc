import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '../../theme';


export const TabsStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  tabs: {
    '& .selector': {
      whiteSpace: 'nowrap',
      paddingBottom: 8,
      marginBottom: -8,
      overflow: 'auto',
      paddingRight: 24,

      '& button': {
        margin: 0,
        cursor: 'pointer',
        outline: 'none',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        background: theme.light.background,
        color: theme.light.text,
        borderRadius: 8,
        minWidth: 96,
        position: 'relative',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transform: 'scale(.9)',
        transformOrigin: 'bottom center',
        opacity: .35,
        border: `1px solid ${theme.light.border}`,
        padding: '4px 8px',

        '&:after': {
          content: "' '",
          position: 'absolute',
          left: 0, right: 0, bottom: -1, height: 2,
          background: theme.light.background,
        },

        '&:hover': { opacity: 1 },
        '&.selected': {
          transform: 'scale(1)',
          opacity: 1,
          '&:after': { bottom: -4, height: 8},
        },

        'body.dark-mode-animate &': {
          transition: 'background .3s, border-color .3s, color .3s, opacity .1s, transform .1s',
          '&:after': {transition: 'height .1s, bottom .1s, background .3s'},
        },

        '@media (prefers-color-scheme: dark)': {
          'body:not(.dark-mode-animate) &': {
            background: theme.dark.background,
            color: theme.dark.text,
            borderColor: theme.dark.border,

            '&:after': {
              background: theme.dark.background,
            },
          },
        },

        'body.dark &': {
          background: theme.dark.background,
          color: theme.dark.text,
          borderColor: theme.dark.border,

          '&:after': {
            background: theme.dark.background,
          },
        },

        '& .icon-font': {
          verticalAlign: 'middle',
          marginLeft: 16,
          fontSize: 18,
          opacity: .5,
        },
      }
    },

    '& .tab': {
      border: `1px solid ${theme.light.border}`,
      borderRadius: 3,
      padding: 8,

      '&.first': {
        borderTopLeftRadius: 0,
      },

      'body.dark-mode-animate &': {
        transition: 'border-color .3s',
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          borderColor: theme.dark.border,
        }
      },

      'body.dark &': {
        borderColor: theme.dark.border,
      },

      '&:not(.selected)': {
        display: 'none',
      },

      '&>pre': {
        '&:first-child': { marginTop: 0, },
        '&:last-child': { marginBottom: 0, },
      },
    }
  },
}));