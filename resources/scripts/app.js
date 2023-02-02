import {domReady} from '@roots/sage/client'

/**
 * TODO:
 * init modules only if we use it
  
 * Lyfecycle:
 *    We load the site for the first time
 *    Doc is ready
 *    We click a link
 *    Before we leave we destroy everything related to the current page
 *    We arrive on the page
 *    We initialise all the relative component
 */

import ScrollEvent from './managers/Scroll'
import RAFEvent from './managers/RAF'
import ResizeEvent from './managers/Resize'
import Observer from './utils/Observer'

import * as Taxi from '@unseenco/taxi'
import MainRenderer from './router/MainRenderer'
import MainTransition from './transitions/MainTransition'
import LazyLoad from "vanilla-lazyload";

import store from './utils/store'
import Lenis from '@studio-freight/lenis'
import Menu from './utils/Menu'
import Navbar from './utils/Navbar'

import getDevice from './utils/GetDevice'

import Gl from './webgl/Gl'

const main = async (err) => {
  if (err) {
    // handle hmr errors
    console.error(err);
  }

  /**
   * Populate store isMobile, store.isTablet, store.isSmartTv and store.isDesktop
   */
  getDevice()

  // Smooth-scroll
  store.smth = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })
  
  // INIT
  store.lazyload = new LazyLoad()
  store.raf = new RAFEvent()
  store.resize = new ResizeEvent()
  store.scroll = new ScrollEvent()

  store.menu = new Menu(document.querySelector('.menu'), document.querySelector('.menu__toggler'))
  store.resize.add(store.menu.resize)

  store.navbar = new Navbar(document.querySelector('.navbar'))
  store.scroll.add(store.navbar.scroll)
  store.resize.add(store.navbar.resize) 

  store.lazyload.update = store.lazyload.update.bind(store.lazyload)
  store.resize.add(store.lazyload.update)

  // Webgl
  store.Gl = new Gl(document)
  
  // routing
  store.router = new Taxi.Core({    
    renderers: {
      default: MainRenderer
    },
    transitions: {
      default: MainTransition
    },
    links: store.taxiLinks
  })

  store.preloadLinks(store.router)

  /**
   * Create intersection observer
   */
  store.observer = new Observer()
  store.observer.observe()

  // This event is sent everytime a `data-taxi-view` is added to the DOM
  store.router.on('NAVIGATE_IN', ({ to }) => {
    // console.log('------ 🐻 Navigate In ------')
    store.lazyload.update()
    store.menu && store.menu.onPageChange(to);
  })

  // This event is sent before the `onLeave()` method of a transition is run to hide a `data-router-view`
  store.router.on('NAVIGATE_OUT', () => {
    // console.log('------ 🦝 Navigate Out ------')
    store.observer.kill()
  })

  // This event is sent everytime the `done()` method is called in the `onEnter()` method of a transition
  store.router.on('NAVIGATE_END', () => {
    // console.log('------ 🦊 Navigate End ------')
    store.observer.update(document.querySelectorAll('[data-observe]'))
  })

  /**
   * TODO:
   * Give to blocks the value of scroll to get a percentage
   * 
   */
  function getOffsetVal(val) {
    if ( !val || val === '0%' || val === 0 ) return 0

    const isPercent = val.match(/%/) !== null

    if(isPercent) return parseFloat(val) / 100 * store.w.y
    else return parseFloat(val)
  }

  store.smth.on('scroll', () => {
    for (let i = 0; i < store.inViewComponents.length; i++) {
      const intersectionEntry = store.inViewComponents[i];
      const target = intersectionEntry.target

      const offsetVal = target.dataset.observeOffset ? target.dataset.observeOffset.split(',') : [0, 0]
      const offsetTop = getOffsetVal(offsetVal[0])
      const offsetBottom = getOffsetVal(offsetVal[1])

      const posTop = store.w.y - target.getBoundingClientRect().top
      const posBottom = target.getBoundingClientRect().bottom;

      const call = target.dataset.observeCall ? target.dataset.observeCall : false

      const compClass = store.components.find((val) => {
        return val.el === target
      })
      
      if(compClass && posTop > 0 && posBottom > 0) {
        // TODO: Interpolate values to have 0 when top of element is in window and 1 when bottom is out
        const progress = (store.w.y - target.getBoundingClientRect().top) / (target.offsetHeight)
        compClass.comp.props.scrollProgress = store.clamp(0, 1, progress)
      }

      if(posTop > offsetTop && posBottom > offsetBottom) {
        if (!target.classList.contains('ready')) {
          target.classList.add('ready')

          if (call) {
            if(compClass && compClass.comp[call]) compClass.comp[call](compClass.scrollProgress)
          }
        }
      }

      if (target.classList.contains('ready')) {
        posBottom < offsetBottom && posTop > offsetTop && target.classList.remove('ready')
        posBottom > offsetBottom && posTop < offsetTop && target.classList.remove('ready')
      }
    }
  })

  store.smth.raf = store.smth.raf.bind(store.smth)
  store.raf.addFirst(
    store.smth.raf
  )
};

domReady(main);

import.meta.webpackHot?.accept(main);