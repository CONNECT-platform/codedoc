import { ExtensibleRenderer } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { Meta } from './meta';
import { Fonts } from './fonts';
import { Footer } from '../footer';

import { PageStyle } from './style';
import { CodedocTheme } from '../../theme';


export interface PageOptions {
  title?: string;
  meta?: any;
  fonts?: any;
  footer?: any;
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
      {options.fonts ? options.fonts : <Fonts/>}

    </head>

    <body>
      <div class="container">
        {content}
      </div>
      { options.footer ? options.footer : <Footer/> }
    </body>
  </html>;
}
