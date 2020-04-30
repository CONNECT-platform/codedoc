import { renderToString } from 'katex';
import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';
import { FormulaStyle } from './style';


export interface FormulaOptions {
  size?: 'normal' | 'large';
  align?: 'left' | 'center';
}


export function Formula(
  this: ThemedComponentThis<CodedocTheme>,
  options: FormulaOptions,
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(FormulaStyle);

  const marker = <div>{content}</div>;
  const holder = <div class={classes.formula
    + ` ${options && options.align === 'center' ? 'center' : ''}`
    + ` ${options && options.size === 'large' ? 'big': ''}`
  }/>;
  marker.childNodes.forEach((child, index) => {
    const line$ = <div data-formula={child.textContent || ''} class={classes.line}
                      _innerHTML={renderToString((child.textContent || '').trim())}/>;
    renderer.render(<span class="counter">{index + 1}</span>).on(line$);
    renderer.render(line$).on(holder);
  });

  return holder;
}


export * from './style';
export * from './post';