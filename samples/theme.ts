import { funcTransport } from '@connectv/sdh/transport';

import { createTheme } from '../src/theme'


export const Theme = createTheme({
  light: {
    background: '#f5f5f5',
    text: '#424242'
  }
});


export function installTheme() { (window as any).theme = Theme; }
export const installTheme$ = funcTransport(installTheme);
