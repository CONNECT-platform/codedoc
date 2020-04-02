import { RendererLike } from '@connectv/html';


type GithubBtnUserActions = 'Follow' | 'Sponsor';
type GithubBtnRepoUncountableActions = 'UseThisTemplate' | 'Download';
type GithubBtnRepoCountableActions  = 'Watch' | 'Star' | 'Fork' |'Issue';
export type GithubBtnActions = GithubBtnUserActions | GithubBtnRepoUncountableActions | GithubBtnRepoCountableActions;

export type GithubBtnColorMode = 'Light' | 'Dark';


interface GithubBtnOptionsBase {
  action: string;
  user: string;
  label?: string;
  ariaLabel?: string;
  icon?: string;
  standardIcon?: boolean | string;
  large?: boolean | string;
  color?: GithubBtnColorMode;
  colorLight?: GithubBtnColorMode;
  colorDark?: GithubBtnColorMode;
}


interface GithubBtnUserOptions extends GithubBtnOptionsBase {
  action: GithubBtnUserActions;
}


interface GithubBtnRepoOptions extends GithubBtnOptionsBase  {
  repo: string;
}

interface GithubBtnRepoUncountableOptions extends GithubBtnRepoOptions {
  action: GithubBtnRepoUncountableActions;
}


interface GithubBtnRepoCountableOptions extends GithubBtnRepoOptions {
  action: GithubBtnRepoCountableActions;
  count?: boolean | string;
}


function isCountable(options: GithubBtnOptionsBase):
    options is GithubBtnRepoCountableOptions {
  return options.action === 'Watch'
       || options.action === 'Star'
        || options.action === 'Fork'
         || options.action === 'Issue';
}


export type GithubBtnOptions = GithubBtnUserOptions | GithubBtnRepoCountableOptions | GithubBtnRepoUncountableOptions;


function info(options: GithubBtnOptions) {
  switch(options.action) {
    case 'Follow': return {
      ariaLabel: `Follow @${options.user} on GitHub`,
      label: `Follow @${options.user}`,
      link: `https://github.com/${options.user}`,
      icon: '',
    }
    case 'Sponsor': return { 
      ariaLabel: `Sponsor @${options.user} on GitHub`,
      label: 'Sponsor',
      link: `https://github.com/sponsors/${options.user}`,
      icon: 'octicon-heart',
    }
    case 'Watch': return {
      ariaLabel: `Watch ${options.user}/${options.repo} on GitHub`,
      label: 'Watch',
      link: `https://github.com/${options.user}/${options.repo}/subscription`,
      icon: 'octicon-eye',
    }
    case 'Star': return {
      ariaLabel: `Star ${options.user}/${options.repo} on GitHub`,
      label: 'Star',
      link: `https://github.com/${options.user}/${options.repo}/`,
      icon: 'octicon-star',
    }
    case 'Fork': return {
      ariaLabel: `Fork ${options.user}/${options.repo} on GitHub`,
      label: 'Fork',
      link: `https://github.com/${options.user}/${options.repo}/fork`,
      icon: 'octicon-repo-forked',
    }
    case 'UseThisTemplate': return {
      ariaLabel: `Use this template ${options.user}/${options.repo} on GitHub`,
      label: 'Use this template',
      link: `https://github.com/${options.user}/${options.repo}/generate`,
      icon: 'octicon-repo-template',
    }
    case 'Issue': return {
      ariaLabel: `Issue ${options.user}/${options.repo} on GitHub`,
      label: 'Issue',
      link: `https://github.com/${options.user}/${options.repo}/issues`,
      icon: 'octicon-issue-opened',
    }
    case 'Download': return {
      ariaLabel: `Download ${options.user}/${options.repo} on GitHub`,
      label: 'Download',
      link: `https://github.com/${options.user}/${options.repo}/archive/master.zip`,
      icon: 'octicon-cloud-download',
    }
  }
}


function schemeString(options: GithubBtnOptions) {
  return `no-preference: ${options.color === 'Dark'?'dark':'light'};` +
        ` light: ${options.colorLight === 'Dark'?'dark':'light'};` +
        ` dark: ${options.colorDark === 'Light'?'light':'dark'};`
}


function isTrue(val: boolean | string | undefined) { return val === true || val === 'true' }

export function GithubButton(options: GithubBtnOptions, renderer: RendererLike<any, any>) {
  const _info = info(options);
  return <a class="github-button"
              data-color-scheme={schemeString(options)}
              data-icon={isTrue(options.standardIcon)?false:(options.icon || _info.icon || false)}
              data-show-count={isCountable(options)?(isTrue(options.count)?'true':false):false}
              data-size={isTrue(options.large)?'large':false}
              href={_info.link}>
                {options.label || _info.label}
             </a>;
}