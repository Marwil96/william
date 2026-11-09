import { CSSProperties, useEffect, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { PortalSettings, pixelRatio, startPortalLoop } from "./interaction";

type OakDioramaProps = {
  settings: PortalSettings;
  resolution: number;
  label: string;
  className?: string;
  style?: CSSProperties;
};

const GRASS_BLADES = 45000;
const SUN_DIRECTION = new THREE.Vector3(-0.7, 0.35, 0.3).normalize();
const HORIZON = new THREE.Color().setRGB(1, 0.82, 0.6, THREE.SRGBColorSpace);
const CAMERA_TARGET = new THREE.Vector3(0, 2.6, -4);

const OAKS: { x: number; z: number; scale: number; seed: number }[] = [
  { x: -22, z: -32, scale: 1.3, seed: 7 },
  { x: 16, z: -28, scale: 1.1, seed: 6 },
  { x: 1.5, z: -22, scale: 0.9, seed: 5 },
  { x: -13, z: -18, scale: 1.2, seed: 4 },
  { x: 9, z: -12, scale: 1, seed: 3 },
  { x: -5.5, z: -7, scale: 1.1, seed: 2 },
  { x: 3.6, z: -3.5, scale: 0.95, seed: 1 },
];

const WIND_GLSL = `
uniform float u_wtime;
uniform float u_wind;
uniform float u_gust;
uniform float u_stir;
uniform float u_push;
uniform vec3 u_pointer;
uniform vec3 u_burst;

float windHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float windNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(windHash(i), windHash(i + vec2(1.0, 0.0)), u.x),
    mix(windHash(i + vec2(0.0, 1.0)), windHash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

vec2 ambientWind(vec2 xz) {
  float gust = smoothstep(0.3, 0.8, windNoise(vec2(xz.x * 0.12 - u_wtime * 0.55, xz.y * 0.1 + u_wtime * 0.03)));
  float breath = 0.5 + 0.5 * sin(u_wtime * 0.31 + 1.3);
  return vec2(1.0, 0.3) * u_wind * (0.4 + 0.3 * breath + u_gust * gust);
}

vec2 groundPush(vec2 xz) {
  vec2 d = xz - u_pointer.xy;
  vec2 push = d / (length(d) + 0.05) * exp(-dot(d, d) * 0.6) * u_stir * u_pointer.z * 2.0;
  vec2 b = xz - u_burst.xy;
  float ring = length(b) - u_burst.z * 7.0;
  push += b / (length(b) + 0.05) * exp(-ring * ring * 0.35) * exp(-u_burst.z * 0.9) * 2.4;
  return push * u_push;
}
`;

const SCREEN_PUSH_GLSL = `
uniform float u_aspect;
uniform vec3 u_pointerNdc;
uniform vec2 u_burstNdc;

vec2 screenPush(vec3 anchor) {
  vec4 clip = projectionMatrix * viewMatrix * vec4(anchor, 1.0);
  vec2 ndc = clip.xy / clip.w;
  vec2 d = (ndc - u_pointerNdc.xy) * vec2(u_aspect, 1.0);
  float stir = sign(d.x) * exp(-dot(d, d) * 5.0) * u_stir * u_pointerNdc.z * 2.0;
  vec2 b = (ndc - u_burstNdc) * vec2(u_aspect, 1.0);
  float ring = length(b) - u_burst.z * 1.6;
  float burst = sign(b.x) * exp(-ring * ring * 10.0) * exp(-u_burst.z * 0.9) * 2.4;
  return vec2(stir + burst, 0.0) * u_push;
}
`;

type WindUniforms = {
  u_wtime: THREE.IUniform<number>;
  u_wind: THREE.IUniform<number>;
  u_gust: THREE.IUniform<number>;
  u_stir: THREE.IUniform<number>;
  u_push: THREE.IUniform<number>;
  u_pointer: THREE.IUniform<THREE.Vector3>;
  u_burst: THREE.IUniform<THREE.Vector3>;
  u_aspect: THREE.IUniform<number>;
  u_pointerNdc: THREE.IUniform<THREE.Vector3>;
  u_burstNdc: THREE.IUniform<THREE.Vector2>;
};

type WindOptions = {
  height: number;
  amount: number;
  rustle: number;
  shimmer: boolean;
  screen: boolean;
};

const float = (n: number) => n.toFixed(4);

function projectWithWind({ height, amount, rustle, shimmer, screen }: WindOptions) {
  const push = screen
    ? `screenPush(windRoot + vec3(0.0, ${float(height * 0.6)}, 0.0))`
    : "groundPush(windRoot.xz)";
  return `
vec4 mvPosition = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
  vec3 windRoot = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
#else
  vec3 windRoot = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
#endif
vec4 windWorld = modelMatrix * mvPosition;
float windSeed = fract(dot(windRoot.xz, vec2(0.37, 0.11)));
float windRise = max(windWorld.y - windRoot.y, 0.0);
float windH = clamp(windRise / ${float(height)}, 0.0, 1.4);
vec2 windForce = ambientWind(windRoot.xz) + ${push};
float windWobble = sin(u_wtime * (1.6 + windSeed) + windSeed * 6.283);
vec2 windOffset = (windForce * (0.8 + 0.25 * windWobble) + vec2(0.0, 0.15 * u_gust * windWobble))
  * ${float(amount)} * windH * windH;
float windLength = length(windOffset);
if (windLength > 0.9 * windRise) windOffset *= 0.9 * windRise / windLength;
windWorld.xz += windOffset;
windWorld.y = windRoot.y + sqrt(max(windRise * windRise - dot(windOffset, windOffset), 0.0));
windWorld.xyz += vec3(
  sin(u_wtime * 4.1 + windWorld.y * 2.7 + windWorld.x * 1.9),
  0.5 * sin(u_wtime * 3.3 + windWorld.z * 2.1),
  cos(u_wtime * 3.6 + windWorld.x * 2.3 + windWorld.z * 1.7)
) * ${float(rustle)} * windH * length(windForce);
${shimmer ? "vColor *= 1.0 + 0.45 * windH * clamp(length(windForce) - 0.45, 0.0, 1.0);" : ""}
mvPosition = viewMatrix * windWorld;
gl_Position = projectionMatrix * mvPosition;
`;
}

function withWind(
  material: THREE.MeshLambertMaterial,
  uniforms: WindUniforms,
  options: WindOptions
) {
  material.customProgramCacheKey = () => JSON.stringify(options);
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${WIND_GLSL}\n${SCREEN_PUSH_GLSL}`)
      .replace("#include <project_vertex>", projectWithWind(options));
  };
  return material;
}

function withGroundWind(material: THREE.MeshLambertMaterial, uniforms: WindUniforms) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec2 vGround;")
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvGround = (modelMatrix * vec4(transformed, 1.0)).xz;"
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\nvarying vec2 vGround;\n${WIND_GLSL}`)
      .replace(
        "#include <color_fragment>",
        "#include <color_fragment>\ndiffuseColor.rgb *= 0.8 + 0.3 * clamp(length(ambientWind(vGround) + groundPush(vGround)), 0.0, 1.5);"
      );
  };
  return material;
}

function random(seed: number) {
  let a = seed * 2654435761;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paint(geometry: THREE.BufferGeometry, pick: (face: number) => THREE.Color) {
  const flat = geometry.index ? geometry.toNonIndexed() : geometry;
  const count = flat.attributes.position.count;
  const colors = new Float32Array(count * 3);
  for (let face = 0; face < count / 3; face++) {
    const c = pick(face);
    for (let v = 0; v < 3; v++) colors.set([c.r, c.g, c.b], (face * 3 + v) * 3);
  }
  flat.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return flat;
}

function buildOak(seed: number) {
  const rand = random(seed);
  const up = new THREE.Vector3(0, 1, 0);
  const bark = new THREE.Color("#4a3b2c");
  const leafDark = new THREE.Color("#3a4d1c");
  const leafLight = new THREE.Color("#8d9b3c");
  const wood: THREE.BufferGeometry[] = [];
  const leaves: THREE.BufferGeometry[] = [];

  const limb = (from: THREE.Vector3, to: THREE.Vector3, r0: number, r1: number) => {
    const dir = to.clone().sub(from);
    const length = dir.length();
    const g = new THREE.CylinderGeometry(r1, r0, length, 7, 1);
    g.translate(0, length / 2, 0);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up, dir.normalize()));
    g.translate(from.x, from.y, from.z);
    wood.push(paint(g, () => bark.clone().multiplyScalar(0.8 + rand() * 0.4)));
  };

  const blob = (center: THREE.Vector3, radius: number) => {
    const g = new THREE.IcosahedronGeometry(radius, 1);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      const z = p.getZ(i);
      const lump =
        1 +
        0.16 * Math.sin(x * 2.3 + seed) * Math.sin(y * 1.9 + seed * 0.5) * Math.sin(z * 2.1) +
        0.07 * Math.sin(x * 5.1 + z * 4.3 + seed);
      p.setXYZ(i, x * lump, y * lump * 0.82, z * lump);
    }
    g.translate(center.x, center.y, center.z);
    leaves.push(
      paint(g, () =>
        leafDark.clone().lerp(leafLight, Math.min(1, rand() * 0.8 + (center.y - 2.5) * 0.15))
      )
    );
  };

  const lean = (rand() - 0.5) * 0.3;
  const top = new THREE.Vector3(lean, 2.1, 0);
  limb(new THREE.Vector3(0, -0.2, 0), top, 0.42, 0.3);
  limb(new THREE.Vector3(0.25, -0.1, 0.1), new THREE.Vector3(0.6, -0.1, 0.25), 0.18, 0.05);
  limb(new THREE.Vector3(-0.2, -0.1, -0.15), new THREE.Vector3(-0.55, -0.1, -0.35), 0.16, 0.05);

  const limbs = 5;
  for (let i = 0; i < limbs; i++) {
    const angle = (i / limbs) * Math.PI * 2 + rand() * 0.8;
    const reach = 1.9 + rand() * 0.9;
    const end = top
      .clone()
      .add(new THREE.Vector3(Math.cos(angle) * reach, 0.9 + rand() * 0.8, Math.sin(angle) * reach * 0.8));
    limb(top, end, 0.22, 0.08);
    blob(end.clone().add(new THREE.Vector3(0, 0.5, 0)), 1.1 + rand() * 0.45);
    const mid = top.clone().lerp(end, 0.55).add(new THREE.Vector3(0, 1.1 + rand() * 0.4, 0));
    blob(mid, 0.95 + rand() * 0.35);
  }
  blob(top.clone().add(new THREE.Vector3(0, 2.3, 0)), 1.6);

  return { wood: mergeGeometries(wood), leaves: mergeGeometries(leaves) };
}

function buildGrass() {
  const blade = new THREE.PlaneGeometry(0.07, 1, 1, 4);
  blade.translate(0, 0.5, 0);
  const position = blade.attributes.position;
  const normal = blade.attributes.normal;
  const shade = new Float32Array(position.count * 3);
  const tilted = new THREE.Vector3(0, 0.5, 1).normalize();
  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i);
    position.setX(i, position.getX(i) * (1 - y * 0.9));
    normal.setXYZ(i, tilted.x, tilted.y, tilted.z);
    const v = 0.3 + 0.7 * y;
    shade.set([v, v, v], i * 3);
  }
  blade.setAttribute("color", new THREE.BufferAttribute(shade, 3));
  return blade;
}

function scatterGrass(mesh: THREE.InstancedMesh) {
  const rand = random(99);
  const olive = new THREE.Color("#5f6b2a");
  const straw = new THREE.Color("#d2ae5e");
  const color = new THREE.Color();
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < mesh.count; i++) {
    const depth = Math.pow(rand(), 0.7);
    const z = 7 - depth * 33;
    const x = (rand() - 0.5) * (30 + depth * 30);
    position.set(x, 0, z);
    rotation.setFromAxisAngle(up, rand() * Math.PI);
    const height = 0.35 + rand() * 0.45;
    scale.set(0.8 + rand() * 0.6, height, 1);
    matrix.compose(position, rotation, scale);
    mesh.setMatrixAt(i, matrix);
    const patch = 0.5 + 0.5 * Math.sin(x * 0.35 + Math.sin(z * 0.27) * 2);
    color.copy(olive).lerp(straw, Math.min(1, patch * 0.8 + rand() * 0.35));
    mesh.setColorAt(i, color);
  }
}

const SKY_VERTEX = `
varying vec3 vDirection;
void main() {
  vDirection = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const SKY_FRAGMENT = `
uniform vec3 u_sun;
varying vec3 vDirection;
void main() {
  vec3 d = normalize(vDirection);
  vec3 col = mix(vec3(1.0, 0.82, 0.6), vec3(0.42, 0.6, 0.8), smoothstep(0.0, 0.45, d.y));
  float s = max(dot(d, u_sun), 0.0);
  col += vec3(1.0, 0.7, 0.4) * pow(s, 10.0) * 0.45 + vec3(1.0, 0.92, 0.75) * pow(s, 600.0) * 1.5;
  gl_FragColor = vec4(col, 1.0);
}`;

export function OakDiorama({
  settings,
  resolution,
  label,
  className,
  style,
}: OakDioramaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef(settings);
  const resolutionRef = useRef(resolution);

  useEffect(() => {
    settingsRef.current = settings;
    resolutionRef.current = resolution;
  }, [settings, resolution]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.domElement.className = "block w-full h-full";
    container.appendChild(renderer.domElement);

    const uniforms: WindUniforms = {
      u_wtime: { value: 0 },
      u_wind: { value: 0 },
      u_gust: { value: 0 },
      u_stir: { value: 0 },
      u_push: { value: 1 },
      u_pointer: { value: new THREE.Vector3(0, 0, 0) },
      u_burst: { value: new THREE.Vector3(0, 0, 99) },
      u_aspect: { value: 1 },
      u_pointerNdc: { value: new THREE.Vector3(0, 0, 0) },
      u_burstNdc: { value: new THREE.Vector2(0, 0) },
    };

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(HORIZON, 14, 75);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 300);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T) => {
      disposables.push(item);
      return item;
    };

    const sky = new THREE.Mesh(
      track(new THREE.SphereGeometry(150, 32, 16)),
      track(
        new THREE.ShaderMaterial({
          vertexShader: SKY_VERTEX,
          fragmentShader: SKY_FRAGMENT,
          uniforms: { u_sun: { value: SUN_DIRECTION } },
          side: THREE.BackSide,
          depthWrite: false,
          fog: false,
        })
      )
    );
    scene.add(sky);

    const sun = new THREE.DirectionalLight("#ffd29a", 2.4);
    sun.position.copy(SUN_DIRECTION).multiplyScalar(50);
    scene.add(sun, new THREE.HemisphereLight("#bcd2e8", "#5a4a2a", 1.5));

    const ground = new THREE.Mesh(
      track(new THREE.PlaneGeometry(240, 240).rotateX(-Math.PI / 2)),
      track(withGroundWind(new THREE.MeshLambertMaterial({ color: "#6b5e2c" }), uniforms))
    );
    scene.add(ground);

    const grass = new THREE.InstancedMesh(
      track(buildGrass()),
      track(
        withWind(
          new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }),
          uniforms,
          { height: 0.6, amount: 0.35, rustle: 0, shimmer: true, screen: false }
        )
      ),
      GRASS_BLADES
    );
    scatterGrass(grass);
    scene.add(grass);

    const woodMaterial = track(
      withWind(new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }), uniforms, {
        height: 5,
        amount: 0.18,
        rustle: 0,
        shimmer: false,
        screen: true,
      })
    );
    const leafMaterial = track(
      withWind(new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }), uniforms, {
        height: 5,
        amount: 0.18,
        rustle: 0.05,
        shimmer: false,
        screen: true,
      })
    );
    for (const oak of OAKS) {
      const { wood, leaves } = buildOak(oak.seed);
      const tree = new THREE.Group();
      tree.add(new THREE.Mesh(track(wood), woodMaterial), new THREE.Mesh(track(leaves), leafMaterial));
      tree.position.set(oak.x, 0, oak.z);
      tree.scale.setScalar(oak.scale);
      tree.rotation.y = oak.seed * 1.7;
      scene.add(tree);
    }

    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const backdrop = new THREE.Plane(new THREE.Vector3(0, 0, 1), 4);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const size = new THREE.Vector2();
    let lastBurstAge = 0;

    const aim = (x: number, y: number) => {
      ndc.set(x * 2 - 1, y * 2 - 1);
      raycaster.setFromCamera(ndc, camera);
      const onGround = raycaster.ray.intersectPlane(groundPlane, hit);
      if (onGround && hit.z > -25) return hit;
      return raycaster.ray.intersectPlane(backdrop, hit);
    };

    const loop = startPortalLoop(
      container,
      () => settingsRef.current.speed,
      ({ windTime, width, height, pointer }) => {
        const s = settingsRef.current;
        const ratio = pixelRatio(resolutionRef.current);
        if (renderer.getPixelRatio() !== ratio) renderer.setPixelRatio(ratio);
        renderer.getSize(size);
        if (size.x !== width || size.y !== height) {
          renderer.setSize(width, height, false);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
        }

        camera.position.set(pointer.lookX * 0.9 * s.parallax, 1.5 + pointer.lookY * 0.35 * s.parallax, 10);
        camera.lookAt(CAMERA_TARGET);
        camera.updateMatrixWorld();

        const target = aim(pointer.x, pointer.y);
        if (target) uniforms.u_pointer.value.set(target.x, target.z, pointer.presence);
        else uniforms.u_pointer.value.z = 0;
        if (pointer.burstAge < lastBurstAge) {
          const origin = aim(pointer.burstX, pointer.burstY);
          if (origin) uniforms.u_burst.value.set(origin.x, origin.z, 0);
        }
        lastBurstAge = pointer.burstAge;
        uniforms.u_burst.value.z = pointer.burstAge;
        uniforms.u_aspect.value = camera.aspect;
        uniforms.u_pointerNdc.value.set(pointer.x * 2 - 1, pointer.y * 2 - 1, pointer.presence);
        uniforms.u_burstNdc.value.set(pointer.burstX * 2 - 1, pointer.burstY * 2 - 1);

        uniforms.u_wtime.value = windTime;
        uniforms.u_wind.value = s.wind;
        uniforms.u_gust.value = s.gust;
        uniforms.u_stir.value = pointer.stir;
        uniforms.u_push.value = s.push;
        renderer.render(scene, camera);
      }
    );

    return () => {
      loop.dispose();
      disposables.forEach((item) => item.dispose());
      grass.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={containerRef} role="img" aria-label={label} className={className} style={style} />
  );
}
