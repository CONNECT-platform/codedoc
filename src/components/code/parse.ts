export const DefaultHighlightMark = '/*!*/';
export const AddHighlightMark = '/*+*/';
export const RemoveHighlightMark = '/*-*/';
export const OutputMark = '>';


export function parse(code: string, term = false): [string, string[], string[], {[l: number]: string[]}] {
  const lines = code.split('\n');
  const highlights: string[] = [];
  const linesParsed: string[] = [];
  const outputs: {[l: number]: string[]} = {};
  lines.forEach((line) => {
    const index = linesParsed.length;
    if (line.startsWith(OutputMark) && term) {
      (outputs[index - 1] || (outputs[index - 1] = [])).push(line.substr(OutputMark.length));
    } else {
      if (line.startsWith(DefaultHighlightMark)) {
        highlights[index] = 'highlight';
        linesParsed.push(line.substr(DefaultHighlightMark.length));
      } else if (line.startsWith(AddHighlightMark)) {
        highlights[index] = 'added';
        linesParsed.push(line.substr(AddHighlightMark.length));
      } else if (line.startsWith(RemoveHighlightMark)) {
        highlights[index] = 'removed';
        linesParsed.push(line.substr(RemoveHighlightMark.length));
      } else {
        highlights[index] = '';
        linesParsed.push(line);
      }
    }
  });

  const codeParsed = linesParsed.join('\n');

  return [codeParsed, linesParsed, highlights, outputs];
}
