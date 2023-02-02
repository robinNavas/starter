import Component from '@scripts/utils/Component';
import Slider from '@scripts/utils/Slider';
import gsap from 'gsap';

export default class Comp1 extends Component {
  constructor(element) {
    super(element);

    this.initSLider();
  }

  init() {
    this.$debug = this.el.querySelector('.debug');
    this.$slides = this.el.querySelectorAll('.b-test__slide');
    this.slides = [];
    this.$slides.forEach((element) => {
      this.slides.push({
        el: element,
      });
    });
    this.$slidesW = this.el.querySelector('.b-test__slides');
    this.slideWidth = this.$slides[0].offsetWidth;
  }

  initSLider() {
    this.slider = new Slider(this.el, {
      cb: () => {
        const curr = this.slider.getCurrent();
        const prev = this.slider.getPrev();
        this.updateSlider(curr, prev).then(() => { this.slider.done(); });
      },
      length: this.slides.length - 1,
      pagerNext: this.el.querySelector('.next'),
      pagerPrev: this.el.querySelector('.prev'),
      swipeX: true,
      swipeY: true,
      auto: false,
      intervalTime: 10500,
    });
  }

  updateSlider(curr) {
    return new Promise((resolve) => {
      gsap.to(this.$slidesW, {
        x: -this.slideWidth * curr,
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  destroy() {
    this.slider.destroy();
    super.destroy();
  }

  toWatch() {
    return {
      scrollProgress: (oldVal, newVal) => {
        this.$debug.innerHTML = newVal;
        return true;
      },
    };
  }
}
