/* eslint-disable no-constructor-return */
/**
 * TODO
 * Add debounce throttle to event to avoid to much recursion
 * Add direction
 */
import store from '@scripts/utils/store';
import Event from './Event';

export default class ScrollEvent extends Event {
  constructor() {
    super({ el: window, name: 'scroll' });

    if (ScrollEvent.exists) {
      return ScrollEvent.instance;
    }

    ScrollEvent.instance = this;
    ScrollEvent.exists = true;

    return this;
  }

  init() {
    store.smth.on('scroll', this.trigger);
  }

  setEventData(e) {
    this.e = e;
    this.e.scrollDiff = this.e.scroll - this.scrollPos;
    this.scrollPos = this.e.scroll;
  }
}
