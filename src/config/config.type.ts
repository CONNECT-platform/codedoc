import { FontsOptions } from '../components/page/fonts';
import { MetaOptions } from '../components/page/meta';
import { CodedocTheme } from '../theme';

import { PostProcessor } from './post-processor.type';
import { SourceConfig } from './source.type';
import { DestConfig } from './dest.type';
import { BundleConfig } from './bundle.type';
import { TitleConfig } from './title.type';
import { MarkdownConfig } from './markdown.type';
import { DevConfig } from './dev.type';
import { GithubConfig, GitterConfig } from './misc.type';
import { AfterBuild } from './after-build.type';

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
    title: TitleConfig<CodedocConfig>;

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
     * A list of external script elements loaded in each page.
     *
     */
    scripts?: HTMLElement[];

    /**
     *
     * A list of external stylesheets (link elements) to be loaded in each page.
     *
     */
    stylesheets?: HTMLElement[];

    /**
     *
     * A list of post processor functions to post-process each page
     *
     */
    post?: PostProcessor<CodedocConfig>[];
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
   * After build functions to be executed after each build.
   *
   */
  afterBuild: AfterBuild<CodedocConfig>[];

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
