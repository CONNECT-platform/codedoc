import { Plugin } from '@connectv/html';
import { marked } from '@connectv/marked';
import { build, PluginBuilder } from '@connectv/sdh';

import { CodedocConfig } from '../config';
import { ContentBuilder } from './types';
import { ConfigTransport$, CodedocTransportConf } from '../transport/config';


export function content(
  builder: ContentBuilder,
  toc: string,
  config: CodedocConfig,
  ...plugins: (Plugin<any, any> | PluginBuilder<any, any>)[]
) {
  return build(
    async (md: string, renderer, file) => {
      const res = await builder(
        marked(md, config.markdown)(renderer), 
        marked(toc, config.tocMarkdown)(renderer), 
        renderer, 
        file
      );

      const transportConf: CodedocTransportConf = {
        namespace: config.dest.namespace
      };

      if (res instanceof HTMLHtmlElement && res.lastChild)
        renderer.render(<ConfigTransport$ {...transportConf}/>).on(res.lastChild);
      else
        renderer.render(<ConfigTransport$ {...transportConf}/>).on(res);

      return res;
    },
    ...plugins
  );
}
