import { funcTransport } from '@connectv/sdh/transport';

import { createTheme } from '../src/theme'
import { useTheme } from '../src/util/use-theme';


export const Theme = createTheme({
  light: {
    background: '#f5f5f5',
    text: '#424242'
  }
});


export function installTheme() { useTheme(Theme); }
export const installTheme$ = funcTransport(installTheme);
