import jss from 'jss';
import preset from 'jss-preset-default';
import { funcTransport } from '@connectv/sdh/transport';


export function initJss() { jss.setup(preset()); }
export const initJss$ = funcTransport(initJss);
