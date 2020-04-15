import { RendererLike } from '@connectv/html';
import { themedStyle, ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../theme';


const Duration = 1;
const Offset = 200;


export const LoadingStyle = /*#__PURE__*/themedStyle<CodedocTheme>(theme => ({
  holder: {
    position: 'relative',
    display: 'inline-flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5em', height: '1.5em',
  },

  spinner: {
    width: '100%',
    height: '100%',
    animation: `$rotate ${Duration * 1.17}s linear infinite`,
  },

  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },

  path: {
    strokeDasharray: Offset,
    strokeDashoffset: 0,
    transformOrigin: '33px 33px !important',
    fill: 'none',
    strokeWidth: 3,
    strokeLinecap: 'round',
    cx: '33px', cy: '33px', r: '30px',
    animation: `$dash ${Duration}s ease-in-out infinite`,

    stroke: 'white',
    '&.black': { stroke: 'black' },

    'body.dark-mode-animate &': { transition: 'color .3s', },

    '&.primary': {
      stroke: theme.light.primary,
      'body.dark &': { stroke: theme.dark.primary },
      '@media (prefers-color-scheme: dark)': { 'body:not(.dark-mode-animate)': { stroke: theme.dark.primary } },
    },

    '&.primary-contrast': {
      stroke: theme.light.primaryContrast,
      'body.dark &': { stroke: theme.dark.primaryContrast },
      '@media (prefers-color-scheme: dark)': { 'body:not(.dark-mode-animate)': { stroke: theme.dark.primaryContrast } },
    },

    '&.background': {
      stroke: theme.light.background,
      'body.dark &': { stroke: theme.dark.background },
      '@media (prefers-color-scheme: dark)': { 'body:not(.dark-mode-animate)': { stroke: theme.dark.background } },
    },

    '&.text': {
      stroke: theme.light.text,
      'body.dark &': { stroke: theme.dark.text },
      '@media (prefers-color-scheme: dark)': { 'body:not(.dark-mode-animate)': { stroke: theme.dark.text } },
    },
  },

  '@keyframes dash': {
    '0%': { strokeDashoffset: Offset },
    '50%': {
      strokeDashoffset: Offset/4,
      transform: 'rotate(45deg)',
    },
    '100%': {
      strokeDashoffset: Offset,
      transform: 'rotate(360deg)',
    }
  },
}));


export interface LoadingOptions {
  color?: 'white' | 'black' | 'primary' | 'primary-contrast' | 'background' | 'text';
}


export function Loading(
  this: ThemedComponentThis<CodedocTheme>,
  options: LoadingOptions,
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(LoadingStyle);

  return <div class={classes.holder}>
    <svg class={classes.spinner} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class={`${classes.path} ${options.color || ''}`} xmlns="http://www.w3.org/2000/svg"/>
    </svg>
  </div>
}
