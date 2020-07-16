import watch from 'node-watch';
import { join } from 'path';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { CodedocConfig } from '../config';
import { Status, StatusBuildingResponse } from './config';


const ASSET_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', // --> images
  '.woff', '.woff2', '.ttf', '.otf', '.eot',        // --> fonts
  '.css'                                            // --> stylesheets
];

export function watchAssets(root: string, config: CodedocConfig, state: BehaviorSubject<{status: Status}>) {
  const change$ = new Subject<string>();

  watch(join(root, config.dest.assets), {
    recursive: true,
    filter: f => ASSET_EXTENSIONS.some(extension => f.toLowerCase().endsWith(extension))
  }, (_, filename) => change$.next(filename));

  return change$.pipe(
    debounceTime(10),
    filter(() => state.value.status !== StatusBuildingResponse)
  );
}
