import { Subject, fromEvent, combineLatest } from 'rxjs';
import { map, filter, startWith } from 'rxjs/operators';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { toggleList, rl } from '@connectv/html';

import { CodedocTheme } from '../../../theme';
import { HintBoxStyle } from './style'; 


export function HintBox(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: any
) {
  const classes = this.theme.classes(HintBoxStyle);
  const target$ = this.expose.in('target', new Subject<HTMLElement | undefined>());
  const active$ = target$.pipe(map(el => !!el));
  const top$ = combineLatest(
      target$
        .pipe(
          map(el => el ? el.getBoundingClientRect().top : undefined)
        ), 
      fromEvent(document, 'mousemove')
        .pipe(
          map(e => (e as MouseEvent).clientY)
        )
    ).pipe(
      map(([top, mouseY]) => (top || mouseY) + 24)
    );
  const left$ = fromEvent(document, 'mousemove').pipe(map(e => (e as MouseEvent).clientX + 24));

  return <div 
      class={rl`${classes.hintbox} ${toggleList({'active': active$.pipe(startWith(false))})}`}
      style={rl`top: ${top$}px;left: ${left$}px`}
    >
    <span class="icon-font outline">wb_incandescent</span>
    {target$.pipe(filter(el => !!el), map(el => el?.getAttribute('data-hint')))}
  </div>;
}

export { HintBoxStyle } from './style'; 