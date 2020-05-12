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
   * The name of the markdown file that is to be used in case of 404 in
   * local dev. Note that this does not necessarily mean that your hosting
   * provider will also serve this file in case of 404, and further configuration
   * is required. Default is `'404.md'`.
   * 
   */
  not_found: string;

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