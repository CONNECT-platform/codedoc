export const DefaultHighlightMark = '/*!*/';
export const AddHighlightMark = '/*+*/';
export const RemoveHighlightMark = '/*-*/';


export function parse(code: string): [string, string[], string[]] {
  const lines = code.split('\n');
  const highlights: string[] = [];
  const linesParsed = lines.map((line, index) => {
    if (line.startsWith(DefaultHighlightMark)) {
      highlights[index] = 'highlight';
      return line.substr(DefaultHighlightMark.length);
    }
    else if (line.startsWith(AddHighlightMark)) {
      highlights[index] = 'added';
      return line.substr(AddHighlightMark.length);
    }
    else if (line.startsWith(RemoveHighlightMark)) {
      highlights[index] = 'removed';
      return line.substr(RemoveHighlightMark.length);
    }
    else {
      highlights[index] = '';
      return line;
    }
  });
  const codeParsed = linesParsed.join('\n');

  return [codeParsed, linesParsed, highlights];
}
