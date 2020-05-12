import { quotedComponents, linkedComponents } from '@connectv/marked';

import { CodedocConfig } from './config.type';
import { ConfigOverride } from './override.type';


export type Plugin = (config: CodedocConfig) => ConfigOverride;


export function plug(config: CodedocConfig, plugin: Plugin) {
  const override = plugin(config);

  if (override.src) config.src = Object.assign({}, override.src, config.src);
  if (override.dest) config.dest = Object.assign({}, override.dest, config.dest);
  if (override.bundle) config.bundle.init = config.bundle.init.concat(override.bundle.init || []);
  if (override.page) {
    if (override.page.title) config.page.title = Object.assign({}, override.page.title, config.page.title);
    if (override.page.favicon) config.page.favicon = config.page.favicon || override.page.favicon;
    if (override.page.meta) config.page.meta = Object.assign({}, override.page.meta, config.page.meta, {
      keywords: [...config.page.meta?.keywords || [], ...override.page.meta.keywords || []]
    });
    if (override.page.fonts) config.page.fonts = Object.assign({}, override.page.fonts, config.page.fonts);
    if (override.page.scripts) config.page.scripts = (config.page.scripts || []).concat(override.page.scripts);
    if (override.page.stylesheets) 
      config.page.stylesheets = (config.page.stylesheets || []).concat(override.page.stylesheets);
    if (override.page.post) config.page.post = (config.page.post || []).concat(override.page.post);
  }

  if (override.dev) config.dev = Object.assign({}, override.dev, config.dev);
  if (override.markdown) {
    config.markdown = Object.assign({}, override.markdown, config.markdown, {
      customComponents: { ...override.markdown.customComponents, ...config.markdown.customComponents },
      customInlineComponents: 
      { ...override.markdown.customInlineComponents, ...config.markdown.customInlineComponents },
    });

    if (override.markdown.customComponents)
      config.markdown.BlockQuote = quotedComponents(config.markdown.customComponents);

    if (override.markdown.customInlineComponents)
      config.markdown.Link = linkedComponents(config.markdown.customInlineComponents);
  }

  if (override.tocMarkdown) {
    config.tocMarkdown = Object.assign({}, override.tocMarkdown, config.tocMarkdown, {
      customComponents: { ...override.tocMarkdown.customComponents, ...config.tocMarkdown.customComponents },
      customInlineComponents: 
      { ...override.tocMarkdown.customInlineComponents, ...config.tocMarkdown.customInlineComponents },
    });

    if (override.tocMarkdown.customComponents)
      config.tocMarkdown.BlockQuote = quotedComponents(config.tocMarkdown.customComponents);

    if (override.tocMarkdown.customInlineComponents)
      config.tocMarkdown.Link = linkedComponents(config.tocMarkdown.customInlineComponents);
  }

  if (override.misc) config.misc = Object.assign({}, override.misc, config.misc);

  return config;
}
