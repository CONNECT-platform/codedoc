export function lineLink(line$: HTMLElement) {
  if (line$.getAttribute('id')) {
    if (line$.classList.contains('selected')) {
      const ranges: [number, number][] = [];
      let current: [number, number] | undefined = undefined;
      line$.parentElement?.querySelectorAll('.-codedoc-code-line').forEach((line$, index) => {
        if (line$.classList.contains('selected')) {
          if (!current) {
            current = [index, index];
          } else {
            current[1] = index;
          }
        } else {
          if (current) {
            ranges.push(current);
            current = undefined;
          }
        }
      });

      if (current) {
        ranges.push(current);
        current = undefined;
      }

      return window.location.toString().split('#')[0] + '#' 
          + line$.getAttribute('id')?.split('-')[0] + '-'
          + ranges.map(range => range[0] === range[1] ? `l${range[0]+1}` : `l${range[0]+1}:l${range[1]+1}`).join('-');
    }
    else return window.location.toString().split('#')[0] + '#' + line$.getAttribute('id');
  }
}

export function linkedLines() {
  const segment = window.location.toString().split('#')[1];
  if (segment && segment.startsWith('code')) {
    const parts = segment.split('-');
    const lines: HTMLElement[] = [];
    parts.slice(1).forEach(part => {
      const range = part.split(':').map(tag => parseInt(tag.substr(1)));
      if (range.length === 2) {
        for (let i = range[0]; i <= range[1]; i++) {
          const candidate = document.querySelector(`#${parts[0]}-l${i}`);
          if (candidate) lines.push(candidate as HTMLElement);
        }
      } else {
        const candidate = document.querySelector(`#${parts[0]}-l${range[0]}`);
        if (candidate) lines.push(candidate as HTMLElement);
      }
    });

    return lines;
  }

  return [];
}
