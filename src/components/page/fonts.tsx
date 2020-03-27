import { RendererLike } from '@connectv/html';


export interface FontOptions {
  url: string;
  name: string;
  fallback?: string;
}


export interface FontsOptions {
  text?: FontOptions;
  code?: FontOptions;
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

  return <fragment>
    <link href={options.text.url} rel="stylesheet" />
    <link href={options.code.url} rel="stylesheet" />

    <style>{`
      body, input, button {
        font-family: '${options.text.name}', ${options.text.fallback};
      }

      code, .hljs {
        font-family: '${options.code.name}', ${options.code.fallback};
      }
    `}</style>
  </fragment>
}
