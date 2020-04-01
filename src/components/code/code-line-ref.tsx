import { Subject, BehaviorSubject, fromEvent, of } from 'rxjs';
import { map, filter, mapTo, debounceTime, mergeMap, delay, tap, sample } from 'rxjs/operators';
import { funcTransport } from '@connectv/sdh/transport';
import { themedStyle, ThemedComponentThis } from '@connectv/jss-theme';
import { rl, toggleList, ref } from '@connectv/html';

import { CodedocTheme } from '../../theme';
import { getRenderer } from '../../util/renderer';


export const RefBoxStyle = themedStyle<CodedocTheme>(theme => ({
  refbox: {
    position: 'fixed',
    cursor: 'pointer',
    background: theme.light.background,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0, 0, 0, .12)',
    maxWidth: 256,
    fontSize: 13,
    zIndex: 100,
    padding: 8,
    transition: 'opacity .15s',
    opacity: 0,

    'body.dark &': {
      background: theme.dark.background,
      boxShadow: '0 2px 6px rgba(0, 0, 0, .5)',
    },

    '&.active, &:hover:not(.vanishing)': { opacity: 1 },

    '& .icon-font': {
      verticalAlign: 'middle',
      marginRight: 8,
    },
  }
}));


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

  const active$ = target$.pipe(debounceTime(300), map(el => !!el));
  const vanishing$ = new BehaviorSubject<boolean>(false);
  let hover = false;
  const top$ = target$.pipe(
      debounceTime(300),
      filter(() => !hover),
      mergeMap(el => el ?
        of(el.getBoundingClientRect().top + 24) :
        of(-1000).pipe(
          tap(() => vanishing$.next(true)),
          delay(150),
          tap(() => vanishing$.next(false)),
        )
      )
    );

  const left$ = fromEvent(document, 'mousemove').pipe(
    debounceTime(50),
    filter(() => !hover && !vanishing$.value),
    map(e => (e as MouseEvent).clientX - 64),
    sample(active$.pipe(filter(_ => _))),
  );

  return <div _ref={box}
      class={rl`${classes.refbox} ${toggleList({active: active$, vanishing: vanishing$})}`}
      style={rl`top: ${top$}px;left: ${left$}px`}
      onmouseenter={() => hover = true}
      onmouseleave={() => { hover = false; target$.next(undefined); }}
      onclick={() => {
        let tab$ = latest$.value;
        while(tab$ && !tab$?.hasAttribute('data-tab-title')) tab$ = tab$?.parentElement || undefined;

        if (tab$) {
          const btn$ = tab$.parentElement?.querySelector(
            `.selector button[data-tab-title="${latest$.value?.getAttribute('data-ref')}"]`);
          if (btn$) {
            (btn$ as HTMLButtonElement).click();
            hover = false;
            target$.next(undefined);
            box.$.style.top = '-1000px';
          }
        }
      }}
    >
    <span class="icon-font">touch_app</span>
    <a>See {target$.pipe(filter(el => !!el), map(el => el?.getAttribute('data-ref')))}</a>
  </div>;
}


const commentRegex = new RegExp([
  /\/\/\s?\@see\s(.*[^\s])\s*$/,             // --> single line comments
  /\/\*\s?\@see\s(.*[^\s])\s*\*\/$/,         // --> multi line comments
  /\#\@see\s(.*[^\s])\s*$/,                  // --> python comments
  /\<\!\-\-\s?\@see\s(.*[^\s])\s*\-\-\>$/,   // --> html comments
].map(r => `(?:${r.source})`).join('|'));


export function initCodeLineRef() {
  window.addEventListener('load', () => {
    const renderer = getRenderer();
    const target = new Subject<HTMLElement | undefined>();
  
    renderer.render(<RefBox target={target}/>).on(document.body);

    document.querySelectorAll('[data-tab-title] pre>code>div').forEach(line$ => {
      let ref = '';
      let ref$: HTMLElement | undefined;

      line$.querySelectorAll('.token.comment').forEach(comment$ => {
        const match = commentRegex.exec(comment$.textContent || '');
        if (match) {
          ref = match.slice(1).find(_ => _) || ref;
          if (ref) ref$ = comment$ as HTMLElement;
        }
      });

      if (ref.length > 0 && ref$) {
        ref$.style.opacity = '.5';
        line$.setAttribute('data-ref', ref);
        fromEvent(line$, 'mouseenter').pipe(mapTo(line$ as HTMLElement)).subscribe(target);
        fromEvent(line$, 'mouseleave').pipe(mapTo(undefined)).subscribe(target);
      }
    });
  });
}

export const codeLineRef$ = funcTransport(initCodeLineRef);
