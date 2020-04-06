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
  scripts?: string[];
  stylesheets?: string[];
  footer?: any;
  header?: any;
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

      <script async defer src="https://buttons.github.io/buttons.js"/>
    </head>

    <body>
      {options.header ? options.header : <Header><Watermark/></Header> }
      <div class="container">
        {content}
      </div>
      { options.footer ? options.footer : <Footer/> }
    </body>
  </html>;
}
