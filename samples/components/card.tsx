import { RendererLike } from '@connectv/html';


export function Card(_: any, renderer: RendererLike<any, any>, content: any) {
  return <div style='padding:8px; border: 1px solid red;'>{content}</div>
}
