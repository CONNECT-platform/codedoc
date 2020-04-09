import { RendererLike } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { ToCSearchBtn } from '../../page/toc/search/button';


export interface SearchOptions {
  repo: string;
  user: string;
  root: string;
  label?: string;
}


export function GithubSearch(options: SearchOptions, renderer: RendererLike<any, any>) {
  return <ToCSearchBtn label={options.label}/>;
}


export const GithubSearch$ = transport(GithubSearch);
