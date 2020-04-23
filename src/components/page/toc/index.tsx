import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';
import { TocStyle } from './style';


export interface ToCOptions {
  search?: any;
  default?: 'open' | 'closed';
}


export function ToC(
  this: ThemedComponentThis<CodedocTheme>,
  options: ToCOptions,
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(TocStyle);
  return <div id="-codedoc-toc" class={classes.toc}>
    {options.default === 'open' ? 
     <script>{`
     if (window.matchMedia('(min-width: 1200px)').matches) {
       if (!localStorage.getItem('-codedoc-toc-active')) {
         localStorage.setItem('-codedoc-toc-active', "true");
       }
     }
     `}</script>
    : ''}
    <div class={classes.content}>
      {content}
    </div>
    {options.search ? 
      <div class={classes.search}>
        {options.search}
      </div> : ''
    }
  </div>
}

export * from './heading';
export * from './toggle';
export * from './search';
export * from './prevnext';
export { TocStyle } from './style';
