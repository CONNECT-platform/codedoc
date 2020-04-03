import { build } from '@connectv/sdh';
import { theme } from '@connectv/jss-theme';
import { marked } from '@connectv/marked';

import { Page } from '../../src/components/page';
import { ContentNav } from '../../src/components/page/contentnav';
import { CodedocTheme } from '../../src/theme';

import { config } from '../config';
import { header } from './header';
import { footer } from './footer';


export const content = build(
  (markdown: string, renderer, file) => {
    const content = marked(markdown, config.markdown)(renderer);

    return (
      // TODO: add meta, fonts, scripts and stylesheets and read them from config
      <Page title={config.title.extractor(content, config, file)}
            header={header(config, renderer)}
            footer={footer(config, renderer)}>
        {content}
        <ContentNav content={content}/>
      </Page>
    )
  }
, () => theme<CodedocTheme>(config.theme));
