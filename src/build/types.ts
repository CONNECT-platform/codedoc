import { File } from 'rxline/fs';
import { RendererLike } from '@connectv/html';


export type ContentBuilder = (content: HTMLElement, renderer: RendererLike<any, any>, file: File<string>) 
                              => Node | Promise<Node>;


export interface Builders {
  content: ContentBuilder,
}
