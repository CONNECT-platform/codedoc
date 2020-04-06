import { Configuration } from 'webpack';
import { concurrently } from 'rxline';
import { files, pathMatch, readFile, mapExt, mapRoot } from 'rxline/fs';
import { post, save } from '@connectv/sdh';
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocConfig } from '../config';
import { initJss } from '../util/setup-jss';
import { bundle } from './bundle';
import { Builders } from './types';
import { content } from './content';
import { styles } from './styles';


export async function build(
  config: CodedocConfig,
  builders: Builders,
  themeInstaller: TransportedFunc<void>,
  webpackConfig?: Configuration,
) {
  initJss();

  const _bundle = bundle(config, themeInstaller);
  const _styles = styles(config);

  return new Promise(resolve => {
    files('.', { root: config.src.base })
      .pick(pathMatch(config.src.pick))
      .drop(pathMatch(config.src.drop))
      .pipe(
        readFile(),
        content(builders.content, config, _styles),
        mapExt(() => '.html'),
        mapRoot(() => config.dest.html),
        post(_bundle.collect()),
        save(),
      )
      .process(concurrently)
      .collect(() => {
        Promise.all([
          save(_bundle, webpackConfig),
          _styles.save(),
        ])
        .then(resolve);
      });
  });
}
