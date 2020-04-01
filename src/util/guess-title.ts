export function guessTitle(content: HTMLElement, base?: string, connector: string = ' | ') {
  if (content.firstChild && content.firstChild instanceof HTMLHeadingElement) {
    const target = content.firstChild;
    let text = '';
    if (target.childElementCount > 0) {
      target.querySelectorAll(':not(.icon-font)').forEach(e$ => text += e$.textContent + '');
    }
    else text = content.firstChild.textContent || '';

    text = text.trim();
    if (base) {
      if (text.length > 0) return base + connector + text;
      else return base;
    }
    else return text;
  }

  return '';
}
