import { RendererLike } from '@connectv/html';

import { GithubBtnOptions, isCountable } from './types';
import { defaults } from './defaults';


function schemeString(options: GithubBtnOptions) {
  return `no-preference: ${options.color === 'Dark'?'dark':'light'};` +
        ` light: ${options.colorLight === 'Dark'?'dark':'light'};` +
        ` dark: ${options.colorDark === 'Light'?'light':'dark'};`
}


function isTrue(val: boolean | string | undefined) { return val === true || val === 'true' }


export function GithubButton(options: GithubBtnOptions, renderer: RendererLike<any, any>) {
  const _defaults = defaults(options);
  return <fragment>
    <script async defer src="https://buttons.github.io/buttons.js"/>
    <a class="github-button"
              data-color-scheme={schemeString(options)}
              data-icon={isTrue(options.standardIcon)?false:(options.icon || _defaults.icon || false)}
              data-show-count={isCountable(options)?(isTrue(options.count)?'true':false):false}
              data-size={isTrue(options.large)?'large':false}
              href={options.link || _defaults.link}>
                {options.label || _defaults.label}
    </a>
  </fragment>;
}


export * from './types';
export * from './search';