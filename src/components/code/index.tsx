import { ExtensibleRenderer } from '@connectv/html';
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

  let lang = options.lang;
  loadLanguages([lang]);

  const code$ = <code class={`${lang}`} tabindex="0"/>;
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

  return <pre>{code$}</pre>
}
