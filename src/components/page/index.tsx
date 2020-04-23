import { ExtensibleRenderer } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { Meta } from './meta';
import { Fonts } from './fonts';
import { Footer } from './footer';
import { Header } from './header';

import { PageStyle } from './style';
import { CodedocTheme } from '../../theme';
import { Watermark } from '../misc/watermark';


export interface PageOptions {
  title?: string;
  meta?: any;
  favicon?: string;
  fonts?: any;
  scripts?: HTMLElement[];
  stylesheets?: HTMLElement[];
  footer?: any;
  header?: any;
  toc?: any;
}


export function Page(
  this: ThemedComponentThis<CodedocTheme>,
  options: PageOptions, 
  renderer: ExtensibleRenderer<any, any>, 
  content: any
) {
  renderer = renderer.plug(this.theme.styled(PageStyle));

  return <html>
    <head>
      <title>{options.title || 'Codedoc Sample Page'}</title>
      
      {options.meta ? options.meta : <Meta/>}
      {options.favicon ? <link rel="shortcut icon" href={options.favicon}/> : ''}

      {options.fonts ? options.fonts : <Fonts/>}
      {options.scripts ? options.scripts : ''}
      {options.stylesheets ? options.stylesheets : ''}
    </head>

    <body>
      {options.header ? options.header : <Header><Watermark/></Header> }
      <div id="-codedoc-container" class="container">
        {content}
      </div>
      { options.toc ? options.toc : ' '}
      { options.footer ? options.footer : <Footer/> }
    </body>
  </html>;
}


export * from './meta';
export * from './fonts';
export * from './contentnav';
export * from './header';
export * from './footer';
export * from './toc';
export { PageStyle } from './style';