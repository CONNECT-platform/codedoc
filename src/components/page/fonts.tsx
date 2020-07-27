import { RendererLike } from '@connectv/html';


export interface FontOptions {
  url: string;
  name: string;
  fallback?: string;
}


export interface IconFontOptions {
  url: string;
  name: string;
  outline?: string;
}


export interface FontsOptions {
  text?: FontOptions;
  code?: FontOptions;
  icon?: IconFontOptions;
}


export function Fonts(options: FontsOptions, renderer: RendererLike<any, any>) {
  if (!options) options = {};

  if (!options.text) options.text = {
    name: 'Hind',
    url: 'https://fonts.googleapis.com/css?family=Hind:400,700&display=swap',
  };
  if (!options.text.fallback) options.text.fallback = 'sans-serif';
  
  if (!options.code) options.code = {
    name: 'Source Code Pro',
    url: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400&display=swap',
  }
  if (!options.code.fallback) options.code.fallback = `'Courier New', Courier, monospace`;

  if (!options.icon) options.icon = {
    name: 'Material Icons',
    url: 'https://fonts.googleapis.com/icon?family=Material+Icons%7CMaterial+Icons+Outlined&display=swap'
  };
  if (!options.icon.outline) options.icon.outline = options.icon.name + ' Outlined';

  return <fragment>
    <link href={options.text.url} rel="stylesheet" />
    <link href={options.code.url} rel="stylesheet" />
    <link href={options.icon.url} rel="stylesheet"/>

    <style>{`
      body, input, button {
        font-family: '${options.text.name}', ${options.text.fallback};
      }

      code, .hljs {
        font-family: '${options.code.name}', ${options.code.fallback};
      }

      .icon-font {
        font-family: '${options.icon.name}';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;  /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
      
        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;
      
        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;
      
        /* Support for IE. */
        font-feature-settings: 'liga';
      }

      .icon-font.outline {
        font-family: '${options.icon.outline}';
      }
    `}</style>
  </fragment>
}
