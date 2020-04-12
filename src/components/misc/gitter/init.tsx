import { state, State } from '@connectv/core';

import { getRenderer } from '../../../transport/renderer';
import { GitterHolder } from './holder';


export function initGitter(room: string) {
  if (!(window as any).gitter) {
    const renderer = getRenderer();
    const _state = state(false);
    const host$ = <GitterHolder state={_state} room={room}/>;

    (((window as any).gitter = {} as any).chat = {} as any).options = {
      room,
      activationElement: false,
      targetElement: host$,
    };

    (window as any).gitterState = _state;
    _state.subscribe(open => gitterInstance()?.toggleChat(open));

    renderer.render(host$).on(document.body);
    renderer.render(<script src="https://sidecar.gitter.im/dist/sidecar.v1.js" async defer/>).on(document.head);
  }
}


export function gitterInstance() {
  return (window as any).gitter.chat?.defaultChat;
}


export function gitterState(): State | undefined {
  if (gitterInstance()) return (window as any).gitterState;
}
