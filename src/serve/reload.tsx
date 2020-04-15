import { RendererLike, ComponentThis, ref } from '@connectv/html';
import { interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { funcTransport } from '@connectv/sdh/transport';

import { StatusCheckURL, StatusBuildingResponse, StatusReadyResponse } from './config';
import { getRenderer } from '../transport/renderer';
import { Loading } from '../components/util/loading';


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
  const renderer = getRenderer();

  const buildingMode = () => {
    if (!building) {
      building = true;
      renderer.render(<Toast/>).on(document.body);
    }
  }

  interval(500).pipe(
    switchMap(() => ajax({
        url: StatusCheckURL,
        responseType: 'text',
        timeout: 200,
      })
      .pipe(catchError(() => of(buildingMode())))
    ),
    tap(result => {
      if (result) {
        if (result.response === StatusBuildingResponse) buildingMode();
        else if (result.response === StatusReadyResponse && building) {
          location.reload();
        }
      }
    }),
  )
  .subscribe();
}


export const reloadOnChange$ = /*#__PURE__*/funcTransport(reloadOnChange);
