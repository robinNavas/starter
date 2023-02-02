import { Renderer } from '@unseenco/taxi';
import store from '@scripts/utils/store';
import CompManager from '@scripts/managers/CompManager';

export default class MainRenderer extends Renderer {
  initialLoad() {
    // run code that should only happen once for your site
    // console.log('------ 🥇 Initial load ------')
    this.onEnter();
    this.onEnterCompleted();

    store.firstLoad = false;
    store.CompManager = new CompManager();
    store.CompManager.update(document);
  }

  onEnter() {
    // run after the new content has been added to the Taxi container
    if (!store.firstLoad) {
      // console.log('------ 👋 onEnter ------');
      store.preloadLinks(store.router);
      store.CompManager.update(document);
    }
  }

  onEnterCompleted() {
    // run after the transition.onEnter has fully completed
    // console.log('------ 🤘 onEnterCompleted ------')
  }

  onLeave() {
    // run before the transition.onLeave method is called
    // console.log('------ 🖐️ onLeave ------');

    store.CompManager.destroy();
  }

  onLeaveCompleted() {
    // run after the transition.onleave has fully completed
    // console.log('------ 👎 onLeaveCompleted ------')
  }
}
