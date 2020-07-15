import _watch from 'node-watch';
import chalk from 'chalk';
import { join } from 'path';
import { Subject, BehaviorSubject, of, Observable } from 'rxjs';
import { buffer, debounceTime, filter, tap, delayWhen } from 'rxjs/operators';

import { CodedocConfig } from '../config';


export function watch(
  root: string,
  config: CodedocConfig,
  notifier?: Observable<void>,
) {
  const watchbase = join(root, config.src.base, '/');
  const filechange$ = new Subject<string>();
  const request$ = new Subject<string[] | 'all' | 'queued'>();
  const build$ = new BehaviorSubject<boolean>(false);

  _watch(watchbase, {
    recursive: true,
    filter: (f: string) => (
      config.src.pick.test(f) && !config.src.drop.test(f) ||
      config.src.toc === f.substr(watchbase.length)
    ),
  }, (event, filename) => {
    if (event === 'update')
      filechange$.next(filename.substr(watchbase.length))
  });

  filechange$.pipe(
    tap(filename => {
      if (notifier)
        console.log(chalk`{blue # Changes in {magenta ${join(config.src.base, filename)}} queueing ...}`);
      request$.next('queued');
    }),
    buffer(
      filechange$.pipe(
        debounceTime(500), 
        delayWhen(() => !build$.value ? of(true) : build$.pipe(filter(_ => !_)))
      )
    ),
    filter(chanegs => chanegs.length > 0)
  ).subscribe(changedFiles => {
    if (notifier) {
      build$.next(true);
      console.log(chalk`{gray # Rebuilding due to changes ...}`);
    }
    changedFiles = changedFiles.filter((file, index) => changedFiles.indexOf(file) === index);
    if (changedFiles.includes(config.src.toc)) {
      request$.next('all');
    } else {
      request$.next(changedFiles);
    }

    notifier?.subscribe(() => build$.next(false));
  });

  return request$;
}