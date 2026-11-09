const PRELUDE = `#version 300 es
precision highp float;
precision highp int;

uniform vec2 u_res;
uniform float u_time;
uniform float u_wtime;
uniform float u_wind;
uniform float u_gust;
uniform float u_grain;
uniform float u_dpr;
uniform vec3 u_pointer;
uniform float u_stir;
uniform vec3 u_burst;
uniform vec2 u_look;
uniform float u_push;

out vec4 outColor;

#define PI 3.14159265
#define TREES 14

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p, int octaves) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

vec2 sceneUv(vec2 fc) {
  return (fc - vec2(0.5 * u_res.x, 0.0)) / u_res.y;
}

float gustAt(float x) {
  return smoothstep(0.3, 0.8, noise(vec2(x * 0.9 - u_wtime * 0.7, u_wtime * 0.05)));
}

float windAt(float x) {
  float breath = 0.5 + 0.5 * sin(u_wtime * 0.31 + 1.3);
  return u_wind * (0.4 + 0.3 * breath + u_gust * gustAt(x));
}

float pushAt(vec2 p) {
  vec2 d = p - u_pointer.xy;
  float stir = sign(d.x) * exp(-dot(d, d) * 9.0) * u_stir * u_pointer.z * 1.6;
  vec2 b = p - u_burst.xy;
  float ring = length(b * vec2(1.0, 1.6)) - u_burst.z * 1.1;
  float burst = sign(b.x) * exp(-ring * ring * 18.0) * exp(-u_burst.z * 1.2) * 2.2;
  return (stir + burst) * u_push;
}

float swayAt(vec2 at, float seed) {
  float wobble = sin(u_wtime * (1.6 + 0.5 * hash11(seed)) + seed * 6.283);
  float sway = windAt(at.x) * (0.75 + 0.3 * wobble) + u_gust * 0.15 * wobble;
  return clamp(sway + pushAt(at), -2.5, 2.5);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdLimb(vec2 p, vec2 a, vec2 b, float ra, float rb) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - mix(ra, rb, h);
}

vec2 bend(vec2 p, float sway) {
  float h = max(p.y, 0.0);
  p.x -= sway * 0.16 * h * h;
  return p;
}

float oakWood(vec2 p, float seed) {
  float j = hash11(seed * 3.1) - 0.5;
  float d = sdLimb(p, vec2(0.0, -0.05), vec2(0.03 + j * 0.04, 0.36), 0.07, 0.048);
  d = smin(d, sdLimb(p, vec2(0.02, 0.28), vec2(-0.32, 0.56 + j * 0.05), 0.04, 0.014), 0.05);
  d = smin(d, sdLimb(p, vec2(0.03, 0.31), vec2(0.36, 0.58 - j * 0.05), 0.038, 0.013), 0.05);
  d = smin(d, sdLimb(p, vec2(0.03, 0.34), vec2(0.08 - j * 0.1, 0.72), 0.032, 0.012), 0.04);
  d = smin(d, sdLimb(p, vec2(-0.13, -0.03), vec2(0.0, 0.1), 0.012, 0.05), 0.05);
  d = smin(d, sdLimb(p, vec2(0.14, -0.03), vec2(0.02, 0.1), 0.012, 0.05), 0.05);
  return d;
}

float oakCrown(vec2 p, float seed, float sway) {
  float c = 1e5;
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float a = fi / 6.0;
    float arch = sin(a * PI);
    vec2 ctr = vec2(
      mix(-0.5, 0.5, a) + (hash11(seed + fi * 7.1) - 0.5) * 0.1,
      0.56 + 0.2 * arch + (hash11(seed * 1.7 + fi) - 0.5) * 0.08
    );
    float r = 0.15 + 0.09 * arch + hash11(seed * 2.3 + fi) * 0.04;
    float ph = u_wtime * (2.2 + 0.5 * hash11(fi + seed)) + fi * 1.7 + seed;
    ctr += vec2(sin(ph), cos(ph * 1.3)) * vec2(0.014, 0.007) * (0.25 + abs(sway));
    c = smin(c, length(p - ctr) - r, 0.1);
  }
  if (c > 0.16) return c;
  vec2 q = p * 5.5 + seed * 11.0;
  float ft = u_wtime * 3.0;
  q += vec2(sin(ft + p.y * 9.0), cos(ft * 0.9 + p.x * 7.0)) * 0.07 * (0.2 + abs(sway));
  c += (fbm(q, 4) - 0.5) * 0.24;
  c += (noise(q * 4.5) - 0.5) * 0.06;
  return c;
}

const vec4 ALLEE[TREES] = vec4[TREES](
  vec4(0.23, 0.019, 0.072, 1.0),
  vec4(0.47, 0.019, 0.072, 2.0),
  vec4(0.17, 0.028, 0.105, 3.0),
  vec4(0.53, 0.028, 0.105, 4.0),
  vec4(0.08, 0.042, 0.155, 5.0),
  vec4(0.62, 0.042, 0.155, 6.0),
  vec4(-0.06, 0.062, 0.23, 7.0),
  vec4(0.76, 0.062, 0.23, 8.0),
  vec4(-0.28, 0.095, 0.34, 9.0),
  vec4(0.98, 0.095, 0.34, 10.0),
  vec4(-0.65, 0.15, 0.52, 11.0),
  vec4(1.35, 0.15, 0.52, 12.0),
  vec4(-1.25, 0.27, 0.82, 13.0),
  vec4(1.95, 0.27, 0.82, 14.0)
);

const vec4 LONE[TREES] = vec4[TREES](
  vec4(0.92, 0.004, 0.05, 31.0),
  vec4(0.74, 0.003, 0.04, 32.0),
  vec4(1.3, 0.005, 0.065, 33.0),
  vec4(-1.25, 0.004, 0.06, 34.0),
  vec4(-0.3, 0.012, 0.52, 35.0),
  vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0),
  vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0)
);

const vec4 GROVE[TREES] = vec4[TREES](
  vec4(1.42, 0.004, 0.09, 41.0),
  vec4(-1.45, 0.006, 0.11, 42.0),
  vec4(0.98, 0.01, 0.13, 43.0),
  vec4(-0.8, 0.05, 0.4, 44.0),
  vec4(0.62, 0.085, 0.48, 45.0),
  vec4(-0.08, 0.16, 0.66, 46.0),
  vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0),
  vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0)
);

const vec4 PAIR[TREES] = vec4[TREES](
  vec4(-1.1, 0.003, 0.05, 51.0),
  vec4(1.3, 0.004, 0.06, 52.0),
  vec4(0.12, 0.002, 0.04, 53.0),
  vec4(0.58, 0.03, 0.36, 54.0),
  vec4(-0.38, 0.07, 0.56, 55.0),
  vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0),
  vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0)
);

const vec4 CENTER[TREES] = vec4[TREES](
  vec4(-1.2, 0.004, 0.06, 61.0),
  vec4(1.15, 0.003, 0.05, 62.0),
  vec4(-0.75, 0.002, 0.04, 63.0),
  vec4(0.8, 0.003, 0.045, 64.0),
  vec4(0.0, 0.02, 0.62, 65.0),
  vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0),
  vec4(0.0), vec4(0.0), vec4(0.0), vec4(0.0)
);

vec4 treeDef(int plan, int i) {
  if (plan == 1) return LONE[i];
  if (plan == 2) return GROVE[i];
  if (plan == 3) return PAIR[i];
  if (plan == 4) return CENTER[i];
  return ALLEE[i];
}

float horizonY(float x, int plan) {
  if (plan == 1) {
    float h = x + 0.3;
    return 0.29 + 0.1 * exp(-h * h * 2.25);
  }
  if (plan == 2) return 0.3 + 0.01 * sin(x * 1.7 + 0.4);
  if (plan == 3) return 0.24 + 0.008 * sin(x * 2.0 + 1.0);
  if (plan == 4) return 0.3 + 0.006 * sin(x * 2.3 + 0.7);
  return 0.36 + 0.004 * sin(x * 3.0);
}

struct Scene {
  float field;
  float depth;
  float wave;
  float cloud;
  float tree;
  float wood;
  float lit;
  float fog;
  float edge;
  vec2 local;
  float blade;
  float tip;
};

Scene scene(vec2 uv, int plan, vec2 light, float px) {
  Scene s = Scene(0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, vec2(0.0), 0.0, 0.0);
  float H = horizonY(uv.x, plan);
  s.field = smoothstep(H + px, H - px, uv.y);

  if (uv.y > H - px) {
    float c = fbm(vec2(uv.x * 1.1 - u_wtime * 0.03, uv.y * 3.2), 5);
    s.cloud = smoothstep(0.52, 0.82, c) * smoothstep(H + 0.02, H + 0.28, uv.y);
  }

  if (uv.y < H + px) {
    float z = 1.0 / max(H - uv.y, 0.003);
    s.depth = clamp((H - uv.y) / H, 0.0, 1.0);
    vec2 w = vec2((uv.x + u_look.x * 0.066 * s.depth) * z, z);
    float far = smoothstep(5.0, 30.0, z);
    float bands = fbm(vec2(w.x * 0.55 - u_wtime * 1.1, w.y * 0.3 - u_wtime * 0.12), 4);
    float strands = noise(vec2(w.x * 38.0, w.y * 2.5));
    float wave = 0.5 + (mix(bands, 0.5, far) - 0.5) * (0.5 + 0.9 * u_wind);
    wave = mix(wave, wave * 0.75 + strands * 0.25, 1.0 - far);
    s.wave = clamp(wave + abs(pushAt(uv)) * 0.35, 0.0, 1.0);
  }

  for (int i = 0; i < TREES; i++) {
    vec4 t = treeDef(plan, i);
    if (t.z <= 0.0) continue;
    vec2 base = vec2(t.x - u_look.x * t.z * 0.06, horizonY(t.x, plan) - t.y);
    vec2 p = (uv - base) / t.z;
    if (abs(p.x) > 1.5 || p.y < -0.1 || p.y > 1.2) continue;
    float sway = swayAt(base + vec2(0.0, 0.6 * t.z), t.w);
    vec2 bp = bend(p, sway);
    if (abs(bp.x) > 0.9) continue;
    float apx = px / t.z;
    float wood = oakWood(bp, t.w);
    float crown = oakCrown(bp, t.w, sway);
    float d = min(wood, crown);
    float ground = smoothstep(-0.03, 0.04, p.y + (noise(vec2(p.x * 26.0, t.w)) - 0.5) * 0.07);
    float a = smoothstep(apx, -apx, d) * ground;
    float e = smoothstep(apx * 2.5, apx * 0.5, abs(d)) * ground;
    if (a < 0.002 && e < 0.002) continue;
    float lit = 0.0;
    if (a > 0.0 && crown < wood) {
      vec2 ld = normalize(light - base - vec2(0.0, 0.62 * t.z));
      lit = clamp((oakCrown(bp + ld * 0.04, t.w, sway) - crown) / 0.04, -1.0, 1.0);
    }
    s.wood = mix(s.wood, smoothstep(apx, -apx, wood - crown), a);
    s.lit = mix(s.lit, lit, a);
    s.fog = mix(s.fog, 1.0 - smoothstep(0.06, 0.45, t.z), a);
    s.edge = max(s.edge * (1.0 - a), e);
    if (a > 0.5) s.local = bp * t.z;
    s.tree = a + s.tree * (1.0 - a);
  }

  for (int L = 0; L < 3; L++) {
    float fl = float(L);
    float cw = 0.009 + fl * 0.006;
    float hmax = 0.05 + fl * 0.045;
    if (uv.y > hmax) continue;
    float x = uv.x + u_look.x * 0.02 * (fl + 1.0);
    float id0 = floor(x / cw);
    for (int k = -3; k <= 3; k++) {
      float id = id0 + float(k);
      float bh = hmax * (0.35 + 0.65 * hash11(id * 3.1 + fl * 5.0));
      if (uv.y > bh) continue;
      float t = uv.y / bh;
      float bx = (id + 0.5 + (hash11(id * 1.37 + fl * 17.0) - 0.5) * 0.9) * cw;
      float lean = clamp(swayAt(vec2(bx, bh * 0.5), id + fl * 50.0), -2.0, 2.0) * cw
        + (hash11(id * 7.7 + fl) - 0.5) * cw * 0.5;
      float d = abs(x - bx - lean * t * t) - cw * 0.42 * (1.0 - t);
      float a = smoothstep(px, -px, d);
      s.tip = mix(s.tip, t, a);
      s.blade = a + s.blade * (1.0 - a);
    }
  }

  return s;
}

float specks(vec2 uv, float cells, float density, vec2 drift, float px, float sharp) {
  vec2 g = (uv - drift) * cells;
  vec2 id = floor(g);
  float acc = 0.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = id + vec2(float(i), float(j));
      float h = hash21(c);
      if (h > density) continue;
      vec2 o = hash22(c + 7.0);
      vec2 pos = c + 0.5 + 0.35 * vec2(
        sin(u_time * (0.4 + o.x) + h * 40.0),
        cos(u_time * (0.3 + o.y) + h * 25.0)
      );
      float d = length(g - pos) / cells;
      float blink = pow(0.5 + 0.5 * sin(u_time * (0.7 + 1.3 * o.y) + h * 60.0), sharp);
      acc += blink * (smoothstep(1.6 * px, 0.0, d) + 0.35 * exp(-d / (5.0 * px)));
    }
  }
  return acc;
}

vec3 finish(vec3 col) {
  vec2 q = gl_FragCoord.xy / u_res;
  col *= 0.8 + 0.2 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.2);
  col += (hash21(gl_FragCoord.xy + fract(u_time) * 97.0) - 0.5) * 0.025;
  return col;
}
`;

const GOLDEN = `
void main() {
  vec2 uv = sceneUv(gl_FragCoord.xy);
  float px = 1.0 / u_res.y;
  vec2 sun = vec2(0.35, 0.41);
  Scene s = scene(uv, 0, sun, px);
  float H = horizonY(uv.x, 0);

  float sd = length((uv - sun) * vec2(0.8, 1.0));
  float h = smoothstep(H, 1.0, uv.y);
  vec3 col = mix(vec3(1.0, 0.78, 0.52), vec3(0.45, 0.58, 0.72), h);
  col = mix(col, vec3(1.0, 0.66, 0.38), exp(-sd * 3.5) * 0.7);
  col += vec3(1.0, 0.85, 0.6) * exp(-sd * 16.0) * 0.6;
  col = mix(col, mix(vec3(1.0, 0.7, 0.48), vec3(1.0, 0.9, 0.78), h), s.cloud * 0.55);
  col = mix(col, vec3(1.0, 0.98, 0.9), smoothstep(0.04, 0.034, sd));

  vec3 field = mix(vec3(0.95, 0.74, 0.46), vec3(0.46, 0.4, 0.19), pow(s.depth, 0.55));
  field *= 0.7 + 0.6 * s.wave;
  float pw = 0.004 + (H - uv.y) * 0.32;
  float pathEdge = px * 2.0 + (H - uv.y) * 0.08;
  float path = smoothstep(pw + pathEdge, pw - pathEdge, abs(uv.x - sun.x + u_look.x * 0.066 * s.depth));
  field = mix(field, vec3(0.9, 0.74, 0.5) * (0.8 + 0.3 * noise(uv * vec2(90.0, 20.0))), path * 0.4);
  field += vec3(1.0, 0.62, 0.3) * exp(-abs(uv.x - sun.x) * 2.5) * 0.3 * (1.0 - s.depth);
  col = mix(col, field, s.field);

  vec3 tree = mix(vec3(0.16, 0.2, 0.1), vec3(0.14, 0.1, 0.07), s.wood);
  tree += vec3(0.85, 0.62, 0.28) * smoothstep(-0.3, 1.0, s.lit) * 0.3 * (1.0 - s.wood);
  tree = mix(tree, vec3(0.96, 0.74, 0.52), s.fog * 0.85);
  col = mix(col, tree, s.tree);

  vec3 blade = mix(vec3(0.2, 0.15, 0.07), vec3(1.0, 0.78, 0.42), smoothstep(0.45, 1.0, s.tip) * 0.75);
  col = mix(col, blade, s.blade);

  float pollen = specks(uv, 16.0, 0.16, vec2(u_wtime * 0.05, u_time * 0.01), px, 1.0);
  col += vec3(1.0, 0.86, 0.58) * pollen * exp(-sd * 1.5) * smoothstep(0.7, 0.3, uv.y) * 0.8 * (1.0 - s.blade);

  outColor = vec4(finish(col), 1.0);
}
`;

const MOONLIT = `
float stars(vec2 uv, float px) {
  vec2 g = uv * 80.0;
  vec2 id = floor(g);
  float h = hash21(id);
  if (h < 0.985) return 0.0;
  vec2 sp = id + 0.25 + 0.5 * hash22(id);
  float tw = 0.55 + 0.45 * sin(u_time * (1.0 + 3.0 * fract(h * 91.0)) + h * 70.0);
  return smoothstep(1.4 * px, 0.0, length(g - sp) / 80.0) * tw;
}

void main() {
  vec2 uv = sceneUv(gl_FragCoord.xy);
  float px = 1.0 / u_res.y;
  vec2 moon = vec2(0.62, 0.76);
  Scene s = scene(uv, 1, moon, px);
  float H = horizonY(uv.x, 1);

  float h = smoothstep(H, 1.0, uv.y);
  float md = length(uv - moon);
  vec3 col = mix(vec3(0.1, 0.13, 0.22), vec3(0.02, 0.03, 0.07), h);
  col += vec3(0.32, 0.4, 0.56) * exp(-md * 5.0) * 0.3;
  col += vec3(0.85, 0.9, 1.0) * stars(uv, px) * smoothstep(H + 0.05, H + 0.3, uv.y) * (1.0 - s.cloud);
  col = mix(col, vec3(0.2, 0.25, 0.36), s.cloud * 0.4);
  vec3 moonCol = vec3(0.94, 0.94, 0.88) - fbm((uv - moon) * 28.0, 3) * 0.22;
  col = mix(col, moonCol, smoothstep(0.048, 0.044, md));

  vec3 field = mix(vec3(0.05, 0.07, 0.11), vec3(0.012, 0.018, 0.028), pow(s.depth, 0.5));
  field += vec3(0.42, 0.52, 0.7) * pow(s.wave, 2.2) * 0.45 * (0.35 + 0.65 * s.depth);
  field += vec3(0.25, 0.3, 0.42) * exp(-abs(uv.x - moon.x) * 3.0) * 0.12 * (1.0 - s.depth);
  col = mix(col, field, s.field);

  vec3 tree = vec3(0.01, 0.014, 0.024)
    + vec3(0.22, 0.29, 0.44) * smoothstep(0.35, 1.0, s.lit) * 0.3 * (1.0 - s.wood);
  tree = mix(tree, vec3(0.09, 0.12, 0.2), s.fog * 0.85);
  col = mix(col, tree, s.tree);

  vec3 blade = vec3(0.006, 0.008, 0.014) + vec3(0.12, 0.16, 0.24) * smoothstep(0.6, 1.0, s.tip) * 0.4;
  col = mix(col, blade, s.blade);

  float flies = specks(uv, 10.0, 0.22, vec2(u_wtime * 0.02, 0.0), px * 1.2, 4.0);
  col += vec3(1.0, 0.62, 0.2) * flies * smoothstep(0.55, 0.2, uv.y) * (1.0 - 0.8 * s.blade);

  outColor = vec4(finish(col), 1.0);
}
`;

const GLYPHS = `
#define ORANGE vec3(1.0, 0.345, 0.0)
#define GLYPH_O 15255086
#define GLYPH_V 18400580
#define GLYPH_E 33061407
#define GLYPH_BALL 15728622

float glyph(int n, vec2 p) {
  p = floor(p * vec2(-4.0, 4.0) + 2.5);
  if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
    int a = int(round(p.x) + 5.0 * round(p.y));
    if (((n >> a) & 1) == 1) return 1.0;
  }
  return 0.0;
}

int rampGlyph(float lum) {
  int n = 0;
  if (lum > 0.1) n = 4096;
  if (lum > 0.2) n = 65600;
  if (lum > 0.3) n = 332772;
  if (lum > 0.4) n = 15255086;
  if (lum > 0.5) n = 23385164;
  if (lum > 0.6) n = 15252014;
  if (lum > 0.7) n = 13199452;
  if (lum > 0.8) n = 11512810;
  return n;
}

vec2 glyphCell(float g) {
  return mod(gl_FragCoord.xy / (4.0 * g), 2.0) - 1.0;
}
`;

const ASCII = `
void main() {
  float g = max(1.0, floor(1.25 * u_grain * u_dpr + 0.5));
  float cell = 8.0 * g;
  vec2 c = floor(gl_FragCoord.xy / cell);
  vec2 uv = sceneUv((c + 0.5) * cell);
  float px = cell / u_res.y;
  vec2 moon = vec2(0.2, 0.8);
  Scene s = scene(uv, 3, moon, px);
  float H = horizonY(uv.x, 3);

  float md = length(uv - moon);
  float lum = 0.02 + 0.1 * exp(-md * 5.0) + s.cloud * 0.1;
  lum = max(lum, 0.15 * step(0.975, hash21(c)) * step(H + 0.08, uv.y));
  lum = max(lum, smoothstep(0.07, 0.06, md) * 0.95);
  float field = 0.02 + 0.75 * smoothstep(0.45, 0.85, s.wave) * (0.35 + 0.65 * s.depth);
  lum = mix(lum, field, s.field);
  float tree = mix(0.5 + 0.45 * smoothstep(-0.3, 1.0, s.lit), 0.95, s.wood);
  lum = mix(lum, mix(tree, 0.25, s.fog), s.tree);
  lum = mix(lum, 0.12 + 0.3 * s.tip, s.blade);

  float flies = specks(uv, 9.0, 0.18, vec2(u_wtime * 0.02, 0.0), px, 4.0);
  float ember = step(0.5, flies) * smoothstep(0.5, 0.25, uv.y);
  lum = max(lum, ember);

  float on = glyph(rampGlyph(lum), glyphCell(g));
  vec3 ink = mix(vec3(0.969) * (0.4 + 0.6 * clamp(lum, 0.0, 1.0)), ORANGE, ember);
  outColor = vec4(mix(vec3(0.086), ink, on), 1.0);
}
`;

const ENGRAVING = `
float lines(float v, float darkness) {
  float aa = fwidth(v);
  float f = abs(fract(v) - 0.5) * 2.0;
  return (1.0 - smoothstep(darkness - aa, darkness + aa, f)) * smoothstep(0.0, 0.05, darkness);
}

void main() {
  vec2 uv = sceneUv(gl_FragCoord.xy);
  float px = 1.0 / u_res.y;
  vec2 light = vec2(-0.9, 1.0);
  Scene s = scene(uv, 2, light, px);
  float H = horizonY(uv.x, 2);
  vec2 css = gl_FragCoord.xy / u_dpr;
  float sp = 4.0 * u_grain;
  float wob = (noise(css * 0.015) - 0.5) * 0.8;

  float skyD = clamp(0.06 + 0.3 * smoothstep(0.45, 1.0, uv.y) - s.cloud * 0.4, 0.0, 1.0);
  float sky = lines(css.y / sp + wob, skyD);

  float fv = -log(max(H - uv.y, 0.001)) * 13.0 / u_grain + (s.wave - 0.5) * 1.6 + wob;
  float fieldD = clamp(0.2 + 0.3 * s.depth + (0.5 - s.wave) * 0.6, 0.0, 1.0);
  float field = mix(fieldD * 0.6, lines(fv, fieldD), smoothstep(0.5, 0.25, fwidth(fv)));

  vec2 lc = s.local * u_res.y / u_dpr;
  float treeD = clamp(mix(0.6 - 0.4 * s.lit, 0.85, s.wood) * (1.0 - 0.7 * s.fog), 0.0, 1.0);
  float hatch = lines(dot(lc, vec2(0.7071)) / (sp * 0.8) + wob, treeD);
  float cross = lines(dot(lc, vec2(-0.7071, 0.7071)) / (sp * 0.8) + wob, clamp((treeD - 0.5) * 1.8, 0.0, 1.0));

  float ink = mix(sky, field, s.field);
  ink = mix(ink, max(hatch, cross), s.tree);
  ink = max(ink, s.edge * (1.0 - 0.5 * s.fog));
  ink = mix(ink, 1.0, s.blade);

  vec3 paper = vec3(0.93, 0.9, 0.83) * (0.97 + 0.03 * noise(css * 0.7));
  vec3 col = mix(paper, vec3(0.13, 0.11, 0.09), clamp(ink, 0.0, 1.0));
  outColor = vec4(finish(col), 1.0);
}
`;

type OakShader = {
  id: string;
  title: string;
  note: string;
  fragment: string;
};

export const oakShaders: OakShader[] = [
  {
    id: "golden",
    title: "Golden hour",
    note: "An allé of oaks walking into a low sun. Pollen drifts in the light.",
    fragment: PRELUDE + GOLDEN,
  },
  {
    id: "moonlit",
    title: "Moonlit",
    note: "A lone oak on a hill. Silver gusts on the grass, fireflies below.",
    fragment: PRELUDE + MOONLIT,
  },
  {
    id: "ascii",
    title: "Terminal",
    note: "Two oaks rendered in glyphs. Fireflies come through in orange.",
    fragment: PRELUDE + GLYPHS + ASCII,
  },
  {
    id: "engraving",
    title: "Engraving",
    note: "A grove as a botanical plate. Wind bends the hatching.",
    fragment: PRELUDE + ENGRAVING,
  },
];

const DOGS = `
uniform vec4 u_sim[5];

float ellipseSd(vec2 p, vec2 c, vec2 r) {
  return (length((p - c) / r) - 1.0) * min(r.x, r.y);
}

vec2 rotate(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, s, -s, c) * p;
}

float legSd(vec2 p, vec2 hip, float phase, float amp, float r) {
  float len = hip.y;
  vec2 foot = hip + vec2(
    sin(phase) * amp * 0.45 * len,
    -len + max(0.0, cos(phase)) * 0.25 * len * amp
  );
  return sdLimb(p, hip, foot, r, r * 0.85);
}

float oveStand(vec2 p, float phase, float speed, float wag, out float face) {
  vec2 q = p - vec2(0.0, abs(sin(phase)) * 0.06 * speed);
  float d = ellipseSd(q, vec2(0.0, 0.5), vec2(0.44, 0.25));
  d = smin(d, length(q - vec2(0.44, 0.8)) - 0.23, 0.08);
  d = smin(d, length(q - vec2(0.64, 0.74)) - 0.09, 0.04);
  d = smin(d, ellipseSd(q, vec2(0.32, 0.66), vec2(0.09, 0.18)), 0.03);
  vec2 t = rotate(q - vec2(-0.36, 0.6), wag * 0.35);
  float tail = sdLimb(t, vec2(0.0), vec2(-0.08, 0.24), 0.09, 0.1);
  tail = smin(tail, sdLimb(t, vec2(-0.08, 0.24), vec2(0.1, 0.38), 0.1, 0.07), 0.05);
  d = smin(d, tail, 0.06);
  float hip = 0.38 + p.y - q.y;
  d = smin(d, legSd(p, vec2(0.27, hip), phase, speed, 0.075), 0.04);
  d = smin(d, legSd(p, vec2(0.17, hip), phase + 0.6, speed, 0.075), 0.04);
  d = smin(d, legSd(p, vec2(-0.23, hip), phase + PI, speed, 0.075), 0.04);
  d = smin(d, legSd(p, vec2(-0.33, hip), phase + PI + 0.6, speed, 0.075), 0.04);
  d += (noise(q * 14.0) - 0.5) * 0.06;
  face = max(step(length(q - vec2(0.52, 0.86)), 0.045), step(length(q - vec2(0.72, 0.76)), 0.045));
  return d;
}

float oveSit(vec2 p, float wag, out float face) {
  float d = ellipseSd(p, vec2(-0.16, 0.2), vec2(0.24, 0.2));
  d = smin(d, sdLimb(p, vec2(-0.1, 0.3), vec2(0.1, 0.62), 0.2, 0.18), 0.08);
  d = smin(d, length(p - vec2(0.2, 0.9)) - 0.2, 0.07);
  d = smin(d, length(p - vec2(0.39, 0.84)) - 0.085, 0.03);
  d = smin(d, ellipseSd(p, vec2(0.08, 0.8), vec2(0.075, 0.16)), 0.03);
  d = smin(d, sdLimb(p, vec2(0.17, 0.5), vec2(0.22, 0.03), 0.07, 0.06), 0.03);
  d = smin(d, ellipseSd(p, vec2(0.27, 0.035), vec2(0.08, 0.04)), 0.02);
  d = smin(d, ellipseSd(p, vec2(0.04, 0.035), vec2(0.1, 0.035)), 0.03);
  vec2 t = rotate(p - vec2(-0.36, 0.1), wag * 0.25);
  float tail = sdLimb(t, vec2(0.0), vec2(-0.14, 0.18), 0.08, 0.09);
  tail = smin(tail, sdLimb(t, vec2(-0.14, 0.18), vec2(-0.04, 0.34), 0.09, 0.06), 0.04);
  d = smin(d, tail, 0.05);
  d += (noise(p * 14.0) - 0.5) * 0.05;
  face = max(step(length(p - vec2(0.27, 0.95)), 0.04), step(length(p - vec2(0.46, 0.86)), 0.04));
  return d;
}

float poodleStand(vec2 p, float phase, float speed, float wag, out float face) {
  vec2 q = p - vec2(0.0, abs(sin(phase)) * 0.05 * speed);
  float d = ellipseSd(q, vec2(-0.02, 0.6), vec2(0.38, 0.15));
  d = smin(d, length(q - vec2(0.24, 0.62)) - 0.16, 0.06);
  d = smin(d, sdLimb(q, vec2(0.28, 0.66), vec2(0.4, 0.88), 0.08, 0.07), 0.04);
  d = smin(d, length(q - vec2(0.44, 0.92)) - 0.12, 0.04);
  d = smin(d, length(q - vec2(0.41, 1.04)) - 0.1, 0.04);
  d = smin(d, sdLimb(q, vec2(0.5, 0.9), vec2(0.68, 0.86), 0.06, 0.045), 0.03);
  d = smin(d, ellipseSd(q, vec2(0.36, 0.84), vec2(0.07, 0.15)), 0.03);
  vec2 t = rotate(q - vec2(-0.36, 0.66), wag * 0.3);
  d = smin(d, sdLimb(t, vec2(0.0), vec2(-0.06, 0.22), 0.045, 0.04), 0.03);
  d = min(d, length(t - vec2(-0.07, 0.27)) - 0.08);
  float hip = 0.5 + p.y - q.y;
  d = smin(d, legSd(p, vec2(0.25, hip), phase, speed, 0.055), 0.03);
  d = smin(d, legSd(p, vec2(0.16, hip), phase + 0.6, speed, 0.055), 0.03);
  d = smin(d, legSd(p, vec2(-0.24, hip), phase + PI, speed, 0.055), 0.03);
  d = smin(d, legSd(p, vec2(-0.33, hip), phase + PI + 0.6, speed, 0.055), 0.03);
  d += (noise(q * 20.0) - 0.5) * 0.04;
  face = max(step(length(q - vec2(0.49, 0.95)), 0.035), step(length(q - vec2(0.68, 0.86)), 0.035));
  return d;
}

float poodleSit(vec2 p, float wag, out float face) {
  float d = ellipseSd(p, vec2(-0.14, 0.19), vec2(0.23, 0.19));
  d = smin(d, sdLimb(p, vec2(-0.07, 0.3), vec2(0.1, 0.66), 0.18, 0.15), 0.08);
  d = smin(d, length(p - vec2(0.2, 0.92)) - 0.17, 0.06);
  d = smin(d, length(p - vec2(0.14, 1.07)) - 0.14, 0.05);
  d = smin(d, sdLimb(p, vec2(0.3, 0.9), vec2(0.5, 0.84), 0.075, 0.055), 0.03);
  d = smin(d, ellipseSd(p, vec2(0.07, 0.78), vec2(0.09, 0.21)), 0.03);
  d = smin(d, sdLimb(p, vec2(0.15, 0.5), vec2(0.2, 0.04), 0.06, 0.05), 0.03);
  d = smin(d, length(p - vec2(0.23, 0.06)) - 0.075, 0.02);
  vec2 t = rotate(p - vec2(-0.34, 0.14), wag * 0.25);
  d = smin(d, sdLimb(t, vec2(0.0), vec2(-0.1, 0.24), 0.05, 0.04), 0.03);
  d = min(d, length(t - vec2(-0.12, 0.32)) - 0.1);
  d += (noise(p * 18.0) - 0.5) * 0.04;
  face = max(step(length(p - vec2(0.27, 0.97)), 0.04), step(length(p - vec2(0.51, 0.85)), 0.04));
  return d;
}

float oveShape(vec2 p, float phase, vec4 motion, out float face) {
  float sit = motion.y;
  float standFace = 0.0;
  float sitFace = 0.0;
  float d;
  if (sit > 0.99) d = oveSit(p, motion.z, sitFace);
  else if (sit < 0.01) d = oveStand(p, phase, motion.x, motion.z, standFace);
  else d = mix(oveStand(p, phase, motion.x, motion.z, standFace), oveSit(p, motion.z, sitFace), sit);
  face = sit > 0.5 ? sitFace : standFace;
  return max(d, -p.y);
}

float poodleShape(vec2 p, float phase, vec4 motion, out float face) {
  float sit = motion.y;
  float standFace = 0.0;
  float sitFace = 0.0;
  float d;
  if (sit > 0.99) d = poodleSit(p, motion.z, sitFace);
  else if (sit < 0.01) d = poodleStand(p, phase, motion.x, motion.z, standFace);
  else d = mix(poodleStand(p, phase, motion.x, motion.z, standFace), poodleSit(p, motion.z, sitFace), sit);
  face = sit > 0.5 ? sitFace : standFace;
  return max(d, -p.y);
}

struct Dogs {
  float ove;
  float poodle;
  float face;
  float ball;
  float shadow;
  float poodleDepth;
  float glow;
  float oveDepth;
};

float dogShadow(vec2 uv, vec4 dog, float h) {
  return smoothstep(1.0, 0.3, length((uv - dog.xy) / vec2(0.5 * h, 0.07 * h)));
}

Dogs dogs(vec2 uv, float px) {
  vec4 ove = u_sim[0];
  vec4 oveMotion = u_sim[1];
  vec4 poodle = u_sim[2];
  vec4 poodleMotion = u_sim[3];
  vec4 ball = u_sim[4];
  Dogs k = Dogs(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
  float face = 0.0;

  vec2 pb = (uv - poodle.xy) / poodleMotion.w;
  pb.x *= poodle.z;
  if (abs(pb.x) < 1.0 && pb.y > -0.1 && pb.y < 1.35) {
    float d = poodleShape(pb, poodle.w, poodleMotion, face);
    k.poodle = step(d, 0.0);
    k.poodleDepth = clamp(-d / 0.12, 0.0, 1.0);
    k.face = face * k.poodle;
  }

  vec2 pa = (uv - ove.xy) / oveMotion.w;
  pa.x *= ove.z;
  if (abs(pa.x) < 1.6 && pa.y > -0.3 && pa.y < 1.6) {
    float d = oveShape(pa, ove.w, oveMotion, face);
    k.ove = step(d, 0.0);
    k.glow = smoothstep(0.35, 0.0, d);
    k.oveDepth = clamp(-d / 0.12, 0.0, 1.0);
    if (k.ove > 0.0) k.face = face;
  }

  k.shadow = max(dogShadow(uv, ove, oveMotion.w), dogShadow(uv, poodle, poodleMotion.w));
  k.ball = step(length(uv - ball.xy), max(0.02, px * 0.75)) * ball.z;
  return k;
}

struct Cell {
  float g;
  vec2 c;
  vec2 uv;
  float px;
};

Cell glyphGrid() {
  float g = max(1.0, floor(0.75 * u_grain * u_dpr + 0.5));
  float size = 8.0 * g;
  vec2 c = floor(gl_FragCoord.xy / size);
  return Cell(g, c, sceneUv((c + 0.5) * size), size / u_res.y);
}

float duskLum(Cell cell, Scene s, Dogs k, vec2 moon) {
  float H = horizonY(cell.uv.x, 4);
  float md = length(cell.uv - moon);
  float lum = 0.02 + 0.08 * exp(-md * 5.0) + s.cloud * 0.12;
  lum = max(lum, 0.15 * step(0.98, hash21(cell.c)) * step(H + 0.1, cell.uv.y));
  lum = max(lum, smoothstep(0.06, 0.05, md) * 0.9);
  float field = 0.03 + 0.6 * smoothstep(0.45, 0.85, s.wave) * (0.35 + 0.65 * s.depth);
  lum = mix(lum, field * (1.0 - 0.8 * k.shadow), s.field);
  float tree = mix(0.45 + 0.4 * smoothstep(-0.3, 1.0, s.lit), 0.85, s.wood);
  lum = mix(lum, mix(tree, 0.25, s.fog), s.tree);
  return mix(lum, 0.1 + 0.25 * s.tip, s.blade);
}
`;

const MEMORY = `
#define MEMORY
const int FONT[30] = int[30](
  0, 23530, 15083, 25166, 15211, 29391, 4815, 27470, 23533, 29847,
  11044, 23277, 29257, 23549, 23403, 11114, 4843, 26474, 23275, 14478,
  9367, 31597, 11117, 24557, 23213, 9389, 29351, 8192, 5120, 18
);

float memoryLetter(vec2 c, vec2 grid, float reveal, out float fresh) {
  fresh = 0.0;
  int perLine = max(int((grid.x + 1.0) / 4.0), 1);
  int lineLen[12];
  for (int i = 0; i < 12; i++) lineLen[i] = 0;
  int line = 0;
  int col = 0;
  for (int i = 0; i < TEXT_LEN; i++) {
    if ((WORD[i] > 0 && col > 0 && col + WORD[i] > perLine) || col >= perLine) {
      line++;
      col = 0;
    }
    if (TEXT[i] == 0 && col == 0) continue;
    col++;
    if (TEXT[i] != 0 && line < 12) lineLen[line] = col;
  }
  int lines = min(line + 1, 12);
  float blockH = float(lines * 6 - 1);
  float floorRow = floor(grid.y * 0.27);
  float topRow = min(floorRow + floor((grid.y - floorRow + blockH) * 0.5) - 1.0, grid.y - 1.0);
  int ty = int(topRow - c.y);
  if (ty < 0 || float(ty) >= blockH) return 0.0;
  int charRow = ty / 6;
  int py = ty - charRow * 6;
  if (py == 5) return 0.0;
  float start = max(floor((grid.x - float(lineLen[charRow] * 4 - 1)) * 0.5), 0.0);
  int tx = int(c.x - start);
  if (tx < 0) return 0.0;
  int charCol = tx / 4;
  int px = tx - charCol * 4;
  if (px == 3 || charCol >= lineLen[charRow]) return 0.0;
  line = 0;
  col = 0;
  for (int i = 0; i < TEXT_LEN; i++) {
    if ((WORD[i] > 0 && col > 0 && col + WORD[i] > perLine) || col >= perLine) {
      line++;
      col = 0;
    }
    if (TEXT[i] == 0 && col == 0) continue;
    if (line == charRow && col == charCol) {
      if (float(i) >= reveal) return 0.0;
      fresh = clamp(1.0 - (reveal - float(i)), 0.0, 1.0);
      return float((FONT[TEXT[i]] >> (py * 3 + px)) & 1);
    }
    col++;
  }
  return 0.0;
}
`;

const FONT_ORDER = " ABCDEFGHIJKLMNOPQRSTUVWXYZ.,'";

const memoryText = (line: string) => {
  const text = line.toUpperCase();
  const chars = Array.from(text);
  const codes = chars.map((ch) => Math.max(FONT_ORDER.indexOf(ch), 0));
  const words = chars.map((ch, i) =>
    ch !== " " && (i === 0 || chars[i - 1] === " ") ? text.slice(i).split(" ")[0].length : 0
  );
  return `
#define TEXT_LEN ${codes.length}
const int TEXT[TEXT_LEN] = int[TEXT_LEN](${codes.join(", ")});
const int WORD[TEXT_LEN] = int[TEXT_LEN](${words.join(", ")});
`;
};

const REMEMBER = `
#ifdef MEMORY
  float memory = u_sim[4].w;
  if (memory > 0.0 && k.ove == 0.0) {
    vec2 grid = floor(u_res / (8.0 * cell.g));
    if (hash21(cell.c + 7.3) < memory * 2.2) n = 0;
    float drift = floor(cell.c.y + u_time * 1.5 + hash11(cell.c.x) * 40.0);
    if (memory > 0.3 && hash21(vec2(cell.c.x, drift)) > 0.985) {
      n = rampGlyph(0.25);
      ink = vec3(0.969) * 0.45;
    }
    float fresh;
    float letter = memoryLetter(cell.c, grid, clamp((memory - 0.5) / 0.4, 0.0, 1.0) * float(TEXT_LEN), fresh);
    if (letter > 0.0) {
      n = fresh > 0.0 ? rampGlyph(0.3 + 0.6 * hash21(cell.c + floor(u_time * 24.0))) : 11512810;
      ink = vec3(0.969);
    }
  }
#endif
`;

const OVE_FETCH = `
void main() {
  Cell cell = glyphGrid();
  vec2 moon = vec2(0.62, 0.8);
  Scene s = scene(cell.uv, 4, moon, cell.px);
  Dogs k = dogs(cell.uv, cell.px);
  float lum = duskLum(cell, s, k, moon);

  int n = rampGlyph(lum);
  vec3 ink = vec3(0.969) * (0.35 + 0.5 * clamp(lum, 0.0, 1.0));
  float fur = noise(cell.uv * 60.0);
  if (k.poodle > 0.0) {
    n = rampGlyph(0.72 + 0.28 * k.poodleDepth + 0.1 * fur);
    ink = ORANGE;
  }
  if (k.ove > 0.0) {
    n = rampGlyph(0.7 + 0.25 * k.oveDepth + 0.1 * fur);
    ink = vec3(1.0);
  }
  if (k.face > 0.0) n = 0;
  if (k.ball > 0.0) {
    n = GLYPH_BALL;
    ink = vec3(1.0);
  }
${REMEMBER}
  outColor = vec4(mix(vec3(0.086), ink, glyph(n, glyphCell(cell.g))), 1.0);
}
`;

const OVE_MOONLIGHT = `
void main() {
  Cell cell = glyphGrid();
  vec2 uv = cell.uv;
  vec2 moon = vec2(-0.55, 0.78);
  Scene s = scene(uv, 4, moon, cell.px);
  Dogs k = dogs(uv, cell.px);
  float H = horizonY(uv.x, 4);

  float md = length(uv - moon);
  float star = hash21(cell.c);
  float lum = 0.01 + 0.12 * exp(-md * 4.0) + s.cloud * 0.08;
  lum = max(lum, (0.14 + 0.1 * sin(u_time * 2.0 + star * 40.0)) * step(0.965, star) * step(H + 0.08, uv.y));
  lum = max(lum, smoothstep(0.085, 0.075, md));
  float field = 0.02 + 0.45 * smoothstep(0.5, 0.9, s.wave) * (0.3 + 0.7 * s.depth);
  lum = mix(lum, field * (1.0 - 0.8 * k.shadow), s.field);
  lum = mix(lum, mix(0.22 + 0.3 * smoothstep(0.2, 1.0, s.lit), 0.3, s.wood), s.tree);
  lum = mix(lum, 0.06 + 0.15 * s.tip, s.blade);
  lum = max(lum, k.glow * 0.24);

  float flies = specks(uv, 9.0, 0.2, vec2(u_wtime * 0.02, 0.0), cell.px, 4.0);
  float ember = step(0.5, flies) * step(uv.y, 0.55);

  int n = rampGlyph(lum);
  vec3 ink = vec3(0.8, 0.86, 1.0) * (0.35 + 0.55 * clamp(lum, 0.0, 1.0));
  float fur = noise(uv * 60.0);
  if (ember > 0.0) {
    n = rampGlyph(0.35);
    ink = vec3(1.0, 0.78, 0.4);
  }
  if (k.poodle > 0.0) {
    n = rampGlyph(0.72 + 0.28 * k.poodleDepth + 0.1 * fur);
    ink = ORANGE * 0.9;
  }
  if (k.ove > 0.0) {
    n = rampGlyph(0.72 + 0.25 * k.oveDepth + 0.1 * fur);
    ink = vec3(1.0);
  }
  if (k.face > 0.0) n = 0;
  if (k.ball > 0.0) {
    n = GLYPH_BALL;
    ink = vec3(1.0);
  }
${REMEMBER}
  outColor = vec4(mix(vec3(0.06, 0.065, 0.08), ink, glyph(n, glyphCell(cell.g))), 1.0);
}
`;

const OVE_NAME = `
float bayer2(vec2 a) {
  a = floor(a);
  return fract(dot(a, vec2(0.5, a.y * 0.75)));
}

float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

float shade(float lum, float g) {
  float level = floor(clamp(lum, 0.0, 1.0) * 4.0 + 0.5) / 4.0;
  return step(bayer4(floor(gl_FragCoord.xy / g)) + 0.01, level);
}

void main() {
  Cell cell = glyphGrid();
  vec2 moon = vec2(0.62, 0.8);
  Scene s = scene(cell.uv, 4, moon, cell.px);
  Dogs k = dogs(cell.uv, cell.px);
  float lum = duskLum(cell, s, k, moon);

  vec3 bg = vec3(0.086);
  vec3 col = mix(bg, vec3(0.969) * 0.7, shade(lum * 0.9, cell.g));
  if (k.poodle > 0.0) {
    col = mix(bg, ORANGE, shade(0.6 + 0.4 * k.poodleDepth, cell.g));
  }
  if (k.ove > 0.0) {
    float letter = mod(cell.c.x + cell.c.y * 2.0, 3.0);
    int n = letter < 0.5 ? GLYPH_O : (letter < 1.5 ? GLYPH_V : GLYPH_E);
    col = mix(bg, vec3(0.969) * 0.3, shade(0.5, cell.g));
    col = mix(col, vec3(1.0), glyph(n, glyphCell(cell.g)));
  }
  if (k.face > 0.0) col = bg;
  if (k.ball > 0.0) col = mix(bg, vec3(1.0), glyph(GLYPH_BALL, glyphCell(cell.g)));
  outColor = vec4(col, 1.0);
}
`;

const OVE_PRELUDE = PRELUDE + GLYPHS + DOGS;

export const oveShaders: OakShader[] = [
  {
    id: "fetch",
    title: "Fetch",
    note: "Ove and the poodle chase each other around the oak. Click to throw the ball.",
    fragment: OVE_PRELUDE + OVE_FETCH,
  },
  {
    id: "moonlight",
    title: "Moonlight",
    note: "Night under the oak. Ove glows a little, fireflies drift over the grass.",
    fragment: OVE_PRELUDE + OVE_MOONLIGHT,
  },
  {
    id: "name",
    title: "Ove",
    note: "Shade blocks, and Ove's coat written in his own name.",
    fragment: OVE_PRELUDE + OVE_NAME,
  },
];

export const rememberShader = (base: "fetch" | "moonlight", line: string) =>
  OVE_PRELUDE + memoryText(line) + MEMORY + (base === "fetch" ? OVE_FETCH : OVE_MOONLIGHT);
