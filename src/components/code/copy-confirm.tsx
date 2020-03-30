import { getRenderer } from '../../util/renderer';
import { Overlay } from '../overlay';


export function copyConfirm(...lines: HTMLElement[]) {
  const renderer = getRenderer();

  if (lines.length > 0) {
    const code$ = lines[0].parentElement?.cloneNode(false) as HTMLElement;
    code$.classList.remove('has-selection');
    code$.style.width = '75vw';
    code$.style.maxWidth = '768px';
    code$.style.maxHeight = '50vh';
    code$.style.overflow = 'auto';

    lines.forEach(line$ => {
      const copy$ = line$.cloneNode(true) as HTMLElement;
      copy$.classList.remove('selected');
      renderer.render(<fragment>{copy$}<br/></fragment>).on(code$);
    })

    renderer.render(<Overlay>
      Copied to Clipboard!
      <div style='font-size: 12px;text-align: left'>
        <pre>{code$}</pre>
      </div>
    </Overlay>).on(document.body);
  }
}
