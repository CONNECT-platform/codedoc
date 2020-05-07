import { RendererLike, ref } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../theme';
import { ToCPrevNextStyle } from './style';


export interface ToCPrevNextOptions {
  'prev-label'?: string;
  'prev-icon'?: string;
  'next-label'?: string;
  'next-icon'?: string;
  next?: 'true' | 'false',
  prev?: 'true' | 'false',
}


export function ToCPrevNext(
  this: ThemedComponentThis<CodedocTheme>,
  options: ToCPrevNextOptions, 
  renderer: RendererLike<any, any>,
) {
  const classes = this.theme.classes(ToCPrevNextStyle);
  const holder = ref<HTMLElement>();

  this.track({
    bind() {
      setTimeout(() => {
        const toc = document.getElementById('-codedoc-toc');
        if (toc) {
          let prev$: HTMLAnchorElement | undefined;
          let curr$: HTMLAnchorElement | undefined;
          let next$: HTMLAnchorElement | undefined;

          toc.querySelectorAll('a').forEach(a$ => {
            const href = a$.getAttribute('href') || '';
            if (href === location.pathname && !curr$) curr$ = a$;
            else if (curr$ && href.startsWith('/') && !next$) next$ = a$;
            else if (!curr$ && href.startsWith('/')) prev$ = a$;
          });

          if (prev$ && options.prev !== 'false') {
            renderer.render(<a class={`${classes.button} prev`} href={prev$.getAttribute('href') || ''}>
              <div>
                <span class={classes.label}>{options['prev-label'] || 'Previous'}</span>
                <span class={classes.title}>{prev$.textContent}</span>
              </div>
              <span class="icon-font">{options["prev-icon"] || 'arrow_back_ios'}</span>
            </a>).on(holder.$);
          }

          if (next$ && options.next !== 'false') {
            renderer.render(<a class={`${classes.button} next`} href={next$.getAttribute('href') || ''}>
              <div>
                <span class={classes.label}>{options['next-label'] || 'Next'}</span>
                <span class={classes.title}>{next$.textContent}</span>
              </div>
              <span class="icon-font">{options["next-icon"] || 'arrow_forward_ios'}</span>
            </a>).on(holder.$);
          }
        }
      }, 10);
    }
  });

  return <div class={classes.prevnext} _ref={holder}/>
}


export const ToCPrevNext$ = /*#__PURE__*/transport(ToCPrevNext);
export { ToCPrevNextStyle } from './style';