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
    let formula = '';
    if (child instanceof HTMLPreElement && child.querySelector('[data-content]')) {
      child.querySelectorAll('[data-content]').forEach(l$ => {
        formula += l$.getAttribute('data-content');
      });
    }
    else formula = child.textContent || '';

    formula = formula.trim();
    const line$ = <div data-formula={formula} class={classes.line}
                      _innerHTML={renderToString(formula)}/>;
    renderer.render(<span class="counter">{index + 1}</span>).on(line$);
    renderer.render(line$).on(holder);
  });

  return holder;
}

