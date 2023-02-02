/* eslint-disable no-constructor-return */
import store from '@scripts/utils/store';
import Event from './Event';

export default class ResizeEvent extends Event {
  constructor() {
    super({ el: window, name: 'resize' });

    if (ResizeEvent.exists) {
      return ResizeEvent.instance;
    }

    ResizeEvent.instance = this;
    ResizeEvent.exists = true;

    this.add(this.windowUpdate);
    return this;
  }

  windowUpdate() {
    store.w.x = window.innerWidth;
    store.w.y = window.innerHeight;
  }
}
