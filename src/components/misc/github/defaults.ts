import { GithubBtnOptions } from './types';


export function defaults(options: GithubBtnOptions) {
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
