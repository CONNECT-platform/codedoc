import chalk from 'chalk';
import { join } from 'path';
import { readFile } from 'rxline/fs';
import { Plugin } from '@connectv/html';
import { StaticRenderer } from '@connectv/sdh';
import { marked } from '@connectv/marked';

const registerGlobalDom = require('jsdom-global');

import { CodedocConfig } from '../config';


export async function buildToC(config: CodedocConfig, ...plugins: Plugin<any, any>[]) {
  const renderer = new StaticRenderer().plug(...plugins);
  try { document } catch(err) { registerGlobalDom(); }

  try {
    const tocFile = await readFile()(join(config.src.base, config.src.toc));
    return marked(tocFile.content, config.tocMarkdown)(renderer);
  } catch(err) {
    console.log(chalk.yellowBright('# Warning:: ToC file could not be loaded.'));
    console.log(chalk.yellowBright('# ') + chalk.gray(join(config.src.base, config.src.toc)));
    console.log(chalk.yellowBright('# ') + err);
    return <fragment/>;
  }
}
