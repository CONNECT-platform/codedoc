import { RendererLike } from '@connectv/html';


export function Buttons(_: any, renderer: RendererLike<any, any>, content: any) {
  return <div style="text-align: right">{content}</div>
}
