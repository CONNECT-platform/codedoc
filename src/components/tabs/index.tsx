import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../theme';

import { TabsStyle } from './style';
import { TabSelector$ } from './selector';


export interface TabOptions {
  selected?: boolean;
  title?: string;
  icon?: string;
  id?: string;
}


export function Tab(options: TabOptions, renderer: RendererLike<any, any>, content: any) {
  const $tab = <div class="tab" 
                    data-tab-title={options.title || ''} 
                    data-tab-id={options.id || options.title || ''}>{content}</div>;

  if (options.selected) $tab.classList.add('selected');
  if (options.icon) $tab.setAttribute('data-tab-icon', options.icon);

  return $tab;
}


export function Tabs(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(TabsStyle);

  const holder = <fragment>{content}</fragment>;

  let first$: HTMLElement | undefined;
  let selected$: HTMLElement | undefined;

  holder.querySelectorAll('.tab').forEach(_tab$ => {
    const tab$ = _tab$ as HTMLElement;

    if (!first$) first$ = tab$;
    if (tab$.classList.contains('selected')) {
      if (selected$) tab$.classList.remove('selected');
      else selected$ = tab$;
    }
  });

  first$?.classList.add('first');
  if (!selected$) first$?.classList.add('selected');

  return <div class={classes.tabs}>
    <TabSelector$/>
    {holder}
  </div>
}


export { TabsStyle } from './style';