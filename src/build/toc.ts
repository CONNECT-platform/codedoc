import chalk from 'chalk';
import { join } from 'path';
import { readFile } from 'rxline/fs';

import { CodedocConfig } from '../config';


export async function loadToC(config: CodedocConfig) {
  try {
    const tocFile = await readFile()(join(config.src.base, config.src.toc));
    return tocFile.content;
  } catch(err) {
    console.log(chalk.yellowBright('# Warning:: ToC file could not be loaded.'));
    console.log(chalk.yellowBright('# ') + chalk.gray(join(config.src.base, config.src.toc)));
    console.log(chalk.yellowBright('# ') + err);
    return '';
  }
}
