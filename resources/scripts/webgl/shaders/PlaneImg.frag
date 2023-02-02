precision highp float;

uniform sampler2D tMap;

varying vec2 vUv;
varying vec3 vNormal;

#include <clipping_planes_pars_fragment>

void main() {
  #include <clipping_planes_fragment>
  
  vec3 normal = normalize(vNormal);
  vec3 tex = texture2D(tMap, vUv).rgb;


  gl_FragColor.rgb = tex.rgb;
  gl_FragColor.a = 1.0;
}
