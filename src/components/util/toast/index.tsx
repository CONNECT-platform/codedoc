import { RendererLike } from '@connectv/html';
import { ThemedComponentThis } from '@connectv/jss-theme';
import { BehaviorSubject } from 'rxjs';

import { ToastStyle } from './style';
import { CodedocTheme } from '../../../transport';
import { Icon } from '../../misc';


export interface ToastOptions {
  actions?: any;
  timeout?: number;
}


function isTouch(event: MouseEvent | TouchEvent): event is TouchEvent {
  return window.TouchEvent && event instanceof TouchEvent;
}


class ToastDrag {
  anchor: {x: number, y: number} | undefined = undefined;
  last: {x: number, y: number} | undefined = undefined;
  direction: 'horizontal' | 'vertical' | undefined = undefined;

  constructor(private container: HTMLElement, private remove: () => void) {
    container.addEventListener('mousedown', event => this.start(event));
    container.addEventListener('touchstart', event => this.start(event));
    document.addEventListener('mousemove', event => this.move(event));
    container.addEventListener('touchmove', event => this.move(event));
    document.addEventListener('mouseup', event => this.release());
    container.addEventListener('touchend', event => this.release());
  }

  getPos(event: MouseEvent | TouchEvent) {
    if (isTouch(event)) {
      return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    } else {
      return { x : event.clientX, y: event.clientY };
    }
  }

  start(event: MouseEvent | TouchEvent) {
    this.anchor = this.getPos(event);
    this.last = this.anchor;
  }

  move(event: MouseEvent | TouchEvent) {
    if (this.anchor) {
      event.stopPropagation();
      event.preventDefault();
      const pos = this.getPos(event);
      this.last = pos;
      const dx = pos.x - this.anchor.x;
      const dy = pos.y - this.anchor.y;
      if (!this.direction) {
        if (Math.sqrt(dx * dx + dy * dy) > 16) {
          if (Math.abs(dx) > Math.abs(dy)) {
            this.direction = 'horizontal';
          } else {
            this.direction = 'vertical';
          }
        }
      }

      if (this.direction) {
        this.container.classList.add('moving');
        if (this.direction === 'horizontal') {
          this.container.style.transform = `translateX(${dx}px)`;
        } else {
          this.container.style.transform = `translateY(${dy}px)`;
        }
      }
    }
  }

  release() {
    if (this.anchor && this.last) {
      this.container.classList.remove('moving');

      const dx = this.last.x - this.anchor.x;
      const dy = this.last.y - this.anchor.y;
      if (Math.sqrt(dx * dx + dy * dy) > 128) {
        if (this.direction === 'horizontal') {
          this.container.style.transform = `translateX(${2 * dx}px)`;
        } else {
          this.container.style.transform = `translateY(${2 * dy}px)`;
        }
        this.container.style.opacity = '0';
        this.remove();
      } else {
        this.container.style.transform = '';
      }

      this.anchor = undefined;
      this.last = undefined;
      this.direction = undefined;
    }
  }

  active() {
    return this.anchor !== undefined;
  }
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

  const drag = new ToastDrag(container$, remove);

  this.track({
    bind() {
      setTimeout(show, 10);
      if (!('backdropFilter' in container$.style) && !('-webkit-backdrop-filter' in container$.style)) {
        container$.classList.add('no-blur');
      }

      const timeout = options.timeout || 3000;
      if (timeout !== -1) {
        setTimeout(() => {
          if (!drag.active())
            hide();
        }, timeout);
      }
    }
  });

  return container$;
}
