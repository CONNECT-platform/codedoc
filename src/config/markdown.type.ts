import { PartialOptions as MarkdownOptions, ComponentMap } from '@connectv/marked';

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

  /**
   *
   * A component map for custom inline components.
   *
   * **WARNING**: since some of features of codedoc come from its custom inline markdown
   * components, it is highly recommended to extend the default custom inline components
   * for adding your own components:
   *
   * ```tsx
   * import { configuration, DefaultConfig } from '@codedoc/core';
   * 
   * export const config = configuration({
   *   markdown: {
   *      customInlineComponents: {
   *        ...DefaultConfig.markdown.customInlineComponents,
   *        MyComponent,
   *      }
   *   },
   *   tocMarkdown: {
   *     customInlineComponents: {
   *       ...DefaultConfig.tocMarkdown.customInlineComponents,
   *       MyToCComponent,
   *     }
   *   }
   * });
   * ```
   *
   */
  customInlineComponents: ComponentMap;
}
