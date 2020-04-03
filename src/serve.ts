import express from 'express';
import chalk from 'chalk';
import { join } from 'path';
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocConfig } from './config';
import { build, Builders } from './build';


export function serve(
  root: string,
  config: CodedocConfig,
  builders: Builders,
  themeInstaller: TransportedFunc<void>
) {
  build(config, builders, themeInstaller).then(() => {
    console.log(chalk.greenBright('# ') + 'Documents rebuilt!');
  });

  const app = express();
  app.use(express.static(config.dest.assets));

  app.get('/*', (req, res) => {
    const filename = (req.originalUrl === '/' ? 'index' : req.originalUrl) + '.html';
    res.sendFile(join(root, config.dest.html, filename), {}, err => {
      if (err) {
        console.log(chalk.red('# Not Found::'));
        console.log(chalk.red('# ') + req.originalUrl);
        console.log(chalk.red('# ') + chalk.gray(join(root, config.dest.html, filename)));
        console.log();
        res.status(404).send('Not Found!');
      }
    });
  });

  app.listen(config.dev.port, () => {
    console.log(chalk.greenBright('# ') + 'Serving docs on ' +  chalk.cyan(`http://localhost:${config.dev.port}`))
  });
}
