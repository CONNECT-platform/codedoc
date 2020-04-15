import { getRenderer } from './renderer';

const select = /*#__PURE__*/require('select');


export function copyToClipboard(text: string, callback?: () => void) {
  const renderer = getRenderer();
  const el$ = <textarea readonly style='position: fixed; top: -1000vw;'>{text}</textarea>;

  renderer.render(el$).on(document.body);

  select(el$);
  document.execCommand('copy');

  el$.remove();
  if (callback) callback();
}
