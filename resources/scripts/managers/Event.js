export default class Event {
  constructor(opt = { el: window, name: '' }) {
    this.el = opt.el;
    this.eventName = opt.name;
    this.id = Math.ceil(Math.random() * 100);
    this.cb = [];

    this.trigger = this.trigger.bind(this);
    this.init = this.init.bind(this);

    this.enabled = true;
    this.on();
    this.init();
    this.e = {};
  }

  add(cb) {
    this.cb.push(cb);
  }

  addFirst(cb) {
    this.cb.unshift(cb);
  }

  remove(cb) {
    const i = this.cb.indexOf(cb);
    i !== -1 && this.cb.splice(i, 1);
  }

  on() { this.enabled = true; }

  off() { this.enabled = false; }

  toogle() { this.enabled = !this.enabled; }

  trigger(e) {
    this.setEventData(e);
    this.enabled && this.cb.length && this.cb.forEach((cb) => {
      cb(this.e);
    });
  }

  init() {
    this.el.addEventListener(this.eventName, this.trigger);
  }

  destroy() {
    this.el.removeEventListener(this.eventName, this.trigger);
  }

  setEventData(e) {
    this.e = e;
  }

  log() {
    // eslint-disable-next-line no-console
    console.log(this);
  }
}
