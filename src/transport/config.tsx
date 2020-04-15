import { RendererLike } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';


export interface CodedocTransportConf {
  namespace: string;
}


export function ConfigTransport(
  conf: CodedocTransportConf,
  renderer: RendererLike<any, any>
) {
  (window as any).__codedoc_conf = conf;
  return <fragment/>;
}


export function getConfig(): CodedocTransportConf {
  return (window as any).__codedoc_conf;
}


export const ConfigTransport$ = /*#__PURE__*/transport(ConfigTransport);
