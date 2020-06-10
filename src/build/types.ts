import { File } from 'rxline/fs';
import { RendererLike } from '@connectv/html';
import { Bundle } from '@connectv/sdh';
import { ExternalSheet } from '@connectv/jss-theme/dist/es6/external-sheet';
import { CodedocTheme } from '../theme';


export type ContentBuilder = (
  content: HTMLElement,
  toc: HTMLElement,
  renderer: RendererLike<any, any>,
  file: File<string>
) => Node | Promise<Node>;


export type BuildAssets = {
  bundle: Bundle,
  styles: ExternalSheet<CodedocTheme, any, any>,
  toc: string,
}