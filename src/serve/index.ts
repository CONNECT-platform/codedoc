import express from 'express';
import chalk from 'chalk';
import { join } from 'path';
import { Subject } from 'rxjs';
import { compile } from '@connectv/sdh';
import { _dropExt } from 'rxline/fs';
import { Configuration } from 'webpack';
const merge = /*#__PURE__*/require('webpack-merge');
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocConfig } from '../config';
import { ContentBuilder } from '../build/types';
import { build } from '../build';

import { StatusCheckURL, StatusBuildingResponse, StatusReadyResponse } from './config';
import { watch } from './watch';
import { buildingHtml } from './building-html';
import { reloadOnChange$ } from './reload';
import { rebuild } from '../build/rebuild';
import { files } from '../build/files';


export function serve(
  root: string,
  config: CodedocConfig,
  builder: ContentBuilder,
  themeInstaller: TransportedFunc<void>,
  webpackConfig?: Configuration,
) {
  let built = false;

  config = { ...config, bundle: { ...config.bundle, init: [...config.bundle.init, reloadOnChange$] } };
  const wpconf = merge({ mode: 'development' }, webpackConfig || {});
  build(config, builder, themeInstaller, wpconf).then(assets => {
    built = true;
    console.log(chalk`{greenBright #} Documents built!`);
    const notifier = new Subject<void>();
    watch(root, config, notifier).subscribe(buildreq => {
      if (buildreq === 'queued') built = false;
      else {
        rebuild(
          buildreq === 'all' ? files(config) : files(buildreq, config),
          config, builder, assets, wpconf
        ).then(() => {
          console.log(chalk`{greenBright #} Documents Rebuilt!`);
          built = true;
          notifier.next();
        });
      }
    });
  });

  const app = express();
  app.get(StatusCheckURL, (_, res) => {
    if (!built) res.send(StatusBuildingResponse);
    else res.send(StatusReadyResponse);
  });

  app.use(config.dest.namespace, express.static(config.dest.assets));

  app.get(`${config.dest.namespace}/*`, (req, res) => {
    const normalUrl = req.originalUrl.substr(config.dest.namespace.length).split('?')[0];
    const filename = (normalUrl === '/' ? 'index' : normalUrl) + '.html';
    const filepath = join(root, config.dest.html, filename);
    res.sendFile(filepath, {}, err => {
      if (err) {
        if (!built) {
          compile(buildingHtml)
          .serialize()
          .then(html => res.status(200).send(html));
        }
        else {
          console.log(chalk.red('# Not Found::'));
          console.log(chalk.red('# ') + req.originalUrl);
          console.log(chalk.red('# ') + chalk.gray(filepath));
          console.log();
          res.sendFile(join(root, config.dest.html, _dropExt(config.src.not_found) + '.html'), {}, err => {
            if (err) res.status(404).send('Not Found!!');
          });
        }
      }
    });
  });

  app.listen(config.dev.port, () => {
    console.log(chalk.greenBright('# ') + 'Serving docs on ' 
          +  chalk.cyan(`http://localhost:${config.dev.port}${config.dest.namespace}`))
  });
}
