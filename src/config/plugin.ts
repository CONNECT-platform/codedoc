import { ConfigOverride } from './override.type';


export type Plugin = (config: ConfigOverride) => ConfigOverride;


export function plug(config: ConfigOverride, plugin: Plugin) {
  const res: ConfigOverride = { ...config };
  const override = plugin(config);

  if (override.src) res.src = Object.assign({}, override.src, config.src);
  if (override.dest) res.dest = Object.assign({}, override.dest, config.dest);
  if (override.bundle) {
    res.bundle = res.bundle || {};
    res.bundle.init = [...config.bundle?.init || [], ...override.bundle.init || []];
  }
  if (override.afterBuild) {
    res.afterBuild = [...config.afterBuild || [], ... override.afterBuild];
  }
  if (override.page) {
    res.page = res.page || {};
    if (override.page.title) res.page.title = Object.assign({}, override.page.title, config.page?.title);
    if (override.page.favicon) res.page.favicon = config.page?.favicon || override.page.favicon;
    if (override.page.meta) res.page.meta = Object.assign({}, override.page.meta, config.page?.meta, {
      keywords: [...config.page?.meta?.keywords || [], ...override.page.meta.keywords || []]
    });
    if (override.page.fonts) res.page.fonts = Object.assign({}, override.page.fonts, config.page?.fonts);
    if (override.page.scripts) res.page.scripts = (config.page?.scripts || []).concat(override.page.scripts);
    if (override.page.stylesheets) 
      res.page.stylesheets = (config.page?.stylesheets || []).concat(override.page.stylesheets);
    if (override.page.post) res.page.post = (config.page?.post || []).concat(override.page.post);
  }

  if (override.dev) config.dev = Object.assign({}, override.dev, config.dev);
  if (override.markdown) {
    res.markdown = Object.assign({}, override.markdown, config.markdown, {
      customComponents: { ...override.markdown.customComponents, ...config.markdown?.customComponents },
      customInlineComponents: 
      { ...override.markdown.customInlineComponents, ...config.markdown?.customInlineComponents },
    });
  }

  if (override.tocMarkdown) {
    res.tocMarkdown = Object.assign({}, override.tocMarkdown, config.tocMarkdown, {
      customComponents: { ...override.tocMarkdown.customComponents, ...config.tocMarkdown?.customComponents },
      customInlineComponents: 
      { ...override.tocMarkdown.customInlineComponents, ...config.tocMarkdown?.customInlineComponents },
    });
  }

  if (override.misc) res.misc = Object.assign({}, override.misc, config.misc);

  return res;
}
