import { AdditiveBlending, Mesh, MeshBasicMaterial, NormalBlending, Plane, PlaneGeometry, ShaderMaterial, Vector3 } from 'three';

import vertexShader from './shaders/PlaneImg.vert';
import fragmentShader from './shaders/PlaneImg.frag';
import storeGl from './storeGl';

import texture from "@images/textures/test.png"

export default class ImgPlane {
  constructor({
    size = [1, 1],
    subdiv = [100, 100],
    texture = '',
    depth = '',
    position = null,
    scene = null,
  } = {}) {
    this.size = size;
    this.subdiv = subdiv;
    this.textureImg = texture;
    this.depthImg = depth;
    this.position = position;
    this.scene = scene;

    this.init();
  }

  init() {
    this.initGeo()
    this.initTextures().then(() => {
      this.initShader();
      this.initObj();
    });
  }

  initGeo() {
    this.planeGeo = new PlaneGeometry(this.size[0], this.size[1], this.subdiv[0], this.subdiv[1]);
  }

  initObj() {
    this.plane = new Mesh(this.planeGeo, this.shader);
    // this.plane.position.set(this.position);

    storeGl.scene.add(this.plane)
  }

  initTextures() {
    return new Promise(async (resolve) => {
      await import('../../images/textures/test.png').then(({ default: img }) => {
        this.texture = storeGl.loader.load(img)
      });
      await import('../../images/textures/depth.png').then(({ default: img }) => {
        this.depth = storeGl.loader.load(img)
      });

      resolve()
    })
  }

  initShader() {
    const size = 0.45;
    this.shader = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        tMap: { value: this.texture },
        depthMap: { value: this.depth },
      },
      depthWrite: true,
      clippingPlanes: [
        new Plane(new Vector3(1, 0, 0), size),
        new Plane(new Vector3(-1, 0, 0), size),
        new Plane(new Vector3(0, 1, 0), size),
        new Plane(new Vector3(0, -1, 0), size)
      ],
      clipping: true,
      // blending: NormalBlending,
      transparent: true,
    });
  }

  destroy() {

  }
}
