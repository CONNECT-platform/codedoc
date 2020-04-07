import { funcTransport } from '@connectv/sdh/transport';

import { useTheme } from '../../src/util/use-theme';

import { theme } from '../theme';


export function installTheme() { useTheme(theme); }
export const installTheme$ = funcTransport(installTheme);
