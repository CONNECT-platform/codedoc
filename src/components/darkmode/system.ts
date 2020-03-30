import { state } from '@connectv/core';

import { Mode } from './mode';


export function systemMode() {
  const mode = state(Mode.Light).bind();
  if (window.matchMedia as any) {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    if (query.matches) {
      mode.value = Mode.Dark;
    }

    query.addListener(() => {
      if (query.matches) mode.value = Mode.Dark;
      else mode.value = Mode.Light;
    });
  }

  return mode;
}
