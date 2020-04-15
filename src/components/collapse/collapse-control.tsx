import { RendererLike, ref, ComponentThis } from '@connectv/html';
import { transport } from '@connectv/sdh/transport';


export function CollapseControl(this: ComponentThis, _: any, renderer: RendererLike<any, any>) {
  const marker = ref<HTMLElement>();

  this.track({
    bind() {
      const parent = marker.$.parentElement;
      if (parent) {
        parent.addEventListener('collapse-open', () => parent.classList.add('open'));
        parent.addEventListener('collapse-close', () => parent.classList.remove('open'));
        parent.addEventListener('collapse-toggle', () => parent.classList.toggle('open'));
      }
    }
  });

  return <span hidden _ref={marker}/>;
}


export const CollapseControl$ = /*#__PURE__*/transport(CollapseControl);
