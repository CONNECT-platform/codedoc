import { join } from 'path';
import { Bundle } from '@connectv/sdh';
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocConfig } from '../config';
import { getRenderer$ } from '../transport/renderer';
import { initJss$ } from '../transport/setup-jss';


export function bundle(config: CodedocConfig, themeInstaller: TransportedFunc<void>) {
  const bundle = new Bundle(
    '/' + config.dest.bundle + '/codedoc-bundle.js',
    join(config.dest.assets, config.dest.bundle, 'codedoc-bundle.js')
  );
  bundle.init(initJss$);
  bundle.init(themeInstaller);

  config.bundle.init.forEach(init => bundle.init(init));

  bundle.withRenderer<any, any>(getRenderer$);
  return bundle;
}
