import { themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


export const HeaderStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  header: {
    position: 'fixed',
    top: 0, right: 0,
    zIndex: 100,
    padding: 32,
    textAlign: 'right',
  }
}));
