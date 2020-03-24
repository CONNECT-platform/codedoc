import { RendererLike } from '@connectv/html';

import { Meta } from './meta';


export interface PageOptions {
  title?: string;
  meta?: any;
}


export function Page(options: PageOptions, renderer: RendererLike<any, any>) {
  return <html>
    <head>
      <title>{options.title || 'Codedoc Sample Page'}</title>
      
      {options.meta ? options.meta : <Meta/>}

      <link href="https://fonts.googleapis.com/css?family=Hind:400,700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400&display=swap" rel="stylesheet" />
    </head>

    <body>
      <style>{`
      * {
        scroll-behavior: smooth;
      }

      body {
        font-family: 'Hind', sans-serif;
        background: #f5f5f5;
        color: #424242;
        width: 100vw;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
      }

      body.dark-mode {
        background: #212121;
        color: #eeeeee;
      }
      
      body.dark-mode-animate {
        transition: background .3s, color .3s;
      }

      .container {
        max-width: 768px;
        padding: 32px;
        margin: 0 auto;
        margin-bottom: 64px;
      }
      `}</style>

      <div class="container">
        <h1>Halo</h1>
        <p>This is the first test for codedoc</p>
      </div>
    </body>
  </html>;
}
