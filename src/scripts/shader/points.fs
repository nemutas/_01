precision mediump float;

uniform sampler2D tNum;
uniform bool uDebug;

varying float vNoise;

void main() {
  vec3 color = vec3(0.15);

  vec2 uv = gl_PointCoord;
  uv.x *= 0.5;
  vec3 zero = texture2D(tNum, uv).rgb;
  color *= zero;

  if (0.0 < vNoise) {
    uv.x += 0.5; // 1
    vec3 one = texture2D(tNum, uv).rgb;
    vec3 green = vec3(0.27, 0.94, 0.00);
    color = mix(color, green, one.r);
  }

  gl_FragColor = vec4(color + float(uDebug) * 0.1, 1);
}