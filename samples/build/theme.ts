import { funcTransport } from '@connectv/sdh/transport';

import { useTheme } from '../../src/transport/use-theme';

import { theme } from '../theme';


export function installTheme() { useTheme(theme); }
export const installTheme$ = /*#__PURE__*/funcTransport(installTheme);
