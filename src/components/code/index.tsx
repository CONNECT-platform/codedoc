import { highlight } from 'highlight.js';
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
  if (lang === 'tsx') lang = 'typescript';

  const code = <code class={`${lang} hljs`} />;
  const lines = content[0].split('\n');

  lines.forEach((line, index) => {;
    index = index + 1;

    let counter;
    if (index === 1 || index === lines.length || index % 5 === 0)
      counter = <span class={`${classes.lineCounter} prim`}>{index}</span>;
    else counter = <span class={classes.lineCounter}>{index}</span>;

    let lineHl = false;
    if (line.startsWith('/*!*/')) {
      line = line.substr(5);
      lineHl = true;
    }

    let highlighted = highlight(lang, line).value;
    if (lang === 'js' || lang === 'javascript' || lang === 'jsx' || 
        lang === 'ts' || lang === 'typescript' || lang === 'tsx') {
      highlighted = highlighted.replace(/=\&gt\;/g, '<span class="hljs-funcarrow">=&gt;</span>');
    }

    //
    // TODO: move these codes to bundled client-side codes instead of here.
    //
    const line$ = <div 
      class={`${classes.line} ${lineHl?'highlight':''}`}
      onmouseenter="if (event.which == 1) this.classList.toggle('selected');"
      onmousedown={`
        if (!event.shiftKey) {
          for (var i = 0; i < this.parentElement.children.length; i++) {
            var child = this.parentElement.children.item(i);
            if (child != this) child.classList.remove('selected');
          }
        }

        this.classList.toggle('selected');
      `}
      onclick={`if (!event.shiftKey) this.classList.remove('selected');`}
      _innerHTML={highlighted}
    />;
    if (line$.firstChild)
      renderer.render(counter).before(line$.firstChild as ChildNode);
    else renderer.render(counter).on(line$);

    renderer.render(line$).on(code);
    renderer.render(<br/>).on(code);
  });

  return <pre>{code}</pre>
}
