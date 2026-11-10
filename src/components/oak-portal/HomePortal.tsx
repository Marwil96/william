import { PointerEvent, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { OakPortal } from "./OakPortal";
import { createDogPlay } from "./dogs";
import { HOLD_MS, PortalSettings } from "./interaction";
import { rememberShader } from "./shaders";

const FRAGMENT = rememberShader("fetch", "Run on, little one.");
const SETTINGS: PortalSettings = {
  wind: 0.7,
  speed: 1,
  gust: 0.6,
  push: 1,
  parallax: 1,
  grain: 1,
};
const LABEL = "Ove and a poodle playing under an oak, drawn in glyphs.";
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const CLOSED = "inset(50% 0 50% 0)";
const OPEN = "inset(0% 0 0% 0)";

const remember = () => createDogPlay({ remember: true });

const EDGE_FADE =
  "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:[mask-image:none] md:[-webkit-mask-image:none]";

function HoldLine({ pressing }: { pressing: boolean }) {
  return (
    <div aria-hidden className="h-px bg-text/10">
      <div
        className="h-full bg-text/70"
        style={{
          clipPath: pressing ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: pressing
            ? `clip-path ${HOLD_MS - 120}ms linear 120ms`
            : "clip-path 200ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />
    </div>
  );
}

function Reveal({ children }: { children: ReactNode }) {
  const still = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ clipPath: CLOSED, opacity: 0 }}
        animate={inView ? { clipPath: OPEN, opacity: 1 } : { clipPath: CLOSED, opacity: 0 }}
        transition={{
          clipPath: { duration: still ? 0 : 0.9, ease: EASE_OUT },
          opacity: { duration: 0.4, ease: "easeOut" },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function HomePortal() {
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    const release = () => setPressing(false);
    window.addEventListener("blur", release);
    return () => window.removeEventListener("blur", release);
  }, []);

  const handlers = {
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
      if (event.isPrimary && event.button === 0) setPressing(true);
    },
    onPointerUp: () => setPressing(false),
    onPointerCancel: () => setPressing(false),
    onPointerLeave: () => setPressing(false),
  };

  return (
    <div className="mb-16">
      <div className="relative left-1/2 w-[calc(100vw-1rem)] -translate-x-1/2 md:static md:w-full md:translate-x-0">
        <Reveal>
          <div {...handlers}>
            <OakPortal
              fragment={FRAGMENT}
              settings={SETTINGS}
              resolution={1}
              maxPixelRatio={2}
              createSimulation={remember}
              label={LABEL}
              className={`block w-full h-[240px] md:h-[300px] ${EDGE_FADE}`}
            />
          </div>
        </Reveal>
      </div>
      <HoldLine pressing={pressing} />
    </div>
  );
}
