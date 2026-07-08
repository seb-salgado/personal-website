// Fragment shader reused verbatim from the Voiced gradient tool (converted from SKSL).
// The vertex shader is rewritten for raw WebGL: fullscreen triangle, no matrices.

export const vertexShader = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float iTime;
  uniform vec2 iResolution;
  uniform float uSpeed;
  uniform float uContrast;
  uniform float uGrain;
  uniform float uNoiseScale;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;
  uniform vec3 uColor6;

  // Hash function for grain
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Smooth noise function
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // 6-color palette function
  vec3 palette(float t) {
    if (t < 0.2) return mix(uColor1, uColor2, smoothstep(0.0, 0.2, t));
    else if (t < 0.4) return mix(uColor2, uColor3, smoothstep(0.2, 0.4, t));
    else if (t < 0.6) return mix(uColor3, uColor4, smoothstep(0.4, 0.6, t));
    else if (t < 0.8) return mix(uColor4, uColor5, smoothstep(0.6, 0.8, t));
    else return mix(uColor5, uColor6, smoothstep(0.8, 1.0, t));
  }

  void main() {
    vec2 uv = vUv;
    float aspect = iResolution.x / iResolution.y;
    uv.x *= aspect;

    // Motion speed (parameterized)
    float t = iTime * uSpeed;

    // Layered noise for organic motion (with noise scale)
    float n1 = noise(uv * 1.2 * uNoiseScale + t * 0.6);
    float n2 = noise(uv * 2.7 * uNoiseScale - t * 0.4);
    float n3 = noise(uv * 1.5 * uNoiseScale + t * 0.3);

    // Blend noise layers
    float blend = (n1 + n2 * 0.5 + n3 * 0.25) / 1.75;

    // Contrast adjustment (parameterized)
    blend = pow(blend, uContrast);

    // Map blend factor to palette
    vec3 color = palette(blend);

    // Luminous dreamy center
    vec2 center = uv - vec2(0.5 * aspect, 0.5);
    float dist = length(center);
    float glow = exp(-dist * dist * 3.0);
    color += glow * 0.2;

    // Soft vignette
    float edgeFade = smoothstep(0.75, 1.2, dist);
    color = mix(color, color * 0.9, edgeFade);

    // Animated grain (parameterized)
    float grain = hash(uv * iResolution.xy * 0.7 + iTime * 0.15);
    color += (grain - 0.5) * uGrain;

    gl_FragColor = vec4(color, 1.0);
  }
`;
