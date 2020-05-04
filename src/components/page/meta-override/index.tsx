import { RendererLike } from '@connectv/html';

import { OverrideTarget, OverrideBehavior } from './types';


export interface MetaOverrideOptions {
  target: OverrideTarget,
  behavior?: OverrideBehavior,
}


export function MetaOverride(options: MetaOverrideOptions, renderer: RendererLike<any, any>, content: any) {
  return <div hidden data-ignore-text
            data-meta-override={options.target}
            data-meta-override-behavior={options.behavior || 'replace'}
            >{content}</div>;
}
