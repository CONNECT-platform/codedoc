import { highlight, languages } from 'prismjs';
const loadLanguages = require('prismjs/components/');
import { ExtensibleRenderer } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';
import { CodeStyle } from './style';


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

  const code = <code class={`${lang}`} />;
  const lines = content[0].split('\n');
  const highlines = highlight(content[0], languages[lang], lang).split('\n');

  lines.forEach((line, index) => {
    let highline = highlines[index];
    index = index + 1;

    let counter;
    if (index === 1 || index === lines.length || index % 5 === 0)
      counter = <span class={`${classes.lineCounter} prim`}>{index}</span>;
    else counter = <span class={classes.lineCounter}>{index}</span>;

    let highlighted = false;
    const lmarker = '/*!*/';
    const marker = `<span class="token comment">${lmarker}</span>`;
    if (highline.startsWith(marker)) {
      highline = highline.substr(marker.length);
      line = line.substr(lmarker.length);
      highlighted = true;
    } else if (highline.startsWith(lmarker)) {
      highline = highline.substr(lmarker.length);
      line = line.substr(lmarker.length);
      highlighted = true;
    }

    const line$ = <div class={`${classes.line} ${highlighted?'highlight':''}`} 
                      data-content={line}
                      _innerHTML={highline}/>;

    if (line$.firstChild)
      renderer.render(counter).before(line$.firstChild as ChildNode);
    else renderer.render(counter).on(line$);

    renderer.render(line$).on(code);
    renderer.render(<br/>).on(code);
  });

  return <pre>{code}</pre>
}
