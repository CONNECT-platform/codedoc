import { RendererLike, ComponentThis } from '@connectv/html';


const style = `
  position: fixed;
  z-index: 1000;
  left: 0; right: 0; top: 0; bottom: 0;
  cursor: pointer;
  background: rgba(0, 0, 0, .65);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: white;
  opacity: 0;
  transition: opacity .1s;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;


export function Overlay(this: ComponentThis, _: any, renderer: RendererLike<any, any>, content: any) {
  const container$ = 
    <div style={style} onclick={() => hide()}>
      <div style='text-align: center; max-width: 75vw;max-height: 75vw; overflow: auto'>
        {content}
      </div>
    </div>;

  const show = () => container$.style.opacity = '1';
  const hide = () => {
    container$.style.opacity = '0';
    setTimeout(() => container$.remove(), 100);
  };
  
  this.track({
    bind: () => setTimeout(show, 10)
  });

  return container$;
}
