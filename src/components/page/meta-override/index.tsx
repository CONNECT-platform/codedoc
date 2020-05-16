import { RendererLike } from '@connectv/html';

import { OverrideTarget, OverrideBehavior } from './types';


export interface MetaOverrideOptions {
  target?: OverrideTarget,
  behavior?: OverrideBehavior,
  property?: string;
}


export function MetaOverride(options: MetaOverrideOptions, renderer: RendererLike<any, any>, content: any) {
  const opts: {[key: string]: string} = {};
  if (options.target) {
    opts['data-meta-override'] = options.target;
    opts['data-meta-override-behavior'] = options.behavior || 'replace';
  } else if (options.property) {
    opts['data-meta-override-property'] = options.property;
  }

  return <div hidden data-ignore-text {...opts}>{content}</div>;
}
