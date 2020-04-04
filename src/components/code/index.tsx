import { ExtensibleRenderer, toggleList } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { highlight, languages } from 'prismjs';
const loadLanguages = require('prismjs/components/');

import { CodedocTheme } from '../../theme';
import { CodeStyle } from './style';
import { parse } from './parse';


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

  let [lang, ...extras] = options.lang.split('|').map(_ => _.trim());
  loadLanguages([lang]);

  const extopts = { wmbar: undefined as (undefined | boolean), filename: undefined as (undefined | string) };
  extras.forEach(ext => {
    if (ext === '--wmbar') extopts.wmbar = true;
    else if (ext == '--no-wmbar') extopts.wmbar = false;
    else {
      extopts.filename = ext;
      extopts.wmbar = true;
    }
  });

  const code$ = <code class={`${lang}`} tabindex="0">
    <span class={classes.wmbar}><span/><span/><span/><span>{extopts.filename || ''}</span></span>
  </code>;
  const [code, lines, highlights] = parse(content[0]);

  const highlines = highlight(code, languages[lang], lang).split('\n');

  lines.forEach((line, index) => {
    const highline = highlines[index];
    const counter = index + 1;

    let counter$;
    if (counter === 1 || counter === lines.length || counter % 5 === 0)
      counter$ = <span class={`${classes.lineCounter} prim`}>{counter}</span>;
    else counter$ = <span class={classes.lineCounter}>{counter}</span>;

    const highlighted = highlights[index];
    const line$ = <div class={`${classes.line} ${highlighted?'highlight':''}`} 
                      data-content={line}
                      _innerHTML={highline}/>;

    if (line$.firstChild)
      renderer.render(counter$).before(line$.firstChild as ChildNode);
    else renderer.render(counter$).on(line$);

    renderer.render(line$).on(code$);
    renderer.render(<br/>).on(code$);
  });

  const wmbar = lines.length > 1 && (this.theme.theme.code.wmbar || extopts.wmbar) && extopts.wmbar !== false;
  return <pre class={wmbar ? 'with-bar' : ''}>{code$}</pre>
}
