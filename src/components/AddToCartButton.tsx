import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

export type ButtonState = "idle" | "loading" | "success";

// ─── ASCII Scramble Hook ──────────────────────────────────────
const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+=-~<>[]{}|/\\";

function useScrambleText(target: string, trigger: number, speed = 30) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let iteration = 0;
    const totalFrames = target.length * 3;

    const tick = () => {
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return target[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration <= totalFrames) {
        frameRef.current = setTimeout(tick, speed);
      }
    };

    tick();
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [target, trigger, speed]);

  return display;
}

// ─── ASCII Spinner ────────────────────────────────────────────
const LOADING_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function useAsciiSpinner(active: boolean, speed = 80) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!active) {
      setFrame(0);
      return;
    }
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % LOADING_FRAMES.length);
    }, speed);
    return () => clearInterval(interval);
  }, [active, speed]);

  return LOADING_FRAMES[frame];
}

// ─── Check Icon (path draw) ──────────────────────────────────
const CheckIcon = () => (
  <motion.svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.path
      d="M5 13l4 4L19 7"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
    />
  </motion.svg>
);

// ─── Scramble Label ───────────────────────────────────────────
const ScrambleLabel = ({
  text,
  trigger,
}: {
  text: string;
  trigger: number;
}) => {
  const display = useScrambleText(text, trigger);
  return <span className="font-mono">{display}</span>;
};

// ─── Marching Ants Border ─────────────────────────────────────
const MarchingBorder = ({
  state,
  hovered,
}: {
  state: ButtonState;
  hovered: boolean;
}) => {
  // Dash pattern and animation speed per state
  const dashArray =
    state === "success" ? "0 0" : "4 3";

  const shouldAnimate = state === "loading" || hovered;
  const duration = state === "loading" ? "0.5s" : "1.5s";

  const strokeColor =
    state === "success"
      ? "#F7F7F7"
      : hovered
        ? "#F7F7F7"
        : "#6b7280";

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <style>{`
        @keyframes march {
          to { stroke-dashoffset: -28; }
        }
      `}</style>
      <rect
        x="0.5"
        y="0.5"
        width="calc(100% - 1px)"
        height="calc(100% - 1px)"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeDasharray={dashArray}
        style={{
          animation: shouldAnimate ? `march ${duration} linear infinite` : "none",
          transition: "stroke 0.5s, stroke-dasharray 0.5s",
        }}
      />
    </svg>
  );
};

// ─── Button ──────────────────────────────────────────────────
export const AddToCartButton = ({
  forcedState,
}: {
  forcedState?: ButtonState | null;
}) => {
  const [state, setState] = useState<ButtonState>("idle");
  const [scrambleTrigger, setScrambleTrigger] = useState(0);
  const [hovered, setHovered] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const isControlled = forcedState != null;
  const currentState = isControlled ? forcedState : state;
  const prevStateRef = useRef<ButtonState>(currentState);

  const spinner = useAsciiSpinner(currentState === "loading");

  // Scramble on state change
  useEffect(() => {
    if (prevStateRef.current !== currentState) {
      setScrambleTrigger((t) => t + 1);
      prevStateRef.current = currentState;
    }
  }, [currentState]);

  const handleClick = () => {
    if (isControlled || currentState !== "idle") return;
    setState("loading");
    timersRef.current.push(setTimeout(() => setState("success"), 1800));
    timersRef.current.push(setTimeout(() => setState("idle"), 3800));
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (currentState === "idle") {
      setScrambleTrigger((t) => t + 1);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const label =
    currentState === "loading"
      ? "Adding"
      : currentState === "success"
        ? "Added to bag"
        : "Add to bag";

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={currentState !== "idle" && !isControlled}
      className={`relative flex items-center justify-center gap-3 w-[260px] h-[48px] font-inter text-[11px] uppercase tracking-[0.15em] transition-colors duration-500 disabled:cursor-default
        ${currentState === "idle" && !isControlled ? "cursor-pointer" : ""}
        ${
          currentState === "success"
            ? "text-[#F7F7F7]"
            : "text-gray-400 hover:text-[#F7F7F7]"
        }`}
      whileHover={
        currentState === "idle" && !isControlled ? { y: -1 } : {}
      }
      whileTap={
        currentState === "idle" && !isControlled ? { scale: 0.98 } : {}
      }
    >
      <MarchingBorder state={currentState} hovered={hovered} />
      <span className="flex items-center justify-center gap-3 relative z-10">
        {currentState === "loading" && (
          <span className="font-mono text-sm w-[1ch]">{spinner}</span>
        )}
        {currentState === "success" && <CheckIcon />}
        <ScrambleLabel text={label} trigger={scrambleTrigger} />
      </span>
    </motion.button>
  );
};
