import store from '@scripts/utils/store';
import { Vector3 } from 'three';

const pxTo3dUnit = (inVal, type = 'x', viewPlane) => {
  if (type === 'x') return store.map(0, store.w.x, viewPlane.left, viewPlane.right, inVal) - viewPlane.top;
  return store.map(0, store.w.y, viewPlane.top, viewPlane.bottom, inVal) - viewPlane.top;
};

export { pxTo3dUnit };

const getViewPlaneAt = (z, camera) => {
  const angRad = camera.fov * Math.PI / 180;
  const fovY = (camera.position.z - z) * Math.tan(angRad / 2) * 2;
  const w = fovY * camera.aspect;
  const h = fovY;

  const bottom = -h / 2;
  const top = h / 2;
  const left = -w / 2;
  const right = w / 2;
  const bottomLeft = new Vector3(left, bottom, z);
  const bottomRight = new Vector3(right, bottom, z);
  const topLeft = new Vector3(left, top, z);
  const topRight = new Vector3(right, top, z);
  const width = w;
  const height = h;

  return {
    top,
    left,
    right,
    bottom,
    bottomLeft,
    bottomRight,
    topLeft,
    topRight,
    width,
    height,
  };
};

export { getViewPlaneAt };
