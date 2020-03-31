import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const CodeStyle = themedStyle<CodedocTheme>(theme => ({
  code : {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    background: theme.code.light.background,
    display: 'block',
    position: 'relative',
    padding: '24px 0',
    borderRadius: '3px',
    color: theme.code.light.text,
    fontSize: '13px',
    overflowX: 'auto',
    outline: 'none',

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

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        background: theme.code.dark.background,
        color: theme.code.dark.text,
  
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
      },
    },

    'body.dark &': {
      background: theme.code.dark.background,
      color: theme.code.dark.text,

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

    '&.prim': {
      color: theme.code.light.lineCounter,
    },

    '@media (prefers-color-scheme: dark)': {
      'body:not(.dark-mode-animate) &': {
        background: theme.code.dark.background,
        borderColor: theme.code.dark.lineCounterBorder,
  
        '&.prim': {
          color: theme.code.dark.lineCounter,
        },
      },
    },

    'body.dark &': {
      background: theme.code.dark.background,
      borderColor: theme.code.dark.lineCounterBorder,

      '&.prim': {
        color: theme.code.dark.lineCounter,
      },
    },
  },

  line: {
    display: 'inline-block',
    minWidth: '100%',
    height: '1.25rem',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'opacity .15s',

    '.has-selection &:not(.selected)': {
      opacity: .35,
      transition: 'opacity 3s',
    },

    '&.highlight': {
      background: theme.code.light.lineHightlight,
      color: theme.code.light.lineHighlightText,

      '& $lineCounter': {
        background: theme.code.light.lineHightlight,
      },

      '@media (prefers-color-scheme: dark)': {
        'body:not(.dark-mode-animate) &': {
          background: theme.code.dark.lineHightlight,
          color: theme.code.dark.lineHighlightText,
  
          '& $lineCounter': {
            background: theme.code.dark.lineHightlight,
          },
        },
      },

      'body.dark &': {
        background: theme.code.dark.lineHightlight,
        color: theme.code.dark.lineHighlightText,

        '& $lineCounter': {
          background: theme.code.dark.lineHightlight,
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
    },

    '&:hover $lineCounter': {
      borderColor: theme.code.light.lineCounterBorderHover,

      'body.dark &': {
        borderColor: theme.code.dark.lineCounterBorderHover,
      },
    },
  },
}));
