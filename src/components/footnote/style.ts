import { themedStyle } from '@connectv/jss-theme';
import { CodedocTheme } from '../../theme';


export const FootnoteStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  footnotes: {
    '&>div': {
      display: 'flex',
      '&>span': {
        marginRight: 16,
        fontWeight: 'bold',
      },
      '&>marker>p': {
        margin: 0,
      }
    }
  }
}));