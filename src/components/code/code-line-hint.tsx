import { Subject } from 'rxjs';
import { funcTransport } from '@connectv/sdh/transport';
import { themedStyle, ThemedComponentThis } from '@connectv/jss-theme';


import { getRenderer } from '../../util/renderer';
import { CodedocTheme } from '../../theme';


let hintBox$: HTMLElement;
let hintContent = new Subject<string>();


export const HintBoxStyle = themedStyle<CodedocTheme>(theme => ({
  hintbox: {
    position: 'fixed',
    background: theme.light.background,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0, 0, 0, .12)',
    maxWidth: 'calc(100vw - 768px - 128px)',
    fontSize: 13,
    zIndex: 100,
    padding: 8,
    transition: 'top .1s, opacity .1s',
    opacity: 0,

    'body.dark &': {
      background: theme.dark.background,
      boxShadow: '0 2px 6px rgba(0, 0, 0, .5)',
    },

    '&.active': { opacity: 1 },
  }
}));


export function HintBox(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: any
) {
  const classes = this.theme.classes(HintBoxStyle);

  return <div class={classes.hintbox}>
    <span class="icon-font outline" style="vertical-align: middle">info</span> {hintContent}
  </div>;
}


export function showHintBox(line$: HTMLElement, content: string) {
  const rect = line$.getBoundingClientRect();
  hintBox$.style.right = `${window.innerWidth - rect.left + 8}px`;
  hintBox$.style.top = `${rect.top}px`;
  hintBox$.classList.add('active');
  hintContent.next(content);
}

export function hideHintBox() {
  hintBox$.classList.remove('active');
}

export function initHintBox() {
  window.addEventListener('load', () => {
    const renderer = getRenderer();
    hintBox$ = <HintBox/>;
  
    renderer.render(hintBox$).on(document.body);

    document.querySelectorAll('pre>code>div').forEach(line$ => {
      let hint = '';
      line$.querySelectorAll('.token.comment').forEach(comment$ => {
        let mark = '';
        if (comment$.innerHTML.startsWith('// --&gt;')) mark = '// --&gt;';
        if (comment$.innerHTML.startsWith('// ...')) mark = '// ...';
        if (mark.length > 0) hint = comment$.innerHTML.substr(mark.length);
      });

      if (hint.length > 0) {
        line$.addEventListener('mouseenter', () => {
          showHintBox(line$ as HTMLElement, hint);
        });

        line$.addEventListener('mouseleave', () => {
          hideHintBox();
        })
      }
    });
  });
}


export const codeLineHints$ = funcTransport(initHintBox);