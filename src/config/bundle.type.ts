import { TransportedFunc } from '@connectv/sdh/dist/es6/dynamic/transport/index';

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
