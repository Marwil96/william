import { HOLD_MS, PortalFrame, Simulation, ease } from "./interaction";

type Dog = {
  x: number;
  vx: number;
  facing: number;
  phase: number;
  sit: number;
  wagPhase: number;
  state: "sit" | "stroll" | "fetch";
  timer: number;
  goal: number;
  home: number;
  ground: number;
  height: number;
  stride: number;
  topSpeed: number;
  mouth: [number, number];
};

type DogSpec = Pick<
  Dog,
  "home" | "facing" | "timer" | "ground" | "height" | "stride" | "topSpeed" | "mouth"
>;

type Ball = {
  mode: "none" | "air" | "carried" | "rest";
  x: number;
  y: number;
  vx: number;
  vy: number;
  timer: number;
  carrier: Dog | null;
};

const BALL_FLOOR = 0.05;
const REMEMBER_AFTER = HOLD_MS / 1000;
const REMEMBER_LINGER = 7;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const makeDog = (spec: DogSpec): Dog => ({
  x: spec.home,
  vx: 0,
  phase: 0,
  sit: 1,
  wagPhase: Math.random() * 6,
  state: "sit",
  goal: spec.home,
  ...spec,
});

const mouthX = (d: Dog) => d.x + d.facing * d.mouth[0] * d.height;

function run(d: Dog, goal: number, dt: number, haste: number) {
  const limit = d.topSpeed * haste;
  const desired = clamp((goal - d.x) * 3, -limit, limit);
  d.vx += (desired - d.vx) * ease(5, dt);
  d.x += d.vx * dt;
  if (Math.abs(d.vx) > 0.03) d.facing = Math.sign(d.vx);
  d.phase += (Math.abs(d.vx) / d.stride) * Math.PI * 2 * dt;
}

function rest(d: Dog, dt: number) {
  d.vx *= 1 - ease(6, dt);
  d.x += d.vx * dt;
}

function settle(d: Dog, other: Dog) {
  d.state = "sit";
  d.timer = 8 + Math.random() * 12;
  d.facing = Math.sign(other.x - d.x) || d.facing;
  if (other.state === "sit" && other.facing !== Math.sign(d.x - other.x)) {
    other.timer = Math.min(other.timer, 1.5 + Math.random() * 2);
  }
}

function pickSpot(d: Dog, other: Dog, bound: number) {
  const anchor = other.state === "stroll" ? other.goal : other.x;
  const side = other.state === "sit" ? other.facing : Math.random() < 0.5 ? -1 : 1;
  const gap = 0.22 + Math.random() * 0.3;
  const limit = Math.min(bound, 0.7);
  const spots = [anchor + side * gap, anchor - side * gap].filter((x) => Math.abs(x) <= limit);
  return (
    spots.find((x) => Math.abs(x - d.x) >= 0.1) ??
    spots[0] ??
    clamp(anchor - Math.sign(anchor) * gap, -limit, limit)
  );
}

export function createDogPlay({ remember = false } = {}): Simulation {
  const ove = makeDog({
    home: -0.22,
    facing: 1,
    timer: 7,
    ground: 0.04,
    height: 0.18,
    stride: 0.05,
    topSpeed: 0.42,
    mouth: [0.72, 0.74],
  });
  const poodle = makeDog({
    home: 0.24,
    facing: -1,
    timer: 13,
    ground: 0.065,
    height: 0.22,
    stride: 0.07,
    topSpeed: 0.48,
    mouth: [0.68, 0.86],
  });
  const ball: Ball = { mode: "none", x: 0, y: 0, vx: 0, vy: 0, timer: 0, carrier: null };
  let lastBurst = 0;
  let memory = 0;
  let memoryHold = 0;

  return ({ dt, realDt, pointer }: PortalFrame, aspect: number) => {
    const bound = Math.max(aspect / 2 - 0.2, 0.2);
    const reach = Math.max(aspect / 2 - 0.12, 0.2);

    if (remember) {
      memoryHold =
        pointer.press > REMEMBER_AFTER ? REMEMBER_LINGER : Math.max(memoryHold - realDt, 0);
      memory =
        memoryHold > 0 ? Math.min(memory + realDt / 3.2, 1) : Math.max(memory - realDt / 1.6, 0);
    }
    const remembering = memory > 0;

    if (remembering) {
      ball.mode = "none";
      ball.carrier = null;
      if (ove.state !== "sit") settle(ove, poodle);
      ove.timer = Math.max(ove.timer, 2);
    } else if (pointer.burstAge < lastBurst) {
      ball.mode = "air";
      ball.x = clamp((pointer.burstX - 0.5) * aspect, -bound, bound);
      ball.y = Math.max(pointer.burstY, 0.45);
      ball.vx = (Math.random() - 0.5) * 0.4;
      ball.vy = 0.5;
      ball.timer = 0;
      ball.carrier = null;
      ove.state = "fetch";
      poodle.state = "fetch";
    }
    lastBurst = pointer.burstAge;

    if (ball.mode === "air") {
      ball.vy -= 2.4 * dt;
      ball.x = clamp(ball.x + ball.vx * dt, -bound, bound);
      ball.y += ball.vy * dt;
      if (ball.y < BALL_FLOOR) {
        ball.y = BALL_FLOOR;
        ball.vy = Math.abs(ball.vy) > 0.15 ? -ball.vy * 0.5 : 0;
        ball.vx *= 0.6;
      }
      ball.timer = ball.vy === 0 && ball.y === BALL_FLOOR ? ball.timer + dt : 0;
      if (ball.timer > 8) ball.mode = "none";
    } else if (ball.mode === "rest") {
      ball.timer -= dt;
      if (ball.timer <= 0) ball.mode = "none";
    }

    for (const d of [ove, poodle]) {
      const other = d === ove ? poodle : ove;

      if (d.state === "fetch" && ball.mode === "air") {
        if (d.sit < 0.3) {
          const offset = d.mouth[0] * d.height;
          let side = Math.sign(ball.x - d.x) || 1;
          if (Math.abs(ball.x - side * offset) > reach) side = -side;
          const goal = clamp(ball.x - side * offset, -reach, reach);
          run(d, goal, dt, 0.9);
          if (Math.abs(goal - d.x) < 0.08) d.facing = side;
          if (ball.y < BALL_FLOOR + 0.02 && Math.abs(mouthX(d) - ball.x) < 0.03) {
            ball.mode = "carried";
            ball.carrier = d;
          }
        } else rest(d, dt);
      } else if (d.state === "fetch" && ball.mode === "carried" && ball.carrier === d) {
        run(d, d.home, dt, 0.45);
        ball.x = mouthX(d);
        ball.y = d.ground + d.mouth[1] * d.height;
        if (Math.abs(d.home - d.x) < 0.03) {
          settle(d, other);
          ball.mode = "rest";
          ball.x = mouthX(d);
          ball.y = BALL_FLOOR;
          ball.timer = 6;
          ball.carrier = null;
        }
      } else if (d.state === "fetch") {
        d.state = "stroll";
        d.goal = d.home;
      }

      if (d.state === "stroll") {
        if (d.sit < 0.2) run(d, d.goal, dt, 0.35);
        else rest(d, dt);
        if (d.sit < 0.2 && Math.abs(d.goal - d.x) < 0.03 && Math.abs(d.vx) < 0.02) settle(d, other);
      } else if (d.state === "sit") {
        rest(d, dt);
        d.timer -= dt;
        const stranded = Math.abs(d.x) > bound + 0.1 && !(remembering && d === ove);
        if (d.timer <= 0 || stranded) {
          d.state = "stroll";
          d.goal = pickSpot(d, other, bound);
        }
      }

      d.sit += ((d.state === "sit" ? 1 : 0) - d.sit) * ease(3, dt);
      d.wagPhase += dt * (3 + 6 * pointer.presence + (ball.mode === "none" ? 0 : 4));
    }

    const packed: number[] = [];
    for (const d of [ove, poodle]) {
      const speed = Math.min(Math.abs(d.vx) / d.topSpeed, 1);
      packed.push(d.x, d.ground, d.facing, d.phase, speed, d.sit, Math.sin(d.wagPhase), d.height);
    }
    packed.push(ball.x, ball.y, ball.mode === "none" ? 0 : 1, memory);
    return packed;
  };
}
