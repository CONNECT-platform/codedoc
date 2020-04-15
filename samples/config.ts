import { configuration, DefaultConfig } from '../src';

import { theme } from './theme';
import { Card } from './components/card';


export const config = configuration({
  src: {
    base: 'samples/md'
  },
  dest: {
    bundle: 'assets',
    styles: 'assets',
    html: 'dist',
    namespace: '/my-project',
  },
  theme,
  page: {
    title: {
      base: 'Codedoc Sample'
    },
    favicon: '/favicon.ico'
  },
  markdown: {
    customComponents: {
      ...DefaultConfig.markdown.customComponents,
      Card,
    }
  },
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
