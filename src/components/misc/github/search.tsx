import { pin, map, sink } from '@connectv/core';
import { RendererLike, ComponentThis } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { ToCSearchBtn } from '../../page/toc/search/button';


export interface SearchOptions {
  repo: string;
  user: string;
  root: string;
  label?: string;
}


export function GithubSearch(this: ComponentThis, options: SearchOptions, renderer: RendererLike<any, any>) {
  const query = pin();
  const results = query.to(map((q: string) => {
    console.log('Searching ...');
    return [];
  }));

  return <ToCSearchBtn label={options.label} query={query} results={results}/>;
}


export const GithubSearch$ = transport(GithubSearch);
