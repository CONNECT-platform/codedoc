import { files as _files, pathMatch, File } from 'rxline/fs';

import { CodedocConfig } from '../config';
import { SimpleLine, line } from 'rxline';


export function files(config: CodedocConfig): SimpleLine<File<undefined>>;
export function files(list: string[], config: CodedocConfig): SimpleLine<File<undefined>>;
export function files(list: string[] | CodedocConfig, config?: CodedocConfig) {
  if (Array.isArray(list)) {
    const conf = config as CodedocConfig;
    return line(list.map(path => ({path, root: conf.src.base, content: undefined })));
  } else {
    const conf = list;
    return _files('.', { root: conf.src.base })
      .pick(pathMatch(conf.src.pick))
      .drop(pathMatch(conf.src.drop))
  ;
  }
}
