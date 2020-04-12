export function guessTitle(content: HTMLElement, base?: string, connector: string = ' | ') {
  for (let i = 0; i < content.children.length; i++) {
    const target$ = content.children.item(i);

    if (target$ instanceof HTMLHeadingElement) {
      let text = '';
      if (target$.childElementCount > 0) {
        target$.querySelectorAll(':not(.icon-font)').forEach(e$ => text += e$.textContent + '');
      }
      else text = target$.textContent || '';

      text = text.trim();
      if (base) {
        if (text.length > 0) return base + connector + text;
        else return base;
      }
      else return text;
    }

    if (!target$?.textContent || target$.textContent.trim().length === 0) continue;

    return '';
  }

  return '';
}
