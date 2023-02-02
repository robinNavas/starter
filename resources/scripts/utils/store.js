/**
  * TODO :
  * Ajouter les infos de la page actuelle
*/

const taxiLinks = 'a:not([target]):not([href^=\\#]):not([data-taxi-ignore])';

export default {
  w: {
    x: window.innerWidth,
    y: window.innerHeight,
  },

  components: [],
  inViewComponents: [],

  firstLoad: true,
  router: null,
  taxiLinks,
  preloadLinks: (router) => {
    const urls = document.querySelectorAll(taxiLinks);
    urls.length && urls.forEach((url) => {
      router.preload(url.href);
    });
  },

  // eslint-disable-next-line no-mixed-operators
  map: (a, b, A, B, x) => (x - a) * ((B - A) / (b - a)) + A,
  normalize: (min, max, value) => this.map(min, max, 0, 1, value),
  // eslint-disable-next-line no-nested-ternary
  clamp: (min, max, value) => (value < min ? min : value > max ? max : value),
  minmax: (min, max, value) => min + (max - min) * value,
};
