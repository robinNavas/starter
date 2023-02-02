export default class Swipe {
  constructor(
    opt = {
      el: window, name: 'swipe', swipeX: true, swipeY: false, offsetX: 200, offsetY: 200, preventDefault: false,
    },
    cb = {
      left: null, right: null, top: null, bottom: null,
    },
  ) {
    this.preventDefault = opt.preventDefault ? opt.preventDefault : false;
    this.swipeX = opt.swipeX ? opt.swipeX : true;
    this.swipeY = opt.swipeY ? opt.swipeY : false;
    this.xDown = 0;
    this.yDown = 0;
    this.deltaX = 0;
    this.deltaY = 0;

    this.el = opt.el ? opt.el : window;
    this.offsetX = opt.offsetX ? opt.offsetX : 200;
    this.offsetY = opt.offsetY ? opt.offsetY : 200;

    this.cbLeft = cb.left ? cb.left : null;
    this.cbRight = cb.right ? cb.right : null;
    this.cbTop = cb.top ? cb.top : null;
    this.cbBottom = cb.bottom ? cb.bottom : null;

    this.init();
  }

  handleTouchStart(e) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    this.preventDefault && e.preventDefault();
    this.deltaX = e.touches[0].clientX - this.xDown;
    this.deltaY = e.touches[0].clientY - this.yDown;
  }

  handleToucheEnd() {
    this.swipeX && this.handleX();
    this.swipeY && this.handleY();
    this.reset();
  }

  handleX() {
    if (Math.abs(this.deltaX) > this.offsetX) {
      if (Math.sign(this.deltaX) < 0) this.cbLeft && this.cbLeft();
      else this.cbRight && this.cbRight();
    }
  }

  handleY() {
    if (Math.abs(this.deltaY) > this.offsetY) {
      if (Math.sign(this.deltaY) < 0) this.cbTop && this.cbTop();
      else this.cbBottom && this.cbBottom();
    }
  }

  reset() {
    this.xDown = 0;
    this.yDown = 0;
    this.deltaX = 0;
    this.deltaY = 0;
  }

  init() {
    this.el.addEventListener('touchstart', (e) => {
      this.handleTouchStart(e);
    }, false);

    this.el.addEventListener('touchmove', (e) => {
      this.handleTouchMove(e);
    }, false);

    this.el.addEventListener('touchend', () => {
      this.handleToucheEnd();
    }, false);
  }

  destroy() {
    this.el.removeEventListener('touchstart', (e) => {
      this.handleTouchStart(e);
    });

    this.el.removeEventListener('touchmove', (e) => {
      this.handleTouchMove(e);
    });

    this.el.removeEventListener('touchend', () => {
      this.handleToucheEnd();
    });
  }
}
