export function headingLink(heading$: Element) {
  if (heading$.getAttribute('id')) {
    return window.location.toString().split('#')[0] + '#' + heading$.getAttribute('id');
  }
}
