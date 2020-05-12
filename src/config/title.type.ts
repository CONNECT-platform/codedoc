import { File } from 'rxline/fs';


/**
 *
 * Denotes the configuration for title pages of the docs.
 *
 */
export interface TitleConfig<ConfType> {
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
  extractor: (content: HTMLElement, config: ConfType, file: File<string>) => string;
}
