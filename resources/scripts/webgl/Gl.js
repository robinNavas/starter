import store from '@scripts/utils/store';
import {
  WebGLRenderer, Scene, PerspectiveCamera,
  Mesh,
  TextureLoader, Vector3, PlaneGeometry, MeshBasicMaterial, OrthographicCamera,
} from 'three';
import * as utils from './utils';
import ImgPlane from './ImgPlane';

import ResizeManager from '../managers/Resize';
import RAFManager from '../managers/RAF';
import ScrollManager from '../managers/Scroll';

import storeGl from './storeGl';

export default class GL {
  constructor(element) {
    this.RAFMng = new RAFManager();
    this.resizeMng = new ResizeManager();
    this.scrollMng = new ScrollManager();

    this.bindMethods();
    this.renderer = new WebGLRenderer({
      alpha: true,
    });
    this.renderer.localClippingEnabled = true;

    this.setScene();

    this.canvas = this.renderer.domElement;
    this.canvas.classList.add('webgl-w');
    element.body.appendChild(this.canvas);

    this.camera = new PerspectiveCamera(45, store.w.y / store.w.x, 1, 1000);
    // this.camera = new OrthographicCamera();
    this.camera.position.z = 3;
    this.camera.position.y = 0;

    storeGl.loader = new TextureLoader();

    this.initObjects();

    this.RAFMng.add(this.update);
    this.scrollMng.add(this.scroll);
    this.resizeMng.add(this.resize);

    this.resize();
    this.events();
    this.viewAt0 = utils.getViewPlaneAt(0, this.camera);
  }

  bindMethods() {
    this.resize = this.resize.bind(this);
    this.update = this.update.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  setScene() {
    storeGl.scene = new Scene();
  }

  initObjects() {
    this.imgPlanes = [];
    this.imgPlanes.push(new ImgPlane({
      size: [1, 1],
      subdiv: [100, 100],
      texture: '@images/textures/test.png',
      depth: '@images/textures/depth.png',
      position: new Vector3(0, 0, 0),
      scene: storeGl.scene,
    }));
  }

  events() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') this.camera.position.y(this.camera.position.y -= 0.009);
      if (e.key === 'ArrowUp') this.camera.position.y(this.camera.position.y += 0.009);
      if (e.key === 'ArrowLeft') this.camera.position.y(this.camera.position.x -= 0.009);
      if (e.key === 'ArrowRight') this.camera.position.y(this.camera.position.x += 0.009);
    });
  }

  scroll(e) {
    // A bouger dans la caméra
    if (e.scrollDiff) this.camera.position.y += utils.pxTo3dUnit(e.scrollDiff, 'y', this.viewAt0);
  }

  resize() {
    this.renderer.setSize(store.w.x, store.w.y);
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.renderer.render(storeGl.scene, this.camera);
  }

  onPageChange() {}
}
