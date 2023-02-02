import UAParser from 'ua-parser-js';
import store from './store';

export default function getDevice() {
  const parser = new UAParser();
  switch (parser.getDevice().type) {
    case 'mobile':
      store.isDesktop = false;
      store.isMobile = true;
      store.isTablet = false;
      store.isSmartTv = false;
      break;

    case 'tablet':
      store.isDesktop = false;
      store.isMobile = false;
      store.isTablet = true;
      store.isSmartTv = false;
      break;

    case 'smarttv':
      store.isDesktop = false;
      store.isMobile = false;
      store.isTablet = false;
      store.isSmartTv = true;
      break;

    default:
      store.isDesktop = true;
      store.isMobile = false;
      store.isTablet = false;
      store.isSmartTv = false;
      break;
  }
}
