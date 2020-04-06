import { Plugin } from '@connectv/html';
import { marked } from '@connectv/marked';
import { build, PluginBuilder } from '@connectv/sdh';

import { CodedocConfig } from '../config';
import { ContentBuilder } from './types';


export function content(
  builder: ContentBuilder, 
  config: CodedocConfig, 
  ...plugins: (Plugin<any, any> | PluginBuilder<any, any>)[]
) {
  return build(
    (md: string, renderer, file) => builder(marked(md, config.markdown)(renderer), renderer, file),
    ...plugins
  );
}
