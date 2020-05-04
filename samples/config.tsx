import { configuration, DefaultConfig } from '../src';
import { StaticRenderer } from '@connectv/sdh';
import register from 'jsdom-global';

const renderer = new StaticRenderer();
register();

import { theme } from './theme';
import { Card } from './components/card';
import { enableFormula } from '../src/components';


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
    meta: {
      description: 'hellow',
      keywords: ['hellow', 'world']
    },
    favicon: '/favicon.ico',
    post: [(html, file) => {
      html.body.classList.add('POST-PROCESS');
      html.body.setAttribute('data-path', file.path);
    }, enableFormula],
    scripts: [
      <script>{`
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      ga('create', 'UA-XXXXX-Y', 'auto');
      ga('send', 'pageview');
      `}</script>,
      <script async src='https://www.google-analytics.com/analytics.js'/>
    ]
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
