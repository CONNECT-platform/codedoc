import { Subject, BehaviorSubject, fromEvent, of } from 'rxjs';
import { map, filter, debounceTime, mergeMap, switchMap, delay, tap, sample, startWith } from 'rxjs/operators';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { rl, toggleList, ref } from '@connectv/html';

import { CodedocTheme } from '../../../theme';
import { RefBoxStyle } from './style';
import { getConfig } from '../../../transport/config';


export function RefBox(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: any,
) {
  const classes = this.theme.classes(RefBoxStyle);
  const target$ = this.expose.in('target', new Subject<HTMLElement | undefined>());
  const latest$ = new BehaviorSubject<HTMLElement | undefined>(undefined);

  target$.pipe(filter(el => !!el)).subscribe(latest$);

  const box = ref<HTMLElement>();

  const active$ = target$.pipe(debounceTime(10), map(el => !!el));
  let hover = false;
  const top$ = target$.pipe(
      switchMap(el => el ? of(el) : of(el).pipe(delay(300))),
      filter(() => !hover),
      mergeMap(el => el ?
        of(el.getBoundingClientRect().top + 18) :
        of(-1000)
      )
    );

  const left$ = fromEvent(document, 'mousemove').pipe(
    filter(() => !hover),
    map(e => (e as MouseEvent).clientX + 12),
    sample(active$.pipe(filter(_ => _))),
  );

  const link$ = target$.pipe(
    filter(el => !!el),
    map(el => el?.getAttribute('data-ref') || ''),
    map(l => {
      if (l.startsWith('/')) {
        const conf = getConfig();
        if (conf) return conf.namespace + l;
      }

      return l;
    })
  );

  const text$ = target$.pipe(
    filter(el => !!el),
    map(el => {
      if (el?.hasAttribute('data-ref-text')) return el.getAttribute('data-ref-text') || '';
      else {
        const _text = el?.getAttribute('data-ref') || '';
        if (_text.startsWith('tab:')) return _text.substr(4);
        else return _text;
      }
    })
  );

  return <div _ref={box}
      class={rl`${classes.refbox} ${toggleList({active: active$.pipe(startWith(false))})}`}
      style={rl`top: ${top$}px;left: ${left$}px`}
      onmouseenter={() => hover = true}
      onmouseleave={() => { hover = false; target$.next(undefined); }}
      onclick={event => {
        let ref = latest$.value?.getAttribute('data-ref');

        if (ref?.startsWith('tab:')) {
          ref = ref.substr(4);
          let tab$ = latest$.value;
          while(tab$ && !tab$?.hasAttribute('data-tab-id')) tab$ = tab$?.parentElement || undefined;

          if (tab$) {
            const btn$ = tab$.parentElement?.querySelector(
              `.selector>button[data-tab-id="${ref}"]`);
            if (btn$) {
              (btn$ as HTMLButtonElement).click();
              event.stopPropagation();
              event.preventDefault();
            }
          }
        }

        hover = false;
        target$.next(undefined);
        box.$.style.top = '-1000px';
      }}
    >
    <span class="icon-font">touch_app</span>
    <a href={link$} target="_blank">See {text$}</a>
  </div>;
}

export { RefBoxStyle } from './style';