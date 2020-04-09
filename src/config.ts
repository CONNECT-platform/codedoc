import { File } from 'rxline/fs';
import { PartialOptions as MarkdownOptions, quotedComponents } from '@connectv/marked';
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocTheme, ThemeExtension, DefaultTheme, createTheme } from './theme';
import { guessTitle } from './util/guess-title';

import { Code } from './components/code';
import { Heading } from './components/heading';
import { Button, CopyButton, Buttons } from './components/button';
import { Tab, Tabs } from './components/tabs';
import { Collapse } from './components/collapse';
import { DarkLight, InLight, InDark } from './components/darkmode/darklight';
import { GithubButton, GithubBtnActions } from './components/misc/github';
import { Watermark } from './components/misc/watermark';
import { codeSelection$ } from './components/code/selection';
import { sameLineLengthInCodes$ } from './components/code/same-line-length';
import { codeLineHints$ } from './components/code/line-hint';
import { codeLineRef$ } from './components/code/line-ref';
import { smartCopy$ } from './components/code/smart-copy';
import { copyHeadings$ } from './components/heading/copy-headings';
import { contentNavHighlight$ } from './components/page/contentnav/highlight';
import { deferredIframes$ } from './util/deferred-iframe';
import { MetaOptions } from './components/page/meta';
import { FontsOptions } from './components/page/fonts';
import { ToCHeading } from './components/page/toc/heading';
import { smoothLoading$ } from './util/smooth-loading';
import { tocHighlight$ } from './components/page/toc/toc-highlight';
import { ToCPrevNext$ } from './components/page/toc/prevnext';


export interface SourceConfig {
  base: string;
  toc: string;
  notfound: string;
  pick: RegExp;
  drop: RegExp;
}


export interface DestConfig {
  html: string;
  assets: string;
  bundle: string;
  styles: string;
}


export interface BundleConfig {
  init: TransportedFunc<void>[],
}


export interface TitleConfig {
  base: string;
  connector: string;
  extractor: (content: HTMLElement, config: CodedocConfig, file: File<string>) => string;
}


export interface GithubConfig {
  user: string;
  repo: string;
  action?: GithubBtnActions;
  count?: boolean;
  large?: boolean;
  standardIcon?: boolean;
}


export interface GitterConfig {
  room: string;
}


export interface DevConfig {
  port: number,
}


export interface CodedocConfig {
  src: SourceConfig;
  dest: DestConfig;
  bundle: BundleConfig;
  page: {
    title: TitleConfig;
    favicon?: string;
    meta?: MetaOptions;
    fonts?: FontsOptions;
  };
  theme: CodedocTheme;
  markdown: MarkdownOptions<any, any>;
  tocMarkdown: MarkdownOptions<any, any>;
  dev: DevConfig;
  misc?: {
    github?: GithubConfig;
    gitter?: GitterConfig;
    [whatever: string]: any;
  }
}


export const DefaultConfig: CodedocConfig = {
  src: {
    base: 'docs/md',
    toc: '_toc.md',
    notfound: '_not_found.md',
    pick: /\.md$/,
    drop: /(^_)|(\/_)/,
  },

  dest: {
    html: '.',
    assets: '.',
    bundle: 'docs/assets',
    styles: 'docs/assets',
  },

  bundle: {
    init: [
      codeSelection$, sameLineLengthInCodes$, codeLineHints$, codeLineRef$, smartCopy$,
      copyHeadings$, contentNavHighlight$, deferredIframes$, smoothLoading$, tocHighlight$,
    ],
  },

  dev: {
    port: 3000
  },

  page: {
    title: {
      base: 'New Codedoc Project',
      connector: ' | ',
      extractor: (content, config) => guessTitle(content, config.page.title.base, config.page.title.connector),
    }
  },

  theme: DefaultTheme,
  markdown: {
    Code,
    Heading,
    BlockQuote: quotedComponents({
      Tab, Tabs, Collapse,
      Button, Buttons, CopyButton,
      DarkLight, InDark, InLight,
      GithubButton, Watermark,
      ToCPrevNext: ToCPrevNext$,
    })
  },
  tocMarkdown: {
    Heading: ToCHeading,
    BlockQuote: quotedComponents({
      Button, Buttons, Collapse,
      DarkLight, InDark, InLight,
      GithubButton, Watermark,
    })
  },
}


export interface ConfigOverride {
  src?: Partial<SourceConfig>;
  dest?: Partial<DestConfig>;
  bundle?: Partial<BundleConfig>;
  dev?: Partial<DevConfig>;
  page?: {
    title?: Partial<TitleConfig>;
    favicon?: string;
    meta?: MetaOptions;
    fonts?: FontsOptions;
  }
  theme?: CodedocTheme;
  markdown?: MarkdownOptions<any, any>;
  tocMarkdown?: MarkdownOptions<any, any>;
  misc?: {
    github?: GithubConfig;
    gitter?: GitterConfig;
    [whatevs: string]: any;
  }
}


export function configuration(override: ConfigOverride): CodedocConfig {
  const res = { ...DefaultConfig };

  if (override.src) Object.assign(res.src, override.src);
  if (override.dest) Object.assign(res.dest, override.dest);
  if (override.bundle) Object.assign(res.bundle, override.bundle);
  if (override.page) {
    if (override.page.title) Object.assign(res.page.title, override.page.title);
    if (override.page.favicon) res.page.favicon = override.page.favicon;
    if (override.page.meta) res.page.meta = override.page.meta;
    if (override.page.fonts) res.page.fonts = override.page.fonts;
  }

  if (override.dev) Object.assign(res.dev, override.dev);
  if (override.theme) res.theme = override.theme;
  if (override.markdown) Object.assign(res.markdown, override.markdown);
  if (override.tocMarkdown) Object.assign(res.tocMarkdown, override.tocMarkdown);

  if (override.misc) res.misc = override.misc;

  return res;
}
