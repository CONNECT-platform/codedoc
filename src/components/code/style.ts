import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const CodeStyle = themedStyle<CodedocTheme>(theme => ({
  code: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    background: theme.code.light.background,
    display: 'block',
    position: 'relative',
    padding: '24px 0',
    'pre.with-bar &': { paddingTop: 0, },
    borderRadius: 3,
    color: theme.code.light.text,
    boxShadow: theme.code.light.shadow,
    fontSize: '13px',
    overflowX: 'auto',
    outline: 'none',

    '& .error, & .warning': {
      display: 'inline-block',
      position: 'relative',

      '& .wave': {
        // fontFamily: 'cursive',
        position: 'absolute',
        bottom: '-1rem', left: 0, right: 0,
        letterSpacing: '-.43rem',
        fontSize: '1.5rem',
        fontWeight: 100,
      }
    },

    '& .token.keyword': { color: theme.code.light.keyword },
    '& .token.string': { color: theme.code.light.string },
    '& .token.number': { color: theme.code.light.number },
    '& .token.boolean': { color: theme.code.light.boolean },
    '& .token.operator': { color: theme.code.light.operator },
    '& .token.function': { color: theme.code.light.function },
    '& .token.parameter': { color: theme.code.light.parameter },
    '& .token.comment': { color: theme.code.light.comment },
    '& .token.tag': { color: theme.code.light.tag },
    '& .token.builtin': { color: theme.code.light.builtin },
    '& .token.punctuation': { color: theme.code.light.punctuation },
    '& .token.class-name': { color: theme.code.light.className },
    '& .token.attr-name': { color: theme.code.light.attrName },
    '& .token.attr-value': { color: theme.code.light.attrValue },
    '& .token.plain-text': { color: theme.code.light.plainText },
    '& .token.script': { color: theme.code.light.script },
    '& .token.placeholder' : { color: theme.code.light.placeholder },
    '& .token.selector' : { color: theme.code.light.selector },
    '& .token.property': { color: theme.code.light.property },
    '& .token.important': { color: theme.code.light.important },
    '&.scss .token.function, &.css .token.function, &.sass .token.function': { color: theme.code.light.cssfunc },
    '& .token.key': { color: theme.code.light.key },
    '& .error .wave': { color: theme.code.light.errorUnderline },
    '& .warning .wave': { color: theme.code.light.warningUnderline },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        background: theme.code.dark.background,
        color: theme.code.dark.text,
        boxShadow: theme.code.dark.shadow,
  
        '& .token.keyword': { color: theme.code.dark.keyword },
        '& .token.string': { color: theme.code.dark.string },
        '& .token.number': { color: theme.code.dark.number },
        '& .token.boolean': { color: theme.code.dark.boolean },
        '& .token.operator': { color: theme.code.dark.operator },
        '& .token.function': { color: theme.code.dark.function },
        '& .token.parameter': { color: theme.code.dark.parameter },
        '& .token.comment': { color: theme.code.dark.comment },
        '& .token.tag': { color: theme.code.dark.tag },
        '& .token.builtin': { color: theme.code.dark.builtin },
        '& .token.punctuation': { color: theme.code.dark.punctuation },
        '& .token.class-name': { color: theme.code.dark.className },
        '& .token.attr-name': { color: theme.code.dark.attrName },
        '& .token.attr-value': { color: theme.code.dark.attrValue },
        '& .token.plain-text': { color: theme.code.dark.plainText },
        '& .token.script': { color: theme.code.dark.script },
        '& .token.placeholder' : { color: theme.code.dark.placeholder },
        '& .token.selector' : { color: theme.code.dark.selector },
        '& .token.property': { color: theme.code.dark.property },
        '& .token.important': { color: theme.code.dark.important },
        '&.scss .token.function, &.css .token.function, &.sass .token.function': { color: theme.code.dark.cssfunc },
        '& .token.key': { color: theme.code.dark.key },
        '& .error .wave': { color: theme.code.dark.errorUnderline },
        '& .warning .wave': { color: theme.code.dark.warningUnderline },
      },
    },

    'body.dark &': {
      background: theme.code.dark.background,
      color: theme.code.dark.text,
      boxShadow: theme.code.dark.shadow,

      '& .token.keyword': { color: theme.code.dark.keyword },
      '& .token.string': { color: theme.code.dark.string },
      '& .token.number': { color: theme.code.dark.number },
      '& .token.boolean': { color: theme.code.dark.boolean },
      '& .token.operator': { color: theme.code.dark.operator },
      '& .token.function': { color: theme.code.dark.function },
      '& .token.parameter': { color: theme.code.dark.parameter },
      '& .token.comment': { color: theme.code.dark.comment },
      '& .token.tag': { color: theme.code.dark.tag },
      '& .token.builtin': { color: theme.code.dark.builtin },
      '& .token.punctuation': { color: theme.code.dark.punctuation },
      '& .token.class-name': { color: theme.code.dark.className },
      '& .token.attr-name': { color: theme.code.dark.attrName },
      '& .token.attr-value': { color: theme.code.dark.attrValue },
      '& .token.plain-text': { color: theme.code.dark.plainText },
      '& .token.script': { color: theme.code.dark.script },
      '& .token.placeholder' : { color: theme.code.dark.placeholder },
      '& .token.selector' : { color: theme.code.dark.selector },
      '& .token.property': { color: theme.code.dark.property },
      '& .token.important': { color: theme.code.dark.important },
      '&.scss .token.function, &.css .token.function, &.sass .token.function': { color: theme.code.dark.cssfunc },
      '& .token.key': { color: theme.code.dark.key },
      '& .error .wave': { color: theme.code.dark.errorUnderline },
      '& .warning .wave': { color: theme.code.dark.warningUnderline },
    },
  },

  lineCounter: {
    position: 'sticky',
    left: 0,
    verticalAlign: 'top',
    height: '1.25rem',
    background: theme.code.light.background,
    width: '24px',
    marginRight: '12px',
    paddingRight: '12px',
    fontSize: '10px',
    display: 'inline-flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    color: 'transparent',
    borderRight: `2px solid ${theme.code.light.lineCounterBorder}`,
    transition: 'color .3s, background .3s',

    '&.prim': {
      color: theme.code.light.lineCounter,
    },

    '& .-codedoc-line-link': {
      position: 'absolute',
      fontSize: 12,
      left: 0, right: 0, top: -2, bottom: 0,
      textAlign: 'center',
      opacity: 0,
      color: theme.code.light.text,
      transition: 'opacity .15s',

      '& .icon-font': { transform: 'scale(.75)' }
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        background: theme.code.dark.background,
        borderColor: theme.code.dark.lineCounterBorder,
  
        '&.prim': {
          color: theme.code.dark.lineCounter,
        },

        '& .-codedoc-line-link': {
          color: theme.code.dark.text,
        },
      },
    },

    'body.dark &': {
      background: theme.code.dark.background,
      borderColor: theme.code.dark.lineCounterBorder,

      '&.prim': {
        color: theme.code.dark.lineCounter,
      },

      '& .-codedoc-line-link': {
        color: theme.code.dark.text,
      },
    },
  },

  termPrefix: {
    fontWeight: 'bold',
    marginRight: 8,

    transition: 'color .3s',
    color: theme.code.light.terminalPrefix,
    'body.dark &': {
      color: theme.code.dark.terminalPrefix,
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        color: theme.code.dark.terminalPrefix,
      }
    },
  },

  termOutput: {
    padding: 8,
    paddingLeft: 48,
    display: 'block',

    transition: 'color .3s, background .3s',
    color: theme.code.light.terminalOutput,
    background: theme.code.light.terminalOutputBackground,
    'body.dark &': {
      color: theme.code.dark.terminalOutput,
      background: theme.code.dark.terminalOutputBackground,
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        color: theme.code.dark.terminalOutput,
        background: theme.code.dark.terminalOutputBackground,
      }
    },

    '&:last-child': {
      marginBottom: -24,
      paddingBottom: 12,
    }
  },

  line: {
    display: 'inline-block',
    minWidth: '100%',
    height: '1.25rem',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'opacity .15s, color .3s, background .3s',

    '.has-selection &:not(.selected)': {
      opacity: .35,
      transition: 'opacity 3s',
    },

    '&.highlight': {
      background: theme.code.light.lineHighlight,
      color: theme.code.light.lineHighlightText,
      '& $lineCounter': {
        background: theme.code.light.lineHighlight,
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          background: theme.code.dark.lineHighlight,
          color: theme.code.dark.lineHighlightText,
  
          '& $lineCounter': {
            background: theme.code.dark.lineHighlight,
          },
        },
      },

      'body.dark &': {
        background: theme.code.dark.lineHighlight,
        color: theme.code.dark.lineHighlightText,

        '& $lineCounter': {
          background: theme.code.dark.lineHighlight,
        },
      },
    },

    '&.added': {
      position: 'relative',
      '&:before': {
        content: '"+"',
        fontWeight: 'bold',
        fontSize: '1rem',
        position: 'absolute',
        left: '2.5rem',
        top: '-.05rem',
        color: theme.code.light.lineHighlightAddedIndicator,
        transition: 'color .3s',
      },
      color: theme.code.light.lineHighlightText,
      background: theme.code.light.lineHighlightAdded,
      '& $lineCounter': {
        background: theme.code.light.lineHighlightAdded,
      },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          '&:before': { color: theme.code.dark.lineHighlightAddedIndicator },
          background: theme.code.dark.lineHighlightAdded,
          color: theme.code.dark.lineHighlightText,
  
          '& $lineCounter': {
            background: theme.code.dark.lineHighlightAdded,
          },
        },
      },
      'body.dark &': {
        '&:before': { color: theme.code.dark.lineHighlightAddedIndicator },
        background: theme.code.dark.lineHighlightAdded,
        color: theme.code.dark.lineHighlightText,

        '& $lineCounter': {
          background: theme.code.dark.lineHighlightAdded,
        },
      },
    },

    '&.removed': {
      position: 'relative',
      '&:before': {
        content: '"-"',
        fontWeight: 'bold',
        fontSize: '1rem',
        position: 'absolute',
        left: '2.5rem',
        top: '-.05rem',
        color: theme.code.light.lineHighlightRemovedIndicator,
      },
      color: theme.code.light.lineHighlightText,
      background: theme.code.light.lineHighlightRemoved,
      '& $lineCounter': {
        background: theme.code.light.lineHighlightRemoved,
      },
      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          '&:before': { color: theme.code.dark.lineHighlightRemovedIndicator },
          background: theme.code.dark.lineHighlightRemoved,
          color: theme.code.dark.lineHighlightText,
  
          '& $lineCounter': {
            background: theme.code.dark.lineHighlightRemoved,
          },
        },
      },
      'body.dark &': {
        '&:before': { color: theme.code.dark.lineHighlightRemovedIndicator },
        background: theme.code.dark.lineHighlightRemoved,
        color: theme.code.dark.lineHighlightText,

        '& $lineCounter': {
          background: theme.code.dark.lineHighlightRemoved,
        },
      },
    },

    '&.selected $lineCounter': {
      borderColor: `${theme.code.light.lineCounterHighlight} !important`,

      'body.dark &': {
        borderColor: `${theme.code.dark.lineCounterHighlight} !important`,
      },
    },

    '&:hover, &.selected': {
      background: theme.code.light.lineHover,

      '& $lineCounter': {
        background: `${theme.code.light.lineHover} !important`,
        color: theme.code.light.lineCounterHighlight,
      },

      'body.dark &': {
        background: `${theme.code.dark.lineHover} !important`,

        '& $lineCounter': {
          background: `${theme.code.dark.lineHover} !important`,
          color: theme.code.dark.lineCounterHighlight,
        },
      },

      '& $lineCounter:hover': {
        color: 'transparent !important',
        '& .-codedoc-line-link': { opacity: 1 }
      },
    },

    '&:hover $lineCounter': {
      borderColor: theme.code.light.lineCounterBorderHover,

      'body.dark &': {
        borderColor: theme.code.dark.lineCounterBorderHover,
      },
    },
  },

  wmbar: {
    display: 'none',
    position: 'sticky',
    left: 0,
    padding: 16,
    '&>span': {
      fontFamily: 'sans-serif',
      fontSize: 12,
      marginRight: 64,
      display: 'block',
      flexGrow: 1,
      textAlign: 'center',
      opacity: .5,
    },
    '&>span:first-child, &>span:nth-child(2), &>span:nth-child(3)': {
      flexGrow: 0, opacity: 1,
      width: 8, height: 8, borderRadius: 8, marginRight: 8,
      '&:first-child': { background: 'rgb(255, 95, 86)' },
      '&:nth-child(2)': { background: 'rgb(255, 189, 46)' },
      '&:nth-child(3)': { background: 'rgb(39, 201, 63)' },
    },

    'pre.with-bar &': {
      display: 'flex',
    }
  },
}));
