import { funcTransport } from '@connectv/sdh/transport';

import { useTheme } from '../../src/util/use-theme';

import { config } from '../config';


export function installTheme() { useTheme(config.theme); }
export const installTheme$ = funcTransport(installTheme);
