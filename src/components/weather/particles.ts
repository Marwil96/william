import { WeatherCondition, Season, SeasonPalette } from "./types";

// ---------------------------------------------------------------------------
// Particle type and pool
// ---------------------------------------------------------------------------

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  /** 0-1, used for parallax layering (0 = far, 1 = near) */
  depth: number;
  /** Rotation angle in radians (snow, stars) */
  rotation: number;
  rotationSpeed: number;
  /** Per-particle hue/brightness variation */
  variant: number;
}

export interface RippleEffect {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export interface ParticleSystemConfig {
  condition: WeatherCondition;
  season: Season;
  palette: SeasonPalette;
  isDay: boolean;
  width: number;
  height: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_PARTICLES = 150;
const PARALLAX_STRENGTH = 20;
const MOUSE_REPEL_RADIUS = 80;
const MOUSE_REPEL_FORCE = 0.6;
const RIPPLE_MAX_RADIUS = 120;

// ---------------------------------------------------------------------------
// Particle creation per weather type
// ---------------------------------------------------------------------------

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createRainParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w * 1.2 - w * 0.1,
    y: -randomRange(10, 60),
    vx: randomRange(-0.5, -1.5),
    vy: randomRange(6, 12),
    size: randomRange(1, 2.5),
    opacity: randomRange(0.3, 0.7),
    life: 0,
    maxLife: Infinity,
    depth: randomRange(0.3, 1),
    rotation: 0,
    rotationSpeed: 0,
    variant: Math.random(),
  };
}

function createSnowParticle(w: number, h: number): Particle {
  const sizeClass = Math.random();
  const size = sizeClass < 0.5 ? randomRange(1.5, 2.5) : sizeClass < 0.85 ? randomRange(2.5, 4) : randomRange(4, 6);
  return {
    x: Math.random() * w * 1.2 - w * 0.1,
    y: -randomRange(10, 40),
    vx: randomRange(-0.3, 0.3),
    vy: randomRange(0.5, 2),
    size,
    opacity: randomRange(0.4, 0.9),
    life: 0,
    maxLife: Infinity,
    depth: randomRange(0.2, 1),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: randomRange(-0.02, 0.02),
    variant: Math.random(),
  };
}

function createClearDayParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: h + randomRange(10, 40),
    vx: randomRange(-0.2, 0.2),
    vy: randomRange(-0.3, -1),
    size: randomRange(1, 3),
    opacity: randomRange(0.15, 0.4),
    life: 0,
    maxLife: randomRange(200, 400),
    depth: randomRange(0.3, 1),
    rotation: 0,
    rotationSpeed: 0,
    variant: Math.random(),
  };
}

function createStarParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: 0,
    vy: 0,
    size: randomRange(0.5, 2.5),
    opacity: randomRange(0.2, 0.8),
    life: 0,
    maxLife: Infinity,
    depth: randomRange(0.1, 0.6),
    rotation: 0,
    rotationSpeed: 0,
    variant: Math.random(),
  };
}

function createShootingStarParticle(w: number, h: number): Particle {
  return {
    x: randomRange(0, w * 0.8),
    y: randomRange(0, h * 0.3),
    vx: randomRange(4, 8),
    vy: randomRange(2, 5),
    size: randomRange(1.5, 2.5),
    opacity: 1,
    life: 0,
    maxLife: randomRange(40, 80),
    depth: 0.9,
    rotation: 0,
    rotationSpeed: 0,
    variant: 1,
  };
}

function createCloudParticle(w: number, h: number): Particle {
  return {
    x: -randomRange(100, 300),
    y: randomRange(0, h * 0.5),
    vx: randomRange(0.2, 0.6),
    vy: randomRange(-0.05, 0.05),
    size: randomRange(80, 200),
    opacity: randomRange(0.04, 0.1),
    life: 0,
    maxLife: Infinity,
    depth: randomRange(0.1, 0.5),
    rotation: 0,
    rotationSpeed: 0,
    variant: Math.random(),
  };
}

function createFogParticle(w: number, h: number): Particle {
  return {
    x: -randomRange(100, 400),
    y: randomRange(0, h),
    vx: randomRange(0.3, 0.8),
    vy: randomRange(-0.05, 0.05),
    size: randomRange(200, 500),
    opacity: randomRange(0.03, 0.08),
    life: 0,
    maxLife: Infinity,
    depth: randomRange(0.1, 0.8),
    rotation: 0,
    rotationSpeed: 0,
    variant: Math.random(),
  };
}

function createDrizzleParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w * 1.1,
    y: -randomRange(5, 30),
    vx: randomRange(-0.3, -0.8),
    vy: randomRange(3, 6),
    size: randomRange(0.5, 1.5),
    opacity: randomRange(0.2, 0.5),
    life: 0,
    maxLife: Infinity,
    depth: randomRange(0.3, 1),
    rotation: 0,
    rotationSpeed: 0,
    variant: Math.random(),
  };
}

// ---------------------------------------------------------------------------
// Particle counts per weather type
// ---------------------------------------------------------------------------

function getParticleCount(condition: WeatherCondition, isDay: boolean): number {
  switch (condition) {
    case "rain": return 120;
    case "thunderstorm": return 140;
    case "drizzle": return 60;
    case "snow": return 80;
    case "clear": return isDay ? 30 : 50;
    case "cloudy": return 12;
    case "fog": return 15;
    default: return 30;
  }
}

function createParticleForCondition(
  condition: WeatherCondition,
  isDay: boolean,
  w: number,
  h: number
): Particle {
  switch (condition) {
    case "rain":
    case "thunderstorm":
      return createRainParticle(w, h);
    case "drizzle":
      return createDrizzleParticle(w, h);
    case "snow":
      return createSnowParticle(w, h);
    case "clear":
      return isDay ? createClearDayParticle(w, h) : createStarParticle(w, h);
    case "cloudy":
      return createCloudParticle(w, h);
    case "fog":
      return createFogParticle(w, h);
    default:
      return createClearDayParticle(w, h);
  }
}

// ---------------------------------------------------------------------------
// Main particle system
// ---------------------------------------------------------------------------

export class ParticleSystem {
  particles: Particle[] = [];
  ripples: RippleEffect[] = [];
  config: ParticleSystemConfig;
  private shootingStarTimer = 0;
  private lightningTimer = 0;
  lightningFlash = 0;

  constructor(config: ParticleSystemConfig) {
    this.config = config;
    this.init();
  }

  init() {
    this.particles = [];
    this.ripples = [];
    const count = Math.min(
      getParticleCount(this.config.condition, this.config.isDay),
      MAX_PARTICLES
    );
    const { width: w, height: h } = this.config;

    for (let i = 0; i < count; i++) {
      const p = createParticleForCondition(this.config.condition, this.config.isDay, w, h);
      // Spread initial particles across screen
      if (
        this.config.condition === "rain" ||
        this.config.condition === "drizzle" ||
        this.config.condition === "thunderstorm"
      ) {
        p.y = Math.random() * h;
      } else if (this.config.condition === "snow") {
        p.y = Math.random() * h;
      } else if (this.config.condition === "fog" || this.config.condition === "cloudy") {
        p.x = Math.random() * (w + 400) - 200;
      }
      this.particles.push(p);
    }
  }

  updateConfig(config: ParticleSystemConfig) {
    const changed =
      config.condition !== this.config.condition ||
      config.isDay !== this.config.isDay ||
      config.width !== this.config.width ||
      config.height !== this.config.height;
    this.config = config;
    if (changed) this.init();
  }

  update(mouseX: number, mouseY: number) {
    const { width: w, height: h, condition, isDay } = this.config;

    // Lightning for thunderstorms
    if (condition === "thunderstorm") {
      this.lightningTimer++;
      if (this.lightningTimer > randomRange(200, 600)) {
        this.lightningFlash = 1;
        this.lightningTimer = 0;
      }
      if (this.lightningFlash > 0) {
        this.lightningFlash = Math.max(0, this.lightningFlash - 0.05);
      }
    } else {
      this.lightningFlash = 0;
    }

    // Shooting stars for clear night
    if (condition === "clear" && !isDay) {
      this.shootingStarTimer++;
      if (this.shootingStarTimer > randomRange(300, 800)) {
        if (this.particles.length < MAX_PARTICLES) {
          this.particles.push(createShootingStarParticle(w, h));
        }
        this.shootingStarTimer = 0;
      }
    }

    // Update ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += 2;
      r.opacity -= 0.02;
      if (r.opacity <= 0 || r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;

      // Wind drift for snow
      if (condition === "snow") {
        p.vx += Math.sin(p.life * 0.01 + p.variant * 10) * 0.005;
        p.vx = Math.max(-1, Math.min(1, p.vx));
      }

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // Mouse repulsion (only for particles near cursor)
      if (mouseX >= 0 && mouseY >= 0) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_FORCE * p.depth;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      // Star twinkling
      if (condition === "clear" && !isDay && p.vx === 0 && p.vy === 0) {
        p.opacity = 0.2 + Math.sin(p.life * 0.03 + p.variant * 20) * 0.3;
      }

      // Remove / recycle particles that leave the screen or exceed life
      let shouldRecycle = false;
      if (p.maxLife !== Infinity && p.life >= p.maxLife) {
        shouldRecycle = true;
      } else if (p.y > h + 20) {
        shouldRecycle = true;
      } else if (p.y < -60 && p.vy < 0) {
        shouldRecycle = true;
      } else if (p.x > w + 500) {
        shouldRecycle = true;
      }

      if (shouldRecycle) {
        const newP = createParticleForCondition(condition, isDay, w, h);
        this.particles[i] = newP;
      }
    }
  }

  addRipple(x: number, y: number) {
    if (this.ripples.length < 5) {
      this.ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: RIPPLE_MAX_RADIUS,
        opacity: 0.4,
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function parseRgba(rgba: string): [number, number, number, number] {
  const m = rgba.match(/[\d.]+/g);
  if (!m || m.length < 4) return [255, 255, 255, 0.6];
  return [Number(m[0]), Number(m[1]), Number(m[2]), Number(m[3])];
}

export function renderParticles(
  ctx: CanvasRenderingContext2D,
  system: ParticleSystem,
  mouseX: number,
  mouseY: number,
  globalOpacity: number
) {
  const { config, particles, ripples, lightningFlash } = system;
  const { condition, isDay, palette, width: w, height: h } = config;
  const [pr, pg, pb] = parseRgba(palette.particleColor);

  ctx.clearRect(0, 0, w, h);
  ctx.globalAlpha = globalOpacity;

  // Background gradient layer
  renderBackground(ctx, condition, isDay, palette, w, h);

  // Lightning flash
  if (lightningFlash > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${lightningFlash * 0.15})`;
    ctx.fillRect(0, 0, w, h);
  }

  // Draw particles
  for (const p of particles) {
    const parallaxX = mouseX >= 0 ? (mouseX - w / 2) * (p.depth * PARALLAX_STRENGTH) / w : 0;
    const parallaxY = mouseY >= 0 ? (mouseY - h / 2) * (p.depth * PARALLAX_STRENGTH) / h : 0;
    const px = p.x + parallaxX;
    const py = p.y + parallaxY;

    ctx.globalAlpha = globalOpacity * p.opacity;

    switch (condition) {
      case "rain":
      case "thunderstorm":
        drawRainDrop(ctx, px, py, p, pr, pg, pb);
        break;
      case "drizzle":
        drawRainDrop(ctx, px, py, p, pr, pg, pb);
        break;
      case "snow":
        drawSnowflake(ctx, px, py, p);
        break;
      case "clear":
        if (isDay) {
          drawGoldenParticle(ctx, px, py, p, palette);
        } else if (p.vx === 0 && p.vy === 0) {
          drawStar(ctx, px, py, p);
        } else {
          drawShootingStar(ctx, px, py, p);
        }
        break;
      case "cloudy":
        drawCloudBlob(ctx, px, py, p);
        break;
      case "fog":
        drawFogLayer(ctx, px, py, p);
        break;
    }
  }

  // Draw ripples
  ctx.globalAlpha = globalOpacity;
  for (const r of ripples) {
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${pr}, ${pg}, ${pb}, ${r.opacity})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

// ---------------------------------------------------------------------------
// Background gradients
// ---------------------------------------------------------------------------

function renderBackground(
  ctx: CanvasRenderingContext2D,
  condition: WeatherCondition,
  isDay: boolean,
  palette: SeasonPalette,
  w: number,
  h: number
) {
  // Subtle radial glow based on season
  const grd = ctx.createRadialGradient(w / 2, h / 3, 0, w / 2, h / 3, w * 0.7);
  grd.addColorStop(0, palette.glowColor);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Extra overlays per condition
  if (!isDay && condition === "clear") {
    // Deep blue tint for night sky
    const nightGrd = ctx.createLinearGradient(0, 0, 0, h);
    nightGrd.addColorStop(0, "rgba(10, 15, 40, 0.15)");
    nightGrd.addColorStop(1, "rgba(5, 5, 20, 0.05)");
    ctx.fillStyle = nightGrd;
    ctx.fillRect(0, 0, w, h);
  }

  if (condition === "fog") {
    ctx.fillStyle = "rgba(180, 180, 200, 0.03)";
    ctx.fillRect(0, 0, w, h);
  }
}

// ---------------------------------------------------------------------------
// Individual particle renderers
// ---------------------------------------------------------------------------

function drawRainDrop(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: Particle,
  r: number,
  g: number,
  b: number
) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + p.vx * 1.5, y + p.size * 8);
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
  ctx.lineWidth = p.size * 0.6;
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawSnowflake(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: Particle
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(p.rotation);
  ctx.beginPath();
  ctx.arc(0, 0, p.size, 0, Math.PI * 2);
  const alpha = p.opacity * 0.9;
  ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
  ctx.fill();
  // Subtle glow
  ctx.beginPath();
  ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(200, 215, 255, ${alpha * 0.15})`;
  ctx.fill();
  ctx.restore();
}

function drawGoldenParticle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: Particle,
  palette: SeasonPalette
) {
  const [pr, pg, pb] = parseRgba(palette.particleColor);
  ctx.beginPath();
  ctx.arc(x, y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${p.opacity})`;
  ctx.fill();
  // Soft glow
  ctx.beginPath();
  ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${p.opacity * 0.1})`;
  ctx.fill();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: Particle
) {
  ctx.beginPath();
  ctx.arc(x, y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
  ctx.fill();
  // Twinkle glow
  ctx.beginPath();
  ctx.arc(x, y, p.size * 2.5, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(200, 220, 255, ${p.opacity * 0.12})`;
  ctx.fill();
}

function drawShootingStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: Particle
) {
  const tailLen = 30;
  const fade = Math.max(0, 1 - p.life / p.maxLife);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - p.vx * tailLen * 0.3, y - p.vy * tailLen * 0.3);
  const grd = ctx.createLinearGradient(
    x,
    y,
    x - p.vx * tailLen * 0.3,
    y - p.vy * tailLen * 0.3
  );
  grd.addColorStop(0, `rgba(255, 255, 255, ${fade * 0.9})`);
  grd.addColorStop(1, `rgba(255, 255, 255, 0)`);
  ctx.strokeStyle = grd;
  ctx.lineWidth = p.size;
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawCloudBlob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: Particle
) {
  const r = p.size / 2;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 0.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(180, 185, 200, ${p.opacity})`;
  ctx.fill();
}

function drawFogLayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: Particle
) {
  const r = p.size / 2;
  const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
  grd.addColorStop(0, `rgba(180, 185, 200, ${p.opacity})`);
  grd.addColorStop(1, "rgba(180, 185, 200, 0)");
  ctx.fillStyle = grd;
  ctx.fillRect(x - r, y - r, p.size, p.size);
}
