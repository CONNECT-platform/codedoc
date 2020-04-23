import { state, sink } from '@connectv/core';
import { RendererLike, rl, toggleList, ref } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';
import { ThemedComponentThis } from '@connectv/jss-theme';

import { CodedocTheme } from '../../../../theme';
import { ToCToggleStyle } from './style';


export function ToCToggle(
  this: ThemedComponentThis<CodedocTheme>,
  _: any, 
  renderer: RendererLike<any, any>
) {
  const classes = this.theme.classes(ToCToggleStyle);
  const holder = ref<HTMLElement>();
  const active = state(false);

  this.track({
    bind() {
      const el = document.getElementById('-codedoc-toc');
      if (el) {
        holder.resolve(el);
        if (localStorage.getItem('-codedoc-toc-active') === 'true') {
          active.value = true;
        }

        setTimeout(() => el.classList.add('animated'), 1);
      }

      (window as any).codedocToggleToC = (v?: boolean) => {
        if (v !== undefined) active.value = v;
        else active.value = !active.value;
      }
    }
  });

  this.track(active.to(sink(active => {
    if (holder.resolved) {
      if (active) holder.$.classList.add('active');
      else holder.$.classList.remove('active');
    }

    localStorage.setItem('-codedoc-toc-active', active === true ? 'true' : 'false');
  })));

  return <div 
    class={rl`${classes.tocToggle} ${toggleList({ active })}`}
    onclick={() => active.value = !active.value}>
    <div class={classes.bar}/>
    <div class={classes.bar}/>
    <div class={classes.bar}/>
  </div>
}


export const ToCToggle$ = /*#__PURE__*/transport(ToCToggle);
export { ToCToggleStyle } from './style';