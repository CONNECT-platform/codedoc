import chalk from 'chalk';
import { join } from 'path';
import { Configuration } from 'webpack';
import { SimpleLine, sequentially, handleError, Function } from 'rxline';
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

  return new Promise((resolve, reject) => {
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
      mapExt<Compiled>(() => '.html'),
      mapRoot(() => config.dest.html),
      save(),
    )
    .pipe(
      handleError((err, file, rethrow) => {
        rethrow(new Error(chalk`{redBright # ERROR} in {underline ${file.path}}\n${err?.message || err}`));
      }) as any as Function<File<any>, File<any>>,
    )
    .peek(file => console.log(`${chalk.green('#')}${chalk.gray(' rebuilt:: .........')} ${join(file.root, file.path)}`))
    .process()
    .collect(sequentially, async (built) => {
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

      if (config.afterBuild) {
        console.log(chalk.gray('# running after build hooks ...'));
        for (let hook of config.afterBuild) {
          console.log(chalk.gray('# running ......... ' + hook.name + '()'));
          await hook({ config, built, source: files, partial: true });
          console.log(`${chalk.green('#')} ${chalk.gray('finished:: ......')} ${hook.name}()`);
        }
      }

      resolve(assets);
    }, reject);
  });
}
