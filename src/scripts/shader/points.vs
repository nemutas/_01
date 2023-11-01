attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix; 

uniform float uPointSize;
uniform float uTime;

varying float vNoise;

#include './modules/snoise.glsl'

void main() {
  float n = snoise(vec3(position.xy * 2.0, uTime * 0.15));
  float dist = distance(position.xy, vec2(0));
  vNoise = sin(dist * (dist + 25.0) + n * dist * 10.0 - uTime * 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  gl_PointSize = uPointSize;
}