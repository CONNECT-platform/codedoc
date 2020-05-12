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