import { CodedocConfig } from '../config';


export function namespace(config: CodedocConfig) {
  return function(html: HTMLDocument) {
    html.querySelectorAll('a, link').forEach(el$ => {
      if (el$.getAttribute('href') && el$.getAttribute('href')?.startsWith('/')) {
        el$.setAttribute('href', config.dest.namespace + el$.getAttribute('href'));
      }
    });

    html.querySelectorAll('script, img').forEach(el$ => {
      if (el$.getAttribute('src') && el$.getAttribute('src')?.startsWith('/')) {
        el$.setAttribute('src', config.dest.namespace + el$.getAttribute('src'));
      }
    });
  }
}