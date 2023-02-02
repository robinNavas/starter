import store from './store';

export default class Observer {
  constructor() {
    this.observed = document.querySelectorAll('[data-observe]');
    this.create();
  }

  create() {
    const options = {
      rootMargin: '0px',
      threshold: 0,
    };

    this.instance = new IntersectionObserver(this.cb, options);
  }

  cb(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inView');
        store.inViewComponents.push(entry);
      } else {
        entry.target.classList.remove('inView');
        const i = store.inViewComponents.indexOf(entry);
        i !== -1 && store.inViewComponents.splice(i, 1);
      }
    });
  }

  observe() {
    for (let i = 0; i < this.observed.length; i += 1) {
      this.instance.observe(this.observed[i]);
    }
  }

  kill() {
    for (let i = 0; i < this.observed.length; i += 1) {
      this.instance.unobserve(this.observed[i]);
    }
  }

  update(toObserve) {
    this.observed = toObserve;
    this.observe();
  }
}
