import { transport } from '@connectv/sdh/transport';
import { RendererLike, ComponentThis, List, toggleList, ref } from '@connectv/html';
import { state, map } from '@connectv/core';


export function TabSelector(this: ComponentThis, _: any, renderer: RendererLike<any, any>) {
  type _TabType = { title: string; id: string; el$: HTMLElement; icon?: string };

  const tabs = state([]);
  const selected = state();

  const holder = ref<HTMLElement>();

  this.track({
    bind() {
      selected.bind();
      const _tabs: _TabType[] = [];
      holder.$.parentElement?.querySelectorAll('.tab').forEach(tab$ => {
        _tabs.push({ 
          title: tab$.getAttribute('data-tab-title') || '', 
          id: tab$.getAttribute('data-tab-id') || '',
          el$: tab$ as HTMLElement,
          icon: tab$.getAttribute('data-tab-icon') || undefined,
        });
        if (tab$.classList.contains('selected'))
          selected.value = tab$.getAttribute('data-tab-title');
      });

      tabs.bind();
      tabs.value = _tabs;
    }
  });

  return <div class="selector" _ref={holder}>
    <List of={tabs} each={tab => 
      <button class={toggleList({selected: selected.to(map((s: string) => s === tab.value.id))})}
        data-tab-title={tab.value.title}
        data-tab-id={tab.value.id}
        onclick={() => {
          tabs.value.forEach((tab: _TabType) => {
            tab.el$.classList.remove('selected');
          });

          tab.value.el$.classList.add('selected');
          selected.value = tab.value.id;
        }}>
          {tab.value.title}
          {tab.value.icon?<span class="icon-font">{tab.value.icon}</span>:''}
        </button>}
    />
  </div>;
}


export const TabSelector$ = /*#__PURE__*/transport(TabSelector);
