export const DefaultHighlightMark = '/*!*/';


export function parse(code: string, highlightMark = DefaultHighlightMark): [string, string[], boolean[]] {
  const lines = code.split('\n');
  const highlights: boolean[] = [];
  const linesParsed = lines.map((line, index) => {
    if (line.startsWith(highlightMark)) {
      highlights[index] = true;
      return line.substr(highlightMark.length);
    }
    else {
      highlights[index] = false;
      return line;
    }
  });
  const codeParsed = linesParsed.join('\n');

  return [codeParsed, linesParsed, highlights];
}
