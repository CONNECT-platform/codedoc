import { RendererLike, ComponentThis, ref } from '@connectv/html';
import { funcTransport } from '@connectv/sdh/transport';

import { StatusCheckURL, StatusBuildingResponse, StatusReadyResponse } from './config';
import { getRenderer } from '../util/renderer';


export function Toast(this: ComponentThis, _: any, renderer: RendererLike<any, any>) {
  const holder = ref<HTMLElement>();
  this.track({
    bind() {
      setTimeout(() => holder.$.style.transform = '', 10);
    }
  });

  return <div _ref={holder} style={`
    position: fixed;
    bottom: 32px; right: 32px;
    z-index: 10000;
    background: rgba(0, 0, 0, .35);
    color: white;
    padding: 24px;
    border-radius: 8px;
    transform: translateY(200px);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    transition: transform .3s;
  `}>Rebuilding documents ...</div>;
}


export function reloadOnChange() {
  let building = false;
  const renderer = getRenderer();

  const buildingMode = () => {
    if (!building) {
      building = true;
      renderer.render(<Toast/>).on(document.body);
    }
  }

  setInterval(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', StatusCheckURL);
    xhr.onload = () => {
      if (xhr.responseText === StatusBuildingResponse) buildingMode();
      else if (xhr.responseText === StatusReadyResponse && building) {
        location.reload();
      }
    };
    xhr.onerror = buildingMode;
    xhr.ontimeout = buildingMode;
    xhr.timeout = 200;
    xhr.send();
  }, 500);
}


export const reloadOnChange$ = funcTransport(reloadOnChange);
