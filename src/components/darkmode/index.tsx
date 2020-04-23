import { transport } from '@connectv/sdh/transport';
import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { state, sink } from '@connectv/core';

import { CodedocTheme } from '../../theme';
import { DarkModeSwitchStyle } from './style';
import { switchMode, Mode } from './mode';
import { systemMode } from './system';


export function DarkModeSwitch(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: RendererLike<any, any>,
) {
  const classes = this.theme.classes(DarkModeSwitchStyle);
  const sysMode = systemMode();
  const runningMode = state();
  let storageLoaded = false;

  sysMode.to(runningMode);

  this.track(runningMode.to(sink(mode => {
    if (mode === Mode.Light) document.body.classList.remove('dark');
    else document.body.classList.add('dark');

    if (storageLoaded) {
      if (mode !== sysMode.value) localStorage.setItem('dark-mode', (mode === Mode.Light) ? 'false' : 'true');
      else localStorage.removeItem('dark-mode');
    }
  })));

  this.track({
    bind() {
      if (localStorage.getItem('dark-mode'))
        runningMode.value = localStorage.getItem('dark-mode') === 'true' ? Mode.Dark : Mode.Light;

      document.body.classList.add('dark-mode-animate');
      storageLoaded = true;
    }
  });

  return <div class={classes.dmSwitch} onclick={() => runningMode.value = switchMode(runningMode.value)}>
    <div class="arc"/>
    <div class="darc"/>
    <div class="ray one"/>
    <div class="ray two"/>
    <div class="ray three"/>
    <div class="ray four"/>
    <div class="ray five"/>
    <div class="ray six"/>
    <div class="ray seven"/>
    <div class="ray eight"/>
  </div>
}


export const DarkModeSwitch$ = /*#__PURE__*/transport(DarkModeSwitch);
export * from './darklight';
export { DarkModeSwitchStyle } from './style';