/* eslint-disable no-constructor-return */
import Event from './Event';

export default class RafEvent extends Event {
  constructor() {
    super({ el: window, name: 'raf' });

    if (RafEvent.exists) {
      return RafEvent.instance;
    }

    RafEvent.instance = this;
    RafEvent.exists = true;

    return this;
  }

  init() {
    if (this.enabled) {
      requestAnimationFrame((time) => {
        this.trigger(time);
        this.init();
      });
    }
  }

  destroy() {
    this.el.removeEventListener(this.eventName, this.trigger);
  }
}
