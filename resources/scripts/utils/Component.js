/**
 * Class that take an element to be binded to
 *
 * Lyfecycle :
 *  init()
 *  setup()
 *  initEvents()
 *  ready()
 *  destroyEvents()
 *  destroy()
 *  afterDestroy()
 */
import RafEvent from '@scripts/managers/RAF';
import ScrollEvent from '@scripts/managers/Scroll';
import ResizeEvent from '@scripts/managers/Resize';
// import store from './store';

export default class Component {
  constructor(el) {
    this.el = el;
    this.id = Math.random() * 100;

    // to watch a prop add a key that is a function
    // and then this.props.prop change will trigger the callback
    this.watch = this.toWatch();

    this.listenedProps = {};
    this.listenCb = {};

    this.setVarListeners();

    this.init();
    this.setup();
    this.eventsCb = {};
    this.initEvents();

    this.ready();
  }

  bindMethods(methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  init() {}

  setup() {}

  initEvents() {
    // Globals callbacks to add on app level
    this.setEvent('raf', RafEvent);
    this.setEvent('scroll', ScrollEvent);
    this.setEvent('resize', ResizeEvent);
  }

  destroyEvents() {
    // remove every listeners precedently added
    this.destroyEvent('raf', RafEvent);
    this.destroyEvent('scroll', ScrollEvent);
    this.destroyEvent('resize', ResizeEvent);
  }

  ready() {}

  toWatch() {}

  destroy() {
    this.destroyEvents();
  }

  afterDestroy() {}

  setVarListeners() {
    Object.entries({ ...this.props, ...this.watch }).forEach((entry) => {
      const key = entry[0];
      this.listenedProps[key] = key;
      // eslint-disable-next-line prefer-destructuring
      this.listenCb[key] = entry[1];
    });

    this.props = new Proxy(this.listenedProps, {
      set: (target, key, value) => {
        if (target[key] === value) return true;
        if (typeof this.listenCb[key] === 'function') this.listenCb[key](target[key], value);

        // eslint-disable-next-line no-param-reassign
        target[key] = value;

        return true;
      },
    });
  }

  setEvent(method, EventName) {
    if (!this[method]) return false;
    if (!this[EventName]) this[EventName] = new EventName();
    this.eventsCb[method] = this[method];
    this[EventName].add(this.eventsCb[method]);
    return true;
  }

  destroyEvent(method, EventName) {
    if (!this[method]) return false;
    this[EventName] && this[EventName].remove(this.eventsCb[method]);
    delete this.eventsCb[method];
    return true;
  }

  // scroll() {}

  // raf() {}

  // resize() {}
}
