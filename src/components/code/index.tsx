import chalk from 'chalk';

import { ExtensibleRenderer } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { highlight, languages } from 'prismjs';
const loadLanguages = /*#__PURE__*/require('prismjs/components/');

import { CodedocTheme } from '../../theme';
import { CodeStyle } from './style';
import { parse } from './parse';
import { Icon } from '../misc';
import { underlineMarkerType, UnderlineMarkerType } from './underline';
import { terminalOutput } from './term-output';


export interface CodeOptions {
  lang: string;
}


export function Code(
  this: ThemedComponentThis<CodedocTheme>, 
  options: CodeOptions, 
  renderer: ExtensibleRenderer, 
  content: string[]
) {
  renderer = renderer.plug(this.theme.styled(CodeStyle));
  const classes = this.theme.classes(CodeStyle);
  const extopts = { wmbar: undefined as (undefined | boolean), filename: undefined as (undefined | string) };
  let lang: string | undefined = undefined;
  let safeHighlight = false;
  let term: string | undefined = undefined;
  let extras: string[];

  if (options.lang) {
    [lang, ...extras] = options.lang.split('|').map(_ => _.trim());
    if (lang === 'bash') term = '$';

    extras.forEach(ext => {
      if (ext === '--wmbar') extopts.wmbar = true;
      else if (ext === '--no-wmbar') extopts.wmbar = false;
      else if (ext === '--safe-highlight') safeHighlight = true;
      else if (ext.startsWith('--term')) {
        term = ext.split(' ').slice(1).join(' ') || '$';
      } else if (ext === '--no-term') {
        term = undefined;
      } else {
        extopts.filename = ext;
        extopts.wmbar = true;
      }
    });
  }

  if (lang) {
    if (!(lang in languages)) {
      try {
        loadLanguages([lang]);
      } catch(_) {}
      finally {
        if (!(lang in languages)) {
          if (safeHighlight) lang = undefined;
          else throw new Error(``
            + chalk`\n{redBright #}`
            + chalk`\n{redBright # Unrecognized Language::} ${lang}`
            + chalk`\n{redBright #} Check https://prismjs.com/#supported-languages for a list of supported languages.`
            + chalk`\n{redBright #}`
            + chalk`\n{redBright #} You can also add --safe-highlight flag to snippets with unsupported langauges.`
            + chalk`\n{redBright #} Check https://codedoc.cc/docs/code/overview#unsupported-languages for details.`
            + chalk`\n{redBright #}`
          );
        }
      }
    }
  }

  const code$ = <code class={`${lang} -codedoc-code-snippet`} tabindex="0">
    <span class={classes.wmbar}><span/><span/><span/><span>{extopts.filename || ''}</span></span>
  </code>;
  const [code, lines, highlights, outputs] = parse(content[0], !!term);

  const highlines = lang ? highlight(code, languages[lang], lang).split('\n') : code.split('\n');
  let waving: UnderlineMarkerType = 'none';

  lines.forEach((line, index) => {
    const highline = highlines[index];
    const counter = index + 1;

    let counter$;
    if (counter === 1 || counter === lines.length || counter % 5 === 0)
      counter$ = <span class={`${classes.lineCounter} prim -codedoc-line-counter`}>{counter}</span>;
    else counter$ = <span class={`${classes.lineCounter} -codedoc-line-counter`}>{counter}</span>;

    renderer.render(<span class="-codedoc-line-link"><Icon>link</Icon></span>).on(counter$);

    const highlighted = highlights[index];
    const line$ = <div class={`${classes.line} ${highlighted} -codedoc-code-line`} 
                      data-content={line}
                      _innerHTML={highline}/>;

    line$.childNodes.forEach(child => {
      if (child instanceof HTMLElement && child.classList.contains('comment')) {
        const _waving = underlineMarkerType(child.textContent || '');
        if (_waving === 'error' || _waving === 'warning') {
          if (_waving === waving) waving = 'none';
          else waving = _waving;

          child.hidden = true;
        }
        return;
      }

      if (waving !== 'none') {
        let target: HTMLElement = child as any;
        if (!(target instanceof HTMLElement)) {
          target = <span>{child.textContent}</span>;
          child.replaceWith(target);
        }

        target.classList.add(waving);
        renderer.render(<span class="wave">{target.textContent?.replace(/./g, '~')}</span>).on(target);
      }
    });

    if (line$.firstChild)
      renderer.render(counter$).before(line$.firstChild as ChildNode);
    else renderer.render(counter$).on(line$);

    if (!!term) {
      renderer.render(<span class={`${classes.termPrefix} -codedoc-code-term-prefix`}>{term}</span>).after(counter$);
    }

    renderer.render(line$).on(code$);
    renderer.render(<br/>).on(code$);

    if (!!term && outputs[index]) {
      renderer.render(
        <span class={`${classes.termOutput} -codedoc-code-term-output`}
          _innerHTML={terminalOutput(...outputs[index])}
        />
      ).on(code$);
    }
  });

  const wmbar = lines.length > 1 && (this.theme.theme.code.wmbar || extopts.wmbar) && extopts.wmbar !== false;
  return <pre class={wmbar ? 'with-bar' : ''}>{code$}</pre>
}


export { CodeStyle } from './style';