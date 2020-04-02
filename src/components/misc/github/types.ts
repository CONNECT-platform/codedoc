type GithubBtnUserActions = 'Follow' | 'Sponsor';
type GithubBtnRepoUncountableActions = 'UseThisTemplate' | 'Download';
type GithubBtnRepoCountableActions  = 'Watch' | 'Star' | 'Fork' |'Issue';
export type GithubBtnActions = GithubBtnUserActions | GithubBtnRepoUncountableActions | GithubBtnRepoCountableActions;

export type GithubBtnColorMode = 'Light' | 'Dark';


interface GithubBtnOptionsBase {
  action: string;
  user: string;
  link?: string;
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


export function isCountable(options: GithubBtnOptionsBase):
    options is GithubBtnRepoCountableOptions {
  return options.action === 'Watch'
       || options.action === 'Star'
        || options.action === 'Fork'
         || options.action === 'Issue';
}


export type GithubBtnOptions = GithubBtnUserOptions | GithubBtnRepoCountableOptions | GithubBtnRepoUncountableOptions;
