import { RendererLike, ComponentThis, ref } from '@connectv/html';
import { interval, of, merge } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { webSocket } from 'rxjs/webSocket';
import { switchMap, catchError, map } from 'rxjs/operators';
import { funcTransport } from '@connectv/sdh/transport';
import { default as AnsiUp } from 'ansi_up';

import { StatusCheckURL, StatusBuildingResponse, StatusReadyResponse, StatusErrorResponse } from './config';
import { getRenderer } from '../transport/renderer';
import { Loading } from '../components/util/loading';
import { Overlay } from '../components/util/overlay';


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
    background: rgba(64, 64, 64, .65);
    color: white;
    padding: 24px;
    border-radius: 8px;
    transform: translateY(200px);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: transform .3s;
  `}>
   <Loading/>  &ensp;Rebuilding documents ...
  </div>;
}


export function reloadOnChange() {
  let building = false;
  let error = false;
  let errorMsg: string;
  const renderer = getRenderer();
  let toast: HTMLElement;
  let overlay: HTMLElement;
  const ansiUp = new AnsiUp();

  const buildingMode = () => {
    if (!building) {
      building = true;
      error = false;
      errorMsg = '';
      if (toast) toast.remove();
      if (overlay) overlay.remove();
      toast = renderer.render(<Toast/>).on(document.body);
    }
  }

  const showError = (err: string) => {
    console.log(error);
    if (!error || errorMsg !== err) {
      error = true;
      errorMsg = err;
      building = false;
      if (toast) toast.remove();
      if (overlay) overlay.remove();
      const html = ansiUp.ansi_to_html(errorMsg)
                          .replace(
                            /(https:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/igm, 
                            '<a href="$1" target="_blank" style="color: #40a8c4 !important">$1</a>'
                          );
      overlay = renderer.render(<Overlay sticky={true}>
        <pre 
          style="text-align: left; font-size: 14px; background: rgba(0, 0, 0, .35); padding: 8px; border-radius: 8px;" 
          _innerHTML={html}/>
      </Overlay>).on(document.body);
    }
  }

  merge(
    webSocket({
       url: (window.location.protocol === 'https') ? 'wss://' : 'ws://'
            + window.location.host
            + StatusCheckURL,
        closeObserver: { next: () => buildingMode() }
    }).pipe(catchError(() => of())),
    interval(500).pipe(
      switchMap(() => ajax({
          url: StatusCheckURL,
          responseType: 'json',
          timeout: 200,
        })
        .pipe(catchError(() => of(buildingMode())))
      ),
      map(result => result ? result.response : undefined)
    )
  ).subscribe(state => {
    if (state) {
      if (state.status === StatusBuildingResponse) buildingMode();
      else if (state.status === StatusErrorResponse) showError(state.error);
      else if (state.status === StatusReadyResponse && building) {
        location.reload();
      }
    }
  });
}


export const reloadOnChange$ = /*#__PURE__*/funcTransport(reloadOnChange);
