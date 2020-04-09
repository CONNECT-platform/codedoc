import { RendererLike } from '@connectv/html';
import { File } from 'rxline/fs';
import { Page } from '../../src/components/page';
import { Meta } from '../../src/components/page/meta';
import { ContentNav } from '../../src/components/page/contentnav';

import { config } from '../config';
import { Header } from './header';
import { Footer } from './footer';
import { Fonts } from '../../src/components/page/fonts';
import { ToC } from '../../src/components/page/toc';
import { GithubSearch$ } from '../../src/components/misc/github/search';


export function content(_content: HTMLElement, toc: HTMLElement, renderer: RendererLike<any, any>, file: File<string>) {
  return (
    <Page title={config.page.title.extractor(_content, config, file)}
          favicon={config.page.favicon}
          meta={<Meta {...config.page.meta}/>}
          fonts={<Fonts {...config.page.fonts}/>}
          header={<Header {...config}/>}
          footer={<Footer {...config}/>}
          toc={
            <ToC search={
                  config.misc?.github ? <GithubSearch$/> : false
            }>{toc}</ToC>
          }>
      {_content}
      <ContentNav content={_content}/>
    </Page>
  )
}
