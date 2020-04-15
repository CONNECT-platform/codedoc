import { ajax } from 'rxjs/ajax';
import { Subject, of, zip } from 'rxjs';
import { switchMap, map, catchError, tap, share } from 'rxjs/operators';
import { RendererLike, ComponentThis } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { ToCSearchBtn } from '../../page/toc/search/button';


export interface SearchOptions {
  repo: string;
  user: string;
  root: string;
  pick: string;
  drop: string;
  label?: string;
}


interface HotGithubResponse {
  items: {
    path: string
  }[];
}

interface CachedGithubResponse {
  result: string[]
}

function isCached(res: HotGithubResponse | CachedGithubResponse): res is CachedGithubResponse {
  return (res as any).result !== undefined;
}


export function GithubSearch(this: ComponentThis, options: SearchOptions, renderer: RendererLike<any, any>) {
  const query = new Subject<string>();
  const pick = new RegExp(options.pick);
  const drop = new RegExp(options.drop);
  const cache: {[q: string]: string[]} = {};

  const results = query.pipe(
    switchMap(q =>
      (q in cache) ? of({ result: cache[q] }) :     // --> respond from cache if query in cache
      ajax.getJSON<HotGithubResponse>(
        `https://api.github.com/search/code?q=${encodeURIComponent(q)}`
        + `+in:file`                                // --> search in files
        + `+path:${options.root}`                   // --> search in root directory
        + `+extension:md`                           // --> search in `.md` files
        + `+repo:${options.user}/${options.repo}`   // --> search in given repo of given user
      ).pipe(catchError(() => of(undefined)))       // --> no sweat in case of error
    ),
    map(res => 
      res ?
      ( isCached(res) ? res.result :                // --> if cached result, no need to process
        res.items
          .map(item => item.path)
          .filter(x => pick.test(x))                // --> check if it should be picked
          .filter(x => !drop.test(x))               // --> check if it shouldn't be dropped
          .map(x => x.substr(0, x.length - 3))      // --> remove the extension `.md`
          .map(x => x.substr(options.root.length))  // --> remove the root path part
          .map(x => x === '/index' ? '/' : x)       // --> turn `/index` to `/`
      ): []
    ),
    share(),
  );

  zip(query, results).pipe(                         // --> for pairs of query and result...
    tap(([query, results]) => {
      if (results.length > 0)                       // --> ...if the result is valid...
        cache[query] = results;                     // --> ...cache it.
    })
  ).subscribe();

  return <ToCSearchBtn label={options.label} query={query} results={results}/>;
}


export const GithubSearch$ = /*#__PURE__*/transport(GithubSearch);
