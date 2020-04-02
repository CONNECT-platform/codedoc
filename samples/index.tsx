import { save, post, Bundle } from '@connectv/sdh';
import { concurrently } from 'rxline';
import { files, pathMatch, readFile, mapExt, mapRoot } from 'rxline/fs';

import { initJss, initJss$ } from '../src/util/setup-jss';
import { buildContentPage } from './content-page';
import { codeSelection$ } from '../src/components/code/selection';
import { sameLineLengthInCodes$ } from '../src/components/code/same-line-length';
import { codeLineHints$ } from '../src/components/code/code-line-hint';
import { smartCopy$ } from '../src/components/code/smart-copy';
import { copyHeadings$ } from '../src/components/heading/copy-headings';
import { contentNavHighlight$ } from '../src/components/contentnav/highlight';
import { getRenderer$ } from '../src/util/renderer';
import { installTheme$ } from './theme';
import { deferredIframes$ } from '../src/util/deferred-iframe';
import { codeLineRef$ } from '../src/components/code/code-line-ref';


initJss();

const bundle = new Bundle('./bundle.js', 'dist/bundle.js')
  .init(initJss$)
  .init(installTheme$)
  .init(codeSelection$)
  .init(sameLineLengthInCodes$)
  .init(codeLineHints$)
  .init(codeLineRef$)
  .init(smartCopy$)
  .init(copyHeadings$)
  .init(contentNavHighlight$)
  .init(deferredIframes$)
  .withRenderer<any, any>(getRenderer$)
;

files('.', { root: 'samples/md' })    // --> get all the files
  .pick(pathMatch(/\.md$/))           // --> pick markdown files
  .drop(pathMatch(/(^_)|(\/_)/))      // --> drop those in a folder starting with _ or whose name starts with _
  .pipe(
    readFile(),                       // --> read their contents
    buildContentPage(),               // --> build content pages from their contents
    mapExt(() => '.html'),            // --> change extension to `.html`
    mapRoot(() => 'dist'),            // --> change the root
    post(bundle.collect()),           // --> add the bundle
    save(),                           // --> save them
  )
  .process(concurrently)              // --> concurrently generate html files
  .collect(() => {
    save(bundle);                     // --> pack and save the bundle code
  });
