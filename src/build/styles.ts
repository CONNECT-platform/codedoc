import { join } from 'path';
import { theme } from '@connectv/jss-theme';
import { externalSheet } from '@connectv/jss-theme/external';

import { CodedocConfig } from '../config';
import { CodedocTheme } from '../theme';


export function styles(config: CodedocConfig) {
  return externalSheet(
    theme<CodedocTheme>(config.theme),
    '/' + config.dest.styles + '/codedoc-styles.css',
    join(config.dest.assets, config.dest.styles, 'codedoc-styles.css'),
  );
}
