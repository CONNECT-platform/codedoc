export function enableFormula(html: HTMLDocument) {
  const link = html.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css');
  link.setAttribute('integrity', 'sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq');
  link.setAttribute('crossorigin', 'anonymous');
  html.head.append(link);
}