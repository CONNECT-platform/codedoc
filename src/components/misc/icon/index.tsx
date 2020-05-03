import { RendererLike } from '@connectv/html';


export interface IconOptions {
  align?: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom';
}


export function Icon(options: IconOptions, renderer: RendererLike<any, any>, content: any) {
  return <span class="icon-font" data-ignore-text style={`vertical-align: ${options.align || 'sub'}`}>{content}</span>
}
