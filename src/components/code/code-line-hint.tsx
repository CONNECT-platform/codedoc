import { Subject, fromEvent, combineLatest } from 'rxjs';
import { map, mapTo, filter } from 'rxjs/operators';
import { funcTransport } from '@connectv/sdh/transport';
import { themedStyle, ThemedComponentThis } from '@connectv/jss-theme';
import { toggleList, rl } from '@connectv/html';

import { getRenderer } from '../../util/renderer';
import { CodedocTheme } from '../../theme';


export const HintBoxStyle = themedStyle<CodedocTheme>(theme => ({
  hintbox: {
    position: 'fixed',
    background: theme.light.background,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0, 0, 0, .12)',
    maxWidth: 256,
    fontSize: 13,
    zIndex: 100,
    padding: 8,
    transition: 'top .15s, opacity .3s',
    opacity: 0,

    'body.dark &': {
      background: theme.dark.background,
      boxShadow: '0 2px 6px rgba(0, 0, 0, .5)',
    },

    '&.active': { opacity: 1 },

    '& .icon-font': {
      verticalAlign: 'middle',
      marginRight: 8,
      transform: 'rotate(180deg)',
    },
  }
}));


export function HintBox(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: any
) {
  const classes = this.theme.classes(HintBoxStyle);
  const target$ = this.expose.in('target', new Subject<HTMLElement | undefined>());
  const active$ = target$.pipe(map(el => !!el));
  const top$ = combineLatest(
      target$.pipe(map(el => el?el.getBoundingClientRect().top:undefined)), 
      fromEvent(document, 'mousemove').pipe(map(e => (e as MouseEvent).clientY))
    ).pipe(map(([top, mouseY]) => (top || mouseY) + 24));
  const left$ = fromEvent(document, 'mousemove').pipe(map(e => (e as MouseEvent).clientX + 24));

  return <div 
      class={rl`${classes.hintbox} ${toggleList({'active': active$})}`}
      style={rl`top: ${top$}px;left: ${left$}px`}
    >
    <span class="icon-font outline">wb_incandescent</span>
    {target$.pipe(filter(el => !!el), map(el => el?.getAttribute('data-hint')))}
  </div>;
}


const commentRegex = new RegExp([
  /\/\/\s?\-\-\>\s*(.*[^\s])\s*$/,       // --> single line comments
  /\/\*\s?\-\-\>\s*(.*[^\s])\s*\*\/$/,   // --> multi line comments
  /\#\s?\-\-\>\s*(.*[^\s])\s*$/,         // --> python comments
  /\<\!\-\-\s?\>\s*(.*[^\s])\s*\-\-\>$/, // --> html comments
].map(r => `(?:${r.source})`).join('|'));


export function initHintBox() {
  window.addEventListener('load', () => {
    const renderer = getRenderer();
    const target = new Subject<HTMLElement | undefined>();
  
    renderer.render(<HintBox target={target}/>).on(document.body);

    document.querySelectorAll('pre>code>div').forEach(line$ => {
      let hint = ''; 
      let hint$: HTMLElement | undefined;
      line$.querySelectorAll('.token.comment').forEach(comment$ => {
        const match = commentRegex.exec(comment$.textContent || '');
        if (match) {
          hint = match.slice(1).find(_ => _) || hint;
          if (hint) hint$ = comment$ as HTMLElement;
        }
      });

      if (hint.length > 0 && hint$) {
        hint$.style.opacity = '.5';
        line$.setAttribute('data-hint', hint);
        fromEvent(line$, 'mouseenter').pipe(mapTo(line$ as HTMLElement)).subscribe(target);
        fromEvent(line$, 'mouseleave').pipe(mapTo(undefined)).subscribe(target);
      }
    });
  });
}


export const codeLineHints$ = funcTransport(initHintBox);