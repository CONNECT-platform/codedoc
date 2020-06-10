import chalk from 'chalk';
import { join } from 'path';
import { Configuration } from 'webpack';
import { SimpleLine } from 'rxline';
import { File, readFile, mapExt, mapRoot } from 'rxline/fs';
import { post, Compiled, save } from '@connectv/sdh';

import { CodedocConfig } from '../config';
import { ContentBuilder, BuildAssets } from './types';
import { content } from './content';
import { namespace } from './namespace';
import { pageSpecificMeta } from '../components/page/meta-override/post';



export function rebuild(
  files: SimpleLine<File<undefined>>,
  config: CodedocConfig,
  builder: ContentBuilder,
  assets: BuildAssets,
  webpackConfig?: Configuration,
): Promise<BuildAssets> {
  const _ogstyles = assets.styles.theme.registry.toString();

  return new Promise(resolve => {
    files
    .peek(file => console.log(`${chalk.gray('# rebuilding ........ ' + join(file.root, file.path)) }`))
    .pipe(
      readFile(),
      content(builder, assets.toc, config, assets.styles),
      post(assets.bundle.collect()),
      post(namespace(config)),
      post(pageSpecificMeta),
      (file: File<Compiled>) => {
        (config.page.post || []).forEach(p => file.content.post(html => p(html, file, config)));
        return file;
      },
      mapExt(() => '.html'),
      mapRoot(() => config.dest.html),
      save(),
    )
    .peek(file => console.log(`${chalk.green('#')}${chalk.gray(' rebuilt:: .........')} ${join(file.root, file.path)}`))
    .process()
    .collect(async () => {
      if (assets.styles.theme.registry.toString() !== _ogstyles) {
        console.log(`${chalk.gray('# rebuilding ........ ' + assets.styles.path)}`);
        await assets.styles.save();
        console.log(`${chalk.green('#')} ${chalk.gray('rebuilt:: .........')} ${assets.styles.path}`)
      }

      if (assets.bundle.repack) {
        console.log(`${chalk.gray('# rebuilding ........ ' + assets.bundle.path)}`);
        await save(assets.bundle, webpackConfig);
        assets.bundle.repack = false;
        console.log(`${chalk.green('#')} ${chalk.gray('rebuilt:: .........')} ${assets.bundle.path}`);
      }

      resolve(assets);
    });
  });
}
