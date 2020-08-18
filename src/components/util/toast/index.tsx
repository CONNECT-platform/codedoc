import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { BehaviorSubject } from 'rxjs';

import { ToastStyle } from './style';
import { ToastSwipe } from './swipe';
import { CodedocTheme } from '../../../transport';
import { Icon } from '../../misc';


export interface ToastOptions {
  actions?: any;
  timeout?: number;
}


export function Toast(
  this: ThemedComponentThis<CodedocTheme>,
  options: ToastOptions,
  renderer: RendererLike<any, any>,
  content: any
) {
  const classes = this.theme.classes(ToastStyle);
  const visible = new BehaviorSubject(false);

  const container$ = 
    <div class={classes.container} data-visible={visible}>
      <div class={classes.toast}>
        <div class={classes.content}>{content}</div>
        <div class={classes.actions}>
          {options.actions || ''}
          <button onclick={() => hide()}><Icon>close</Icon></button>
        </div>
      </div>
    </div>;

  const show = () => visible.next(true);
  const hide = () => {
    visible.next(false);
    remove();
  };
  const remove = () => setTimeout(() => container$.remove(), 150);

  const swipe = new ToastSwipe(container$, remove);

  this.track({
    bind() {
      setTimeout(show, 10);
      if (!('backdropFilter' in container$.style) && !('-webkit-backdrop-filter' in container$.style)) {
        container$.classList.add('no-blur');
      }

      const timeout = options.timeout || 3000;
      if (timeout !== -1) {
        setTimeout(() => {
          if (!swipe.active())
            hide();
        }, timeout);
      }
    }
  });

  return container$;
}
