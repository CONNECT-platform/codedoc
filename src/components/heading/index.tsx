import { RendererLike } from '@connectv/html';
import { ThemedComponentThis, themedStyle } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';


export const HeadingStyle = themedStyle<CodedocTheme>(theme => ({
  heading: {
    cursor: 'pointer',
    position: 'relative',

    '& .icon-font': {
      position: 'absolute',
      left: '-32px',
      paddingRight: '8px',
      top: 0, bottom: 0,
      display: 'flex',
      alignItems: 'center',
      opacity: 0,
      transform: 'translateX(-8px)',
      transition: 'opacity .1s, transform .1s',
    },

    '&:hover .icon-font': {
      opacity: .5,
      transform: 'none',

      '&:hover': {
        opacity: 1,
      },
    },
  }
}));


export interface HeadingOptions {
  depth: number;
  slug: string;
}


export function Heading(
  this: ThemedComponentThis<CodedocTheme>,
  options: HeadingOptions, 
  renderer: RendererLike<any, any>, 
  content: any
) {
  const classes = this.theme.classes(HeadingStyle);

  let h$;
  if (options.depth === 1) h$ = <h1 id={options.slug} class={classes.heading}/>;
  else if (options.depth === 2) h$ = <h2 id={options.slug} class={classes.heading}/>;
  else if (options.depth === 3) h$ = <h3 id={options.slug} class={classes.heading}/>;
  else if (options.depth === 4) h$ = <h4 id={options.slug} class={classes.heading}/>;
  else if (options.depth === 5) h$ = <h5 id={options.slug} class={classes.heading}/>;
  else h$ = <h6 id={options.slug} class={classes.heading}/>;

  renderer.render(
    <fragment>
      <span class="icon-font">link</span>
      {content}
    </fragment>
  ).on(h$);

  return h$;
}
