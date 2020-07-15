import { quotedComponents, linkedComponents } from '@connectv/marked';

import { DefaultConfig, DefaultMarkdownCustomComponents, DefaultMarkdownCustomInlineComponents, DefaultToCMarkdownCustomComponents, DefaultToCMarkdownCustomInlineComponents } from './defaults';
import { ConfigOverride } from './override.type';
import { CodedocConfig } from './config.type';
import { Plugin, plug } from './plugin';


export interface ConfigType extends ConfigOverride {
  plugins?: Plugin[];
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
export function configuration(override: ConfigType): CodedocConfig {
  const res = { ...DefaultConfig };

  if (override.plugins) override = [
    ...override.plugins,
    () => ({
      markdown: {
        customComponents: DefaultMarkdownCustomComponents,
        customInlineComponents: DefaultMarkdownCustomInlineComponents,
      },
      tocMarkdown: {
        customComponents: DefaultToCMarkdownCustomComponents,
        customInlineComponents: DefaultToCMarkdownCustomInlineComponents,
      },
      bundle: {
        init: DefaultConfig.bundle.init
      },
      afterBuild: DefaultConfig.afterBuild,
    }),
  ].reduce(plug, override);

  if (override.src) Object.assign(res.src, override.src);
  if (override.dest) Object.assign(res.dest, override.dest);
  if (override.bundle) Object.assign(res.bundle, override.bundle);
  if (override.afterBuild) res.afterBuild = override.afterBuild;
  if (override.page) {
    if (override.page.title) Object.assign(res.page.title, override.page.title);
    if (override.page.favicon) res.page.favicon = override.page.favicon;
    if (override.page.meta) res.page.meta = override.page.meta;
    if (override.page.fonts) res.page.fonts = override.page.fonts;
    if (override.page.scripts) res.page.scripts = override.page.scripts;
    if (override.page.stylesheets) res.page.stylesheets = override.page.stylesheets;
    if (override.page.post) res.page.post = [...(res.page.post || []), ...override.page.post];
  }

  if (override.dev) Object.assign(res.dev, override.dev);
  if (override.theme) res.theme = override.theme;
  if (override.markdown) Object.assign(res.markdown, override.markdown);
  if (override.tocMarkdown) Object.assign(res.tocMarkdown, override.tocMarkdown);

  res.markdown.Link = linkedComponents(res.markdown.customInlineComponents);
  res.tocMarkdown.Link = linkedComponents(res.tocMarkdown.customInlineComponents);

  res.markdown.BlockQuote = quotedComponents(res.markdown.customComponents);
  res.tocMarkdown.BlockQuote = quotedComponents(res.tocMarkdown.customComponents);

  if (override.misc) res.misc = override.misc;

  return res;
}


export * from './config.type';
export * from './override.type';
export * from './defaults';
export { Build } from './after-build.type';
