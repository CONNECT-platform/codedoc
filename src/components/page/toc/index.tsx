import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';
import { TocStyle } from './style';


export interface ToCOptions {
  search?: any;
}


export function ToC(
  this: ThemedComponentThis<CodedocTheme>,
  options: ToCOptions,
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(TocStyle);
  return <div id="-codedoc-toc" class={classes.toc}>
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
