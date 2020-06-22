import { configuration } from '../src';


import { theme } from './theme';
import { samplePlugin } from './plugin';
import { googleAnalytics } from './ga-plugin';
import { formulaPlugin } from '../src/components';


export const config = configuration({
  src: {
    base: 'samples/md',
  },
  dest: {
    bundle: 'assets',
    styles: 'assets',
    html: 'dist',
    namespace: '/my-project',
  },
  theme,
  page: {
    favicon: '/favicon.ico',
  },
  plugins: [
    samplePlugin, 
    googleAnalytics('XXXY'), 
    formulaPlugin],
  afterBuild: [function test(build) {
    console.log(build.built.map(f => f.path));
  }],
  misc: {
    github: {
      user: 'CONNECT-platform',
      repo: 'codedoc',
    },
    gitter: {
      room: 'connectv/community',
    },
  }
});
