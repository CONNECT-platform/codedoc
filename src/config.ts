import { File } from 'rxline/fs';
import { PartialOptions as MarkdownOptions, quotedComponents } from '@connectv/marked';
import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

import { CodedocTheme, DefaultTheme } from './theme';
import { guessTitle } from './transport/guess-title';

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
import { deferredIframes$ } from './transport/deferred-iframe';
import { MetaOptions } from './components/page/meta';
import { FontsOptions } from './components/page/fonts';
import { ToCHeading } from './components/page/toc/heading';
import { smoothLoading$ } from './transport/smooth-loading';
import { tocHighlight$ } from './components/page/toc/toc-highlight';
import { ToCPrevNext$ } from './components/page/toc/prevnext';
import { postNavSearch$ } from './components/page/toc/search/post-nav';
import { ComponentMap } from '@connectv/marked/dist/es6/quote-comp';


/**
 *
 * Represents the configuration for source files used by
 * Codedoc.
 *
 */
export interface SourceConfig {
  /**
   *
   * The base folder to look for markdown files in. Default is `'docs/md'`.
   *
   */
  base: string;

  /**
   *
   * The name of the markdown file containing table of contents, relative
   * to `base`. Default is `'_toc.md'`.
   *
   */
  toc: string;

  /**
   *
   * The regular expression to pick markdown files with. Default is any file with `.md` extension.
   * Files that match this expression but are also matched by `drop` expression will not be picked.
   *
   */
  pick: RegExp;

  /**
   *
   * The regular expression to exclude some files. Default is any file starting with `_` or
   * located in a sub-folder (relative to `base`) whose name starts with `_`.
   * Files matching `pick` that are also matched by this expression will not be included.
   *
   */
  drop: RegExp;
}


/**
 *
 * Represents the configuration for destination files produced by codedoc.
 *
 */
export interface DestConfig {
  /**
   *
   * The root folder to store all created html files in. Defauls to `'.'`, i.e. the root
   * folder of the project. Note that if you want to host your documentation using GitHub Pages,
   * this value MUST either be `'.'` or `'docs'`.
   *
   */
  html: string;

  /**
   *
   * The root folder to store created assets and read them from. Defaults to `'.'`, i.e. the
   * root folder of the project. Any asset not created by codedoc (like images) must also be
   * available in this folder to be accessible in the docs.
   *
   */
  assets: string;

  /**
   *
   * The path to export the final codedoc bundle to, relative to `assets`. Defaults to `'docs/assets'`.
   * Note that this does not determine the name of the bundle (which is set to `codedoc-bundle.js`).
   *
   */
  bundle: string;

  /**
   *
   * The path to export the final codedoc stylesheets to, relative to `assets`. Defaults to `'docs/assets'`.
   * Note that this does not determine the name of the stylesheet file (which is set to `codedoc-styles.css`).
   *
   */
  styles: string;

  /**
   *
   * The URL namespace of the docs, default is empty.
   * - If your docs are hosted at the root address of your domain, i.e. `https://my.server`, then this
   * should be empty.
   * - If your docs are NOT hosted at the root address of your domain, i.e. `https://my.server/docs`,
   * then this should be set to that URL prefix, i.e. `/docs`.
   * - If you are using GitHub Pages without a custom domain, then set this value to `/<repo-name>`,
   * as GitHub will serve your docs at `https://<user-name>.github.io/<repo-name>`. However if you
   * are using a custom domain, you might want to leave this empty.
   *
   */
  namespace: string;
}


/**
 *
 * Denotes the configuration for codedoc's client-side bundle.
 *
 */
export interface BundleConfig {
  /**
   *
   * A list of initialization functions that are to be executed when codedoc bundle is loaded.
   * 
   * **WARNING**: If you override this, you might loose functionality that is by default shipped
   * with codedoc bundle. To avoid that, simply append to the default list like this:
   * 
   * ```ts
   * import { configuration, DefaultConfig } from '@codedoc/core';
   * 
   * export const config = configuration({
   *   bundle: {
   *     init: [...DefaultConfig.bundle.init, myFunc1$, myFunc2$, ... ]
   *   },
   *   ...
   * });
   * ```
   *
   */
  init: TransportedFunc<void>[],
}


/**
 *
 * Denotes the configuration for title pages of the docs.
 *
 */
export interface TitleConfig {
  /**
   *
   * Represents the base title, which is prefixed to title of all pages.
   *
   */
  base: string;

  /**
   *
   * Represents the connector string, which is used to join `base` with page specific titles.
   * For example, if your `base` title is `My Awesome Project`, `connector` is ` > ` and
   * specific title of a particular page is `Stuff`, then the final title of that page would be
   * `My Awesome Project > Stuff`.
   *
   * Default is ` | `.
   *
   */
  connector: string;

  /**
   *
   * The function to determine the specific title of a page. Given function should return
   * the page-specific title as a string. This string is then attached to `base` using
   * the `connector` argument, to create the final title of any given page.
   * 
   * The function will be provided with the following arguments,
   * in specified order:
   *
   * - `content: HTMLElement` : the HTML tree of the page
   * - `config: CodedocConfig`: codedoc configuration
   * - `file: File<string>`   : the original markdown file from which the content was extracted
   *
   * Argument `file` is of type `rxline/fs.File`, which means it contains a `path` property and a `content`
   * property.
   *
   * By default, `guessTitle()` function is used, which would assume the first heading in the HTML tree
   * to contain the page specific title.
   *
   */
  extractor: (content: HTMLElement, config: CodedocConfig, file: File<string>) => string;
}


/**
 *
 * Denotes configuration for parsing markdown into HTML elements.
 *
 */
export interface MarkdownConfig extends MarkdownOptions<any, any> {

  /**
   *
   * A component map for custom components.
   *
   * **WARNING**: since a lot of features of codedoc come from its custom markdown
   * components, it is highly recommended to extend the default custom components
   * for adding your own components:
   *
   * ```tsx
   * import { configuration, DefaultConfig } from '@codedoc/core';
   * 
   * export const config = configuration({
   *   markdown: {
   *      customComponents: {
   *        ...DefaultConfig.markdown.customComponents,
   *        MyComponent,
   *      }
   *   },
   *   tocMarkdown: {
   *     customComponents: {
   *       ...DefaultConfig.tocMarkdown.customComponents,
   *       MyToCComponent,
   *     }
   *   }
   * });
   * ```
   *
   */
  customComponents: ComponentMap;
}


/**
 *
 * Represents GitHub configuration of the project.
 *
 */
export interface GithubConfig {
  /**
   *
   * GitHub username
   *
   */
  user: string;

  /**
   *
   * GitHub repository name
   *
   */
  repo: string;

  /**
   *
   * Action of the default GitHub button in header. Default is `"Star"`.
   *
   */
  action?: GithubBtnActions;

  /**
   *
   * Whether or not to show the count of stars/follows/etc on the default
   * GitHub button in the header. Default is `true`.
   *
   */
  count?: boolean;

  /**
   *
   * Whether or not to use a large size for the default GitHub button in the header.
   * Default is `false`.
   *
   */
  large?: boolean;

  /**
   *
   * Whether to use the standard GitHub icon for the default GitHub button
   * in the header, or to use action-specific icons. Default is `true`.
   *
   */
  standardIcon?: boolean;
}


/**
 *
 * Represents the Gitter configuration of the project.
 *
 */
export interface GitterConfig {
  /**
   *
   * The gitter room id of the project.
   *
   */
  room: string;
}


/**
 *
 * Represents the development configuration of the project.
 *
 */
export interface DevConfig {
  /**
   *
   * The local port to serve the docs on in development mode.
   *
   */
  port: number,
}


/**
 *
 * Represents a codedoc project configuration.
 *
 */
export interface CodedocConfig {
  /**
   *
   * Configuration of source files, i.e. markdown files of the docs.
   *
   */
  src: SourceConfig;

  /**
   *
   * Configuration of destination files, i.e. where codedoc should export
   * all generated stuff to.
   *
   */
  dest: DestConfig;

  /**
   *
   * Configuration of the client-side bundle.
   *
   */
  bundle: BundleConfig;

  /**
   *
   * Configuration of generated pages.
   *
   */
  page: {
    /**
     *
     * Configuration of the title of each page.
     *
     */
    title: TitleConfig;

    /**
     *
     * The URL for the favicon of pages. For a standard GitHub pages setup,
     * you can simply put your favicon in the root folder of your project
     * (i.e. `favicon.ico`) and set this to `"/favicon.ico"`.
     *
     */
    favicon?: string;

    /**
     *
     * Meta information for each page.
     *
     */
    meta?: MetaOptions;

    /**
     *
     * Configuration of fonts used in each page.
     *
     */
    fonts?: FontsOptions;

    /**
     *
     * A list of URLs for extra script files loaded in each page.
     *
     */
    scripts?: string[];

    /**
     *
     * A list of URLs for extra stylesheets loaded in each page.
     *
     */
    stylesheets?: string[];
  };
  /**
   *
   * The theme used for generating the docs.
   *
   */
  theme: CodedocTheme;

  /**
   *
   * Markdown options used to turn markdown into HTML.
   *
   */
  markdown: MarkdownConfig;

  /**
   *
   * Markdown options used for parsing the table of contents markdown file.
   *
   */
  tocMarkdown: MarkdownConfig;

  /**
   *
   * Development configuration.
   *
   */
  dev: DevConfig;

  /**
   *
   * Miscellaneous configuration.
   *
   */
  misc?: {
    /**
     *
     * Configuration for GitHub integration.
     *
     */
    github?: GithubConfig;

    /**
     *
     * Configuration for Gitter integration.
     *
     */
    gitter?: GitterConfig;
    [whatever: string]: any;
  }
}


export const DefaultMarkdownCustomComponents = {
  Tab, Tabs, Collapse,
  Button, Buttons, CopyButton,
  DarkLight, InDark, InLight,
  GithubButton, Watermark,
  ToCPrevNext: ToCPrevNext$,
};


export const DefaultToCMarkdownCustomComponents = {
  Button, Buttons, Collapse,
  DarkLight, InDark, InLight,
  GithubButton, Watermark,
};


export const DefaultConfig: CodedocConfig = {
  src: {
    base: 'docs/md',
    toc: '_toc.md',
    pick: /\.md$/,
    drop: /(^_)|(\/_)/,
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
      postNavSearch$,
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
    customComponents: DefaultMarkdownCustomComponents,
    BlockQuote: quotedComponents(DefaultMarkdownCustomComponents)
  },
  tocMarkdown: {
    Heading: ToCHeading,
    customComponents: DefaultToCMarkdownCustomComponents,
    BlockQuote: quotedComponents(DefaultToCMarkdownCustomComponents),
  },
}


/**
 *
 * An object denoting overrides for the default codedoc configuration.
 *
 */
export interface ConfigOverride {
  /**
   *
   * Configuration of source files, i.e. markdown files of the docs.
   *
   */
  src?: Partial<SourceConfig>;

  /**
   *
   * Configuration of destination files, i.e. where codedoc should export
   * all generated stuff to.
   *
   */
  dest?: Partial<DestConfig>;

  /**
   *
   * Configuration of the client-side bundle.
   *
   */
  bundle?: Partial<BundleConfig>;

  /**
   *
   * Development configuration.
   *
   */
  dev?: Partial<DevConfig>;

  /**
   *
   * Configuration of generated pages.
   *
   */
  page?: {
    /**
     *
     * Configuration of the title of each page.
     *
     */
    title?: Partial<TitleConfig>;

    /**
     *
     * The URL for the favicon of pages. For a standard GitHub pages setup,
     * you can simply put your favicon in the root folder of your project
     * (i.e. `favicon.ico`) and set this to `"/favicon.ico"`.
     *
     */
    favicon?: string;

    /**
     *
     * Meta information for each page.
     *
     */
    meta?: MetaOptions;

    /**
     *
     * Configuration of fonts used in each page.
     *
     */
    fonts?: FontsOptions;

    /**
     *
     * A list of URLs for extra script files loaded in each page.
     *
     */
    scripts?: string[];

    /**
     *
     * A list of URLs for extra stylesheets loaded in each page.
     *
     */
    stylesheets?: string[];
  }

  /**
   *
   * The theme used for generating the docs.
   *
   */
  theme?: CodedocTheme;

  /**
   *
   * Markdown options used to turn markdown into HTML.
   * 
   * **WARNING**: A lot of functionality of codedoc is based on its markdown components,
   * so be careful when you override this value. It is highly recommended to simply
   * extend the default value, i.e.
   *
   * ```ts
   * import { configuration, DefaultConfig } from '@codedoc/core';
   * 
   * const config = configuration({
   *   markdown: {
   *     ...DefaultConfig.markdown,
   *     Heading: MyCustomHeading,
   *   }
   * });
   * ```
   *
   */
  markdown?: Partial<MarkdownConfig>;

  /**
   *
   * Markdown options used for parsing the table of contents markdown file.
   * 
   * **WARNING**: A lot of functionality of codedoc is based on its markdown components,
   * so be careful when you override this value. It is highly recommended to simply
   * extend the default value, i.e.
   *
   * ```ts
   * import { configuration, DefaultConfig } from '@codedoc/core';
   * 
   * const config = configuration({
   *   tocMarkdown: {
   *     ...DefaultConfig.tocMarkdown,
   *     Heading: MyCustomHeading,
   *   }
   * });
   * ```
   *
   */
  tocMarkdown?: Partial<MarkdownConfig>;

  /**
   *
   * Miscellaneous configuration.
   *
   */
  misc?: {
    /**
     *
     * Configuration for GitHub integration. Providing this will by default
     * result in a link to your repo in the footer and a GitHub button in the header,
     * in addition to a ToC-search that would automatically search in the docs
     * via GitHub search API.
     *
     */
    github?: GithubConfig;

    /**
     *
     * Configuration for Gitter integration. Providing this by default
     * will result in automatic integration of Gitter chat on your documentation
     * page with a link for activating the chat in the footer.
     *
     */
    gitter?: GitterConfig;
    [whatevs: string]: any;
  }
}


/**
 *
 * Will create a codedoc configuration object (type `CodedocConfig`)
 * using the given config overrides. This will simply extend the default
 * configuration using given values in the overrides.
 *
 * @param override
 * @returns a complete codedoc configuration
 *
 */
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
    if (override.page.scripts) res.page.scripts = override.page.scripts;
    if (override.page.stylesheets) res.page.stylesheets = override.page.stylesheets;
  }

  if (override.dev) Object.assign(res.dev, override.dev);
  if (override.theme) res.theme = override.theme;
  if (override.markdown) {
    Object.assign(res.markdown, override.markdown);
    if (override.markdown.customComponents)
      res.markdown.BlockQuote = quotedComponents(override.markdown.customComponents);
  }

  if (override.tocMarkdown) {
    Object.assign(res.tocMarkdown, override.tocMarkdown);
    if (override.tocMarkdown.customComponents)
      res.markdown.BlockQuote = quotedComponents(override.tocMarkdown.customComponents);
  }

  if (override.misc) res.misc = override.misc;

  return res;
}
