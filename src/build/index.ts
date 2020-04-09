import { Configuration } from 'webpack';
import { concurrently } from 'rxline';
import { files, pathMatch, readFile, mapExt, mapRoot } from 'rxline/fs';
import { post, save, compile } from '@connectv/sdh';
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocConfig } from '../config';
import { initJss } from '../util/setup-jss';
import { bundle } from './bundle';
import { ContentBuilder } from './types';
import { content } from './content';
import { styles } from './styles';
import { loadToC } from './toc';


export async function build(
  config: CodedocConfig,
  builder: ContentBuilder,
  themeInstaller: TransportedFunc<void>,
  webpackConfig?: Configuration,
) {
  initJss();

  const _bundle = bundle(config, themeInstaller);
  const _styles = styles(config);

  const _toc = await loadToC(config);

  return new Promise(resolve => {
    files('.', { root: config.src.base })
      .pick(pathMatch(config.src.pick))
      .drop(pathMatch(config.src.drop))
      .pipe(
        readFile(),
        content(builder, _toc, config, _styles),
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
