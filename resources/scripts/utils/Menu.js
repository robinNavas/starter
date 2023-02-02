import gsap from 'gsap';
import store from './store';

export default class Menu {
  constructor(el, toggler) {
    this.el = el;
    this.$toggler = toggler;
    this.isOpen = false;
    this.isAnimated = false;

    this.bindMethods();
    this.getElems();
    this.init();
    this.initTl();
    this.settings();
    this.events();
    this.onPageChange(window.location.pathname);
  }

  bindMethods() {
    this.toggle = this.toggle.bind(this);
    this.resize = this.resize.bind(this);
  }

  settings() {
    // TODO: Change that to have it globally
    this.mobileBp = 600;
  }

  getElems() {
    this.$items = Array.from(this.el.querySelectorAll('.menu__item'));
    this.$toggler = this.$toggler ? this.$toggler : this.el.querySelector('.menu__toggler');
  }

  init() {
    if (store.w.x < this.mobileBp) this.isMobile = false;
    else this.isMobile = true;
  }

  initTl() {
    this.openTl = gsap.timeline({
      paused: true,
    })
      .to(this.el, {
        opacity: 1,
      })
      .set(this.el, {
        pointerEvents: 'all',
      });

    this.closeTl = gsap.timeline({
      paused: true,
    })
      .to(this.el, {
        opacity: 0,
      })
      .set(this.el, {
        pointerEvents: 'none',
      });
  }

  events() {
    this.$toggler.addEventListener('click', this.toggle);
  }

  open() {
    if (this.isAnimated) return false;

    this.isAnimated = true;
    return new Promise((resolve) => {
      this.openTl
        .restart()
        .then(() => {
          this.isAnimated = false;
          this.isOpen = true;
          resolve();
        });
    });
  }

  close() {
    if (this.isAnimated) return false;

    this.isAnimated = true;
    return new Promise((resolve) => {
      this.closeTl
        .restart()
        .then(() => {
          this.isAnimated = false;
          this.isOpen = false;
          resolve();
        });
    });
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  onPageChange(href) {
    this.$items.forEach((item) => {
      if (item.getAttribute('href') === href) item.classList.add('active');
      else item.classList.contains('active') && item.classList.add('active');
    });
  }

  resize() {
    if (!this.isMobile && store.w.x < this.mobileBp) {
      this.isMobile = true;
    } else if (this.isMobile && store.w.x >= this.mobileBp) {
      this.isMobile = false;
    }
  }
}
