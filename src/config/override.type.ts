import { MetaOptions } from '../components/page/meta';
import { FontsOptions } from '../components/page/fonts';
import { CodedocTheme } from '../theme';

import { PostProcessor } from './post-processor.type';
import { SourceConfig } from './source.type';
import { DestConfig } from './dest.type';
import { BundleConfig } from './bundle.type';
import { TitleConfig } from './title.type';
import { MarkdownConfig } from './markdown.type';
import { DevConfig } from './dev.type';
import { GithubConfig, GitterConfig } from './misc.type';
import { CodedocConfig } from './config.type';
import { AfterBuild } from './after-build.type';

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
    title?: Partial<TitleConfig<CodedocConfig>>;

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
     * A list of external script elements to be loaded.
     *
     */
    scripts?: HTMLElement[];

    /**
     *
     * A list of external stylesheet elements (link elements) to be loaded.
     *
     */
    stylesheets?: HTMLElement[];

    /**
     *
     * A list of post processor functions to post-process each page.
     *
     */
    post?: PostProcessor<CodedocConfig>[];
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
   * Functions to be called after each build.
   *
   */
  afterBuild?: AfterBuild<CodedocConfig>[];

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
