export type PortalSettings = {
  wind: number;
  speed: number;
  gust: number;
  push: number;
  parallax: number;
  grain: number;
};

export type PointerState = {
  x: number;
  y: number;
  presence: number;
  stir: number;
  burstX: number;
  burstY: number;
  burstAge: number;
  lookX: number;
  lookY: number;
  press: number;
};

export const ease = (rate: number, dt: number) => 1 - Math.exp(-rate * dt);

export const HOLD_MS = 550;

function trackPointer(element: HTMLElement, holdable: boolean) {
  const state: PointerState = {
    x: 0.5,
    y: 0.5,
    presence: 0,
    stir: 0,
    burstX: 0.5,
    burstY: 0.5,
    burstAge: 99,
    lookX: 0,
    lookY: 0,
    press: 0,
  };
  let inside = false;
  let travelled = 0;
  let pressedAt = 0;

  const read = (event: PointerEvent) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    if (inside) {
      travelled += Math.hypot(
        ((x - state.x) * rect.width) / rect.height,
        y - state.y
      );
    }
    state.x = x;
    state.y = y;
    inside = true;
  };

  const onLeave = () => {
    inside = false;
    pressedAt = 0;
    state.press = 0;
  };

  const burst = () => {
    state.burstX = state.x;
    state.burstY = state.y;
    state.burstAge = 0;
  };

  const onDown = (event: PointerEvent) => {
    if (!event.isPrimary || event.button !== 0) return;
    read(event);
    if (holdable) pressedAt = event.timeStamp;
    else burst();
  };

  const onUp = (event: PointerEvent) => {
    const tapped = pressedAt > 0 && event.timeStamp - pressedAt < HOLD_MS;
    pressedAt = 0;
    state.press = 0;
    if (tapped) burst();
  };

  const onCancel = () => {
    pressedAt = 0;
    state.press = 0;
  };

  window.addEventListener("blur", onCancel);
  element.addEventListener("pointermove", read);
  element.addEventListener("pointerdown", onDown);
  element.addEventListener("pointerup", onUp);
  element.addEventListener("pointercancel", onCancel);
  element.addEventListener("pointerleave", onLeave);

  const update = (dt: number, pace: number) => {
    if (dt <= 0) return;
    const target = Math.min((travelled / dt) * 0.6, 1.5) * pace;
    travelled = 0;
    state.stir += (target - state.stir) * ease(target > state.stir ? 10 : 1.8, dt);
    state.presence += ((inside ? 1 : 0) - state.presence) * ease(5, dt);
    const look = inside ? pace : 0;
    state.lookX += ((state.x * 2 - 1) * look - state.lookX) * ease(3, dt);
    state.lookY += ((state.y * 2 - 1) * look - state.lookY) * ease(3, dt);
    state.burstAge += dt * pace;
    state.press = pressedAt > 0 ? (performance.now() - pressedAt) / 1000 : 0;
  };

  const dispose = () => {
    window.removeEventListener("blur", onCancel);
    element.removeEventListener("pointermove", read);
    element.removeEventListener("pointerdown", onDown);
    element.removeEventListener("pointerup", onUp);
    element.removeEventListener("pointercancel", onCancel);
    element.removeEventListener("pointerleave", onLeave);
  };

  return { state, update, dispose };
}

const MAX_PIXEL_RATIO = 1.5;

export const pixelRatio = (resolution: number, cap = MAX_PIXEL_RATIO) =>
  Math.min(window.devicePixelRatio || 1, cap) * resolution;

export type PortalFrame = {
  dt: number;
  realDt: number;
  time: number;
  windTime: number;
  width: number;
  height: number;
  pointer: PointerState;
};

export type Simulation = (frame: PortalFrame, aspect: number) => number[];

export function startPortalLoop(
  element: HTMLElement,
  getSpeed: () => number,
  render: (frame: PortalFrame) => void,
  holdable = false
) {
  const pointer = trackPointer(element, holdable);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let raf = 0;
  let visible = false;
  let last = 0;
  let time = 0;
  let windTime = 0;
  let width = element.clientWidth;
  let height = element.clientHeight;

  const frame = (now: number) => {
    raf = 0;
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    const pace = reducedMotion.matches ? 0.1 : 1;
    const paced = dt * pace;
    time += paced;
    windTime += paced * getSpeed();
    pointer.update(dt, pace);
    render({ dt: paced, realDt: dt, time, windTime, width, height, pointer: pointer.state });
    if (visible) raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (raf || !visible) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const intersection = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    start();
  });
  const resize = new ResizeObserver(([entry]) => {
    width = entry.contentRect.width;
    height = entry.contentRect.height;
  });
  intersection.observe(element);
  resize.observe(element);

  const dispose = () => {
    stop();
    intersection.disconnect();
    resize.disconnect();
    pointer.dispose();
  };

  return { start, stop, dispose };
}
