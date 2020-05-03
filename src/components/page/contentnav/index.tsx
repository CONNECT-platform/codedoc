import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { ContentNavStyle } from './style';
import { CodedocTheme } from '../../../theme';


export interface ContentNavOptions {
  content: HTMLElement;
}


export function ContentNav(
  this: ThemedComponentThis<CodedocTheme>,
  options: ContentNavOptions, 
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(ContentNavStyle);

  const links: HTMLElement[] = [];
  options.content.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(h$ => {
    let text = h$.textContent;
    if (h$.childElementCount > 0) {
      text = '';
      h$.childNodes.forEach(node => {
        if (!(node instanceof HTMLElement && node.hasAttribute('data-ignore-text'))) {
          text += node.textContent || '';
        }
      });
    }

    links.push(
      <a href={`#${h$.getAttribute('id')}`} 
         class={h$.tagName.toLowerCase()}
         data-content-highlight={h$.getAttribute('id')}>
        {text}
      </a>);
  });

  return <div class={classes.contentnav} data-no-search>{links}</div>
}


export { ContentNavStyle } from './style';