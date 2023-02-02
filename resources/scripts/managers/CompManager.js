/* eslint-disable no-constructor-return */
import store from '@scripts/utils/store';
import list from './CompList';

export default class CompManager {
  constructor() {
    if (CompManager.exists) {
      return CompManager.instance;
    }

    CompManager.instance = this;
    CompManager.exists = true;

    return this;
  }

  componentLoader(el, componentName) {
    let path = `components/mobile/${componentName}`;
    if (!store.isMobile) path = `components/${componentName}`;
    import(`../${path}`).then((obj) => {
      store.components.push({
        el: el,
        comp: new obj.default(el)
      })
    });
  }

  update(page) {
    store.components = [];
    list.forEach((entry) => {
      const els = page.querySelectorAll(entry.selector);
      els.forEach((el) => {
        this.componentLoader(el, entry.name);
      });
    });
  }

  destroy() {
    store.components.length && store.components.forEach((obj) => { obj.comp.destroy() });
  }
}
