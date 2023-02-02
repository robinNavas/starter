import gsap from 'gsap';
import store from './store';

export default class Navbar {
  constructor(el) {
    this.el = el;
    this.isVisible = true;

    this.scrolledVal = 0;
    this.treshold = 150;

    this.bindMethods();

    this.initTl();
    this.init();
  }

  bindMethods() {
    this.scroll = this.scroll.bind(this);
    this.resize = this.resize.bind(this);
  }

  init() {
    if (store.w.x < this.mobileBp) this.isMobile = false;
    else this.isMobile = true;
  }

  initTl() {
    this.hideTl = gsap.timeline({
      paused: true,
    })
      .to(this.el, {
        yPercent: -100,
      });

    this.showTl = gsap.timeline({
      paused: true,
    })
      .to(this.el, {
        yPercent: 0,
      });
  }

  hide() {
    if (!this.isVisible || this.isAnimated) return false;

    this.isAnimated = true;
    return new Promise((resolve) => {
      this.hideTl
        .restart()
        .then(() => {
          this.isVisible = false;
          this.isAnimated = false;
          resolve();
        });
    });
  }

  show() {
    if (this.isVisible || this.isAnimated) return false;

    this.isAnimated = true;
    return new Promise((resolve) => {
      this.showTl
        .restart()
        .then(() => {
          this.isVisible = true;
          this.isAnimated = false;
          resolve();
        });
    });
  }

  scroll(e) {
    if (Number.isNaN(this.scrolledVal)) this.scrolledVal = 0;

    if (e.direction === 1) this.scrolledVal += e.scrollDiff;
    else this.scrolledVal = 0;

    if (this.isVisible === true && e.direction === 1 && this.scrolledVal > this.treshold) {
      this.scrolledVal = 0;
      this.hide();
    }

    if (this.isVisible === false && e.direction === -1) {
      this.scrolledVal = 0;
      this.show();
    }
  }

  resize() {
    if (!this.isMobile && store.w.x < this.mobileBp) {
      this.isMobile = true;
    } else if (this.isMobile && store.w.x >= this.mobileBp) {
      this.isMobile = false;
    }
  }
}
