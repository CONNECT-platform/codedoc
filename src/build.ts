import { join } from 'path';
import { files, pathMatch, readFile, mapExt, mapRoot, File } from 'rxline/fs';
import { concurrently, Function } from 'rxline';
import { Bundle, post, save, Compiled } from '@connectv/sdh';
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocConfig } from './config';
import { initJss, initJss$ } from './util/setup-jss';
import { getRenderer$ } from './util/renderer';


export function bundle(config: CodedocConfig, themeInstaller: TransportedFunc<void>) {
  const bundle = new Bundle(
    '/' + config.dest.bundle + '/bundle.js',
    join(config.dest.assets, config.dest.bundle, 'bundle.js')
  );
  bundle.init(initJss$);
  bundle.init(themeInstaller);

  config.bundle.init.forEach(init => bundle.init(init));

  bundle.withRenderer<any, any>(getRenderer$);
  return bundle;
}


export interface Builders {
  content: Function<File<string>, File<Compiled>>
}


export async function build(
  config: CodedocConfig,
  builders: Builders,
  themeInstaller: TransportedFunc<void>
) {
  initJss();

  const _bundle = bundle(config, themeInstaller);

  return new Promise(resolve => {
    files('.', { root: config.src.base })
      .pick(pathMatch(config.src.pick))
      .drop(pathMatch(config.src.drop))
      .pipe(
        readFile(),
        builders.content,
        mapExt(() => '.html'),
        mapRoot(() => config.dest.html),
        post(_bundle.collect()),
        save(),
      )
      .process(concurrently)
      .collect(() => {
        save(_bundle).then(resolve);
      });
  });
}
