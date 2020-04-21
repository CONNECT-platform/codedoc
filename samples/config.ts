import { configuration, DefaultConfig } from '../src';

import { theme } from './theme';
import { Card } from './components/card';


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
    title: {
      base: 'Codedoc Sample'
    },
    favicon: '/favicon.ico',
    post: [(html, file) => {
      html.body.classList.add('POST-PROCESS');
      html.body.setAttribute('data-path', file.path);
    }]
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
