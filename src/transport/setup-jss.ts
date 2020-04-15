import jss from 'jss';
import preset from 'jss-preset-default';
import { funcTransport } from '@connectv/sdh/transport';


export function initJss() { jss.setup(preset()); }
export function initJssCs() {
  initJss();
  jss.setup({
    createGenerateId: () => {
      let count = 0;
      return rule => `cs--${rule.key}-${count++}`;
    }
  })
}
export const initJss$ = /*#__PURE__*/funcTransport(initJssCs);
