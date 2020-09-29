import { quotedComponents, linkedComponents } from '@connectv/marked';

import { DefaultTheme } from '../theme';
import { guessTitle } from '../transport/guess-title';

import { Code } from '../components/code';
import { Heading } from '../components/heading';
import { Button, CopyButton, Buttons } from '../components/button';
import { Tab, Tabs } from '../components/tabs';
import { Footnote, FootnoteBlock, Footnotes } from '../components/footnote';
import { Collapse } from '../components/collapse';
import { MetaOverride } from '../components/page/meta-override';
import { DarkLight, InLight, InDark } from '../components/darkmode/darklight';
import { GithubButton } from '../components/misc/github';
import { Watermark } from '../components/misc/watermark';
import { Icon } from '../components/misc/icon';
import { codeSelection$ } from '../components/code/selection';
import { sameLineLengthInCodes$ } from '../components/code/same-line-length';
import { codeLineHints$ } from '../components/code/line-hint';
import { codeLineRef$ } from '../components/code/line-ref';
import { smartCopy$ } from '../components/code/smart-copy';
import { copyHeadings$ } from '../components/heading/copy-headings';
import { contentNavHighlight$ } from '../components/page/contentnav/highlight';
import { gatherFootnotes$ } from '../components/footnote/gather-footnotes';
import { deferredIframes$ } from '../transport/deferred-iframe';
import { ToCHeading } from '../components/page/toc/heading';
import { smoothLoading$ } from '../transport/smooth-loading';
import { tocHighlight$ } from '../components/page/toc/toc-highlight';
import { ToCPrevNext$ } from '../components/page/toc/prevnext';
import { postNavSearch$ } from '../components/page/toc/search/post-nav';

import { CodedocConfig } from './config.type';
import { addLineIds } from '../components/code/line-links/add-line-ids';
import { copyLineLiks$ } from '../components/code/line-links/copy-line-link';


export const DefaultMarkdownCustomComponents = /*#__PURE__*/{
  Tab, Tabs, Collapse,
  Footnote: FootnoteBlock, Footnotes,
  Button, Buttons, CopyButton,
  DarkLight, InDark, InLight,
  GithubButton, Watermark,
  MetaOverride,
  ToCPrevNext: ToCPrevNext$,
};


export const DefaultMarkdownCustomInlineComponents = /*#__PURE__*/{
  Icon, Footnote,
}


export const DefaultToCMarkdownCustomComponents = /*#__PURE__*/{
  Button, Buttons, Collapse,
  DarkLight, InDark, InLight,
  GithubButton, Watermark,
};

export const DefaultToCMarkdownCustomInlineComponents = /*#__PURE__*/{
  Icon,
}


export const DefaultConfig: CodedocConfig = /*#__PURE__*/{
  src: {
    base: 'docs/md',
    toc: '_toc.md',
    pick: /\.md$/,
    drop: /(^_)|(\/_)/,
    not_found: '404.md',
  },

  dest: {
    html: '.',
    assets: '.',
    bundle: 'docs/assets',
    styles: 'docs/assets',
    namespace: '',
  },

  bundle: {
    init: [
      codeSelection$, sameLineLengthInCodes$, codeLineHints$, codeLineRef$, smartCopy$,
      copyHeadings$, contentNavHighlight$, deferredIframes$, smoothLoading$, tocHighlight$,
      postNavSearch$, copyLineLiks$, gatherFootnotes$,
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
    },
    post: [addLineIds]
  },

  afterBuild: [],

  theme: DefaultTheme,
  markdown: {
    Code,
    Heading,
    customComponents: DefaultMarkdownCustomComponents,
    customInlineComponents: DefaultMarkdownCustomInlineComponents,
    BlockQuote: quotedComponents(DefaultMarkdownCustomComponents),
    Link: linkedComponents(DefaultMarkdownCustomInlineComponents),
  },
  tocMarkdown: {
    Heading: ToCHeading,
    customComponents: DefaultToCMarkdownCustomComponents,
    customInlineComponents: DefaultToCMarkdownCustomInlineComponents,
    BlockQuote: quotedComponents(DefaultToCMarkdownCustomComponents),
    Link: linkedComponents(DefaultToCMarkdownCustomInlineComponents),
  },
}
