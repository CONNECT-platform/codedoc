import express from 'express';
import chalk from 'chalk';
import { join } from 'path';
import { compile } from '@connectv/sdh';
import { Configuration } from 'webpack';
const merge = /*#__PURE__*/require('webpack-merge');
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocConfig } from '../config';
import { ContentBuilder } from '../build/types';
import { build } from '../build';

import { StatusCheckURL, StatusBuildingResponse, StatusReadyResponse } from './config';
import { buildingHtml } from './building-html';
import { reloadOnChange$ } from './reload';


export function serve(
  root: string,
  config: CodedocConfig,
  builder: ContentBuilder,
  themeInstaller: TransportedFunc<void>,
  webpackConfig?: Configuration,
) {
  let built = false;
  config = { ...config, bundle: { ...config.bundle, init: [...config.bundle.init, reloadOnChange$] } };
  build(config, builder, themeInstaller, merge({ mode: 'development' }, webpackConfig || {})).then(() => {
    built = true;
    console.log(chalk.greenBright('# ') + 'Documents rebuilt!');
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
          res.status(404).send('Not Found!');
        }
      }
    });
  });

  app.listen(config.dev.port, () => {
    console.log(chalk.greenBright('# ') + 'Serving docs on ' 
          +  chalk.cyan(`http://localhost:${config.dev.port}${config.dest.namespace}`))
  });
}
