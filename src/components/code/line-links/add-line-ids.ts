export function addLineIds(html: HTMLDocument) {
  html.querySelectorAll('code.-codedoc-code-snippet').forEach((snippet, index) => {
    snippet.querySelectorAll('.-codedoc-code-line').forEach((line$, number) => {
      (line$ as HTMLElement).setAttribute('id', `code${index+1}-l${number+1}`);
    });
  });
}
