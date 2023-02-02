import Swipe from '@scripts/managers/Swipe';

export default class Slider {
  constructor(element, opt = {}) {
    this.el = element;

    this.currentIndex = 0;
    this.prevIndex = null;

    this.isUpdating = false;

    this.swipeX = opt.swipeX ? opt.swipeX : true;
    this.swipeY = opt.swipeY ? opt.swipeY : false;
    this.length = opt.length ? opt.length : 0;
    this.cb = opt.cb ? opt.cb : () => { setTimeout(() => { this.done(); }, 500); };
    this.loop = opt.loop ? opt.loop : true;

    this.pagerNext = opt.pagerNext ? opt.pagerNext : null;
    this.pagerPrev = opt.pagerPrev ? opt.pagerPrev : null;

    this.auto = opt.auto ? opt.auto : false;
    this.intervalTime = opt.intervalTime ? opt.intervalTime : 1500;

    this.bindMethods(['prev', 'next']);
    this.auto && this.setAuto();
    this.events();
  }

  bindMethods(methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  next() {
    if (this.isUpdating) return false;

    this.prevIndex = this.currentIndex;
    this.dir = -1;

    if (this.currentIndex !== this.length) this.currentIndex += 1;
    else if (this.loop) this.currentIndex = 0;
    else return false;

    this.update();
    return true;
  }

  prev() {
    if (this.isUpdating) return false;

    this.prevIndex = this.currentIndex;
    this.dir = 1;

    if (this.currentIndex !== 0) this.currentIndex -= 1;
    else if (this.loop) this.currentIndex = this.length;
    else return false;

    this.update();
    return true;
  }

  to(index) {
    if (this.isUpdating) return false;

    this.currentIndex = index;
    this.update();

    return true;
  }

  update() {
    this.isUpdating = true;
    this.cb();
  }

  done() {
    this.isUpdating = false;
  }

  setAuto() {
    this.interval = setInterval(() => {
      this.next();
    }, this.intervalTime);
  }

  events() {
    this.pagerNext.addEventListener('click', this.next);
    this.pagerPrev.addEventListener('click', this.prev);

    if (this.swipeX || this.swipeY) {
      this.Swiper = new Swipe(
        {
          el: this.el,
          swipeX: this.swipeX,
          swipeY: this.swipeY,
        },
        {
          left: () => { this.next(); },
          right: () => { this.prev(); },
        },
      );
    }
  }

  getCurrent() {
    return this.currentIndex;
  }

  getPrev() {
    return this.prevIndex;
  }

  destroy() {
    this.pagerNext.removeEventListener('click', this.next);
    this.pagerPrev.removeEventListener('click', this.prev);
  }
}
