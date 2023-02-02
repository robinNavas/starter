uniform sampler2D depthMap;

varying vec2 vUv;
varying vec3 vNormal;

#include <clipping_planes_pars_vertex>

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main() {
    #include <begin_vertex>

    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec4 disp = texture2D(depthMap, vUv);
    vec3 col = rgb2hsv(disp.rgb);
    vec3 newPosition = vec3(position.x, position.y, position.z + (col.b * col.b) / 4.);

    #include <project_vertex>
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    #include <clipping_planes_vertex>
}
  