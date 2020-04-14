import { RendererLike, ComponentThis } from '@connectv/html';


const style = `
  position: fixed;
  z-index: 1000;
  left: 0; right: 0; top: 0; bottom: 0;
  cursor: pointer;
  background: rgba(64, 64, 64, .65);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: white;
  opacity: 0;
  transition: opacity .1s;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
`;


export function Overlay(this: ComponentThis, _: any, renderer: RendererLike<any, any>, content: any) {
  const container$ = 
    <div style={style} onclick={() => hide()}>
      <div style='text-align: center; max-width: calc(75vw - 32px);max-height: calc(75vw - 32px); overflow: auto; padding: 16px'>
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
