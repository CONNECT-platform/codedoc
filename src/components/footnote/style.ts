import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '../../theme';


export const FootnoteStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  footnotes: {
    '&>div': {
      display: 'flex',
      '&>span': {
        marginRight: theme.rtl ? 0 : 16,
        marginLeft: theme.rtl ? 16 : 0,
        fontWeight: 'bold',
      },
      '&>marker>p': {
        margin: 0,
      }
    }
  }
}));