function isTouch(event: MouseEvent | TouchEvent): event is TouchEvent {
  return window.TouchEvent && event instanceof TouchEvent;
}


export class ToastSwipe {
  anchor: {x: number, y: number} | undefined = undefined;
  last: {x: number, y: number} | undefined = undefined;
  direction: 'horizontal' | 'vertical' | undefined = undefined;

  constructor(private container: HTMLElement, private remove: () => void) {
    container.addEventListener('mousedown', event => this.start(event));
    container.addEventListener('touchstart', event => this.start(event));
    document.addEventListener('mousemove', event => this.move(event));
    container.addEventListener('touchmove', event => this.move(event));
    document.addEventListener('mouseup', () => this.release());
    container.addEventListener('touchend', () => this.release());
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
