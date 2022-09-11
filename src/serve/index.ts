import { utimesSync } from 'fs';
import _watch from 'node-watch';
import express from 'express';
import ws, { Router } from 'express-ws';
import chalk from 'chalk';
import { join } from 'path';
import { Subject, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { compile } from '@connectv/sdh';
import { _dropExt } from 'rxline/fs';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocConfig } from '../config';
import { ContentBuilder } from '../build/types';
import { build } from '../build';
import { rebuild } from '../build/rebuild';
import { files } from '../build/files';
import { loadToC } from '../build/toc';

import { StatusCheckURL, StatusBuildingResponse, StatusReadyResponse, Status, StatusErrorResponse } from './config';
import { watch } from './watch';
import { watchAssets } from './watch-assets';
import { reloadOnChange$ } from './reload';
import { buildingHtml } from './building-html';


export function serve(
  root: string,
  config: CodedocConfig,
  builder: ContentBuilder,
  themeInstaller: TransportedFunc<void>,
  webpackConfig?: Configuration,
) {
  let state = new BehaviorSubject<{ status: Status, error?: string }>({ status: StatusBuildingResponse });

  config = { ...config, bundle: { ...config.bundle, init: [...config.bundle.init, reloadOnChange$] } };
  const wpconf = merge({ mode: 'development' }, webpackConfig || {});

  state.next({ status: StatusBuildingResponse });
  build(config, builder, themeInstaller, wpconf).then(assets => {
    state.next({ status: StatusReadyResponse });
    console.log(chalk`{greenBright #} Documents built!`);
    const notifier = new Subject<void>();
    watch(root, config, notifier).subscribe(async buildreq => {
      if (buildreq === 'queued') state.next({ status: StatusBuildingResponse });
      else {
        if (buildreq === 'all') {
          assets.toc = await loadToC(config);
        }

        rebuild(
          buildreq === 'all' ? files(config) : files(buildreq, config),
          config, builder, assets, wpconf
        ).then(() => {
          console.log(chalk`{greenBright #} Documents Rebuilt!`);
          state.next({ status: StatusReadyResponse });
          notifier.next();
        }).catch(error => {
          console.log(chalk`{redBright # REBUILD FAILED!!}`);
          console.log(error?.message || error);
          state.next({ status: StatusErrorResponse, error: error?.message || error });
          notifier.next();
        });
      }
    });

    watchAssets(root, config, state).subscribe(filename => {
      console.log(chalk`{gray # change in ${filename}, issuing reload to client ...}`);
      state.next({ status: StatusBuildingResponse });
      setTimeout(() => state.next({status: StatusReadyResponse}), 300);
    });
  }).catch(error => {
    console.log(chalk`{redBright # BUILD FAILED!!}`);
    console.log(error?.message || error);
    state.next({ status: StatusErrorResponse, error: error?.message || error });
    watch(root, config).pipe(take(1)).subscribe(() => {

      // --> so this is shaky and requires explanation:
      // --> we need to restart the whole process when the initial build fails.
      // --> in order to do so, we simply touch the current file.
      // --> since this file is imported, saving it should restart ts-node-dev's process.
      utimesSync(__filename, new Date(), new Date());
    });
  });

  const app = express(); ws(app);
  app.get(StatusCheckURL, (_, res) => res.json(state.value));
  (app as any as Router).ws(StatusCheckURL, ws => {
    const sub = state.subscribe(v => ws.send(JSON.stringify(v)));
    ws.on('error', () => sub.unsubscribe());
    ws.on('close', () => sub.unsubscribe());
  });

  app.use(config.dest.namespace, express.static(config.dest.assets, {dotfiles: 'allow'}));

  app.get(`${config.dest.namespace}/*`, (req, res) => {
    const normalUrl = req.originalUrl.substr(config.dest.namespace.length).split('?')[0];
    const filename = (normalUrl === '/' ? 'index' : normalUrl) + '.html';
    const filepath = join(root, config.dest.html, filename);
    res.sendFile(filepath, {}, err => {
      if (err) {
        if (state.value.status === StatusBuildingResponse) {
          compile(buildingHtml)
          .serialize()
          .then(html => res.status(200).send(html));
        }
        else {
          console.log();
          console.log(chalk.red('# Not Found::'));
          console.log(chalk.red('# ') + req.originalUrl);
          console.log(chalk.red('# '));
          console.log(chalk.red('# ') + chalk.gray('tried the following paths:'));
          console.log(chalk.red('# ') + chalk.gray(join(root, config.dest.assets, 
            req.originalUrl.substr(config.dest.namespace.length))));
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
