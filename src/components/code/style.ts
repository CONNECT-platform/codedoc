import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const CodeStyle = themedStyle<CodedocTheme>(theme => ({
  code : {
    userSelect: 'none',
    background: theme.code.light.background,
    display: 'block',
    padding: '24px 0',
    borderRadius: '3px',
    color: theme.code.light.text,
    fontSize: '13px',
    overflowX: 'auto',

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
    transition: 'border-color .1s, color .1s, background .1s',

    '&.prim': {
      color: theme.code.light.lineCounter,
    },
  },

  line: {
    display: 'inline-block',
    minWidth: '100%',
    height: '1.25rem',
    background: 'transparent',
    transition: 'background .1s',
    cursor: 'pointer',

    '&.highlight': {
      background: theme.code.light.lineHightlight,
      color: theme.code.light.lineHighlightText,

      '& $lineCounter': {
        background: theme.code.light.lineHightlight,
      },
    },

    '&:hover, &.selected': {
      background: theme.code.light.lineHover,

      '& $lineCounter': {
        background: `${theme.code.light.lineHover} !important`,
        color: theme.code.light.lineCounterHighlight,
      },
    },

    '&:hover $lineCounter': {
      borderColor: theme.code.light.lineCounterBorderHover,
    },

    '&.selected $lineCounter': {
      borderColor: theme.code.light.lineCounterHighlight,
    },
  },
}));
