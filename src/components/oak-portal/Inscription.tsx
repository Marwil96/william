import { PointerEvent, ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Caveat } from "next/font/google";
import { HOLD_MS } from "./interaction";

const hand = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

const LINGER_MS = 5000;
const HIDDEN = "inset(0 100% 0 0)";
const SHOWN = "inset(0 0% 0 0)";

export type InscriptionConfig = {
  line: string;
};

type InscriptionProps = InscriptionConfig & {
  children: ReactNode;
};

function WrittenLine({ line, still }: { line: string; still: boolean }) {
  return (
    <motion.p
      className="mt-2 pr-2 text-xl font-medium leading-tight text-text/90"
      initial={still ? { opacity: 0 } : { clipPath: HIDDEN }}
      animate={still ? { opacity: 1 } : { clipPath: SHOWN }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
      transition={{ duration: Math.min(line.length * 0.05, 2.6), ease: [0.45, 0, 0.55, 1] }}
    >
      {line}
    </motion.p>
  );
}

export function Inscription({ line, children }: InscriptionProps) {
  const still = useReducedMotion() ?? false;
  const [revealed, setRevealed] = useState(false);
  const holdTimer = useRef(0);
  const lingerTimer = useRef(0);
  const pressing = useRef(false);

  useEffect(
    () => () => {
      window.clearTimeout(holdTimer.current);
      window.clearTimeout(lingerTimer.current);
    },
    []
  );

  const press = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return;
    pressing.current = true;
    window.clearTimeout(holdTimer.current);
    window.clearTimeout(lingerTimer.current);
    holdTimer.current = window.setTimeout(() => setRevealed(true), HOLD_MS);
  };

  const release = () => {
    if (!pressing.current) return;
    pressing.current = false;
    window.clearTimeout(holdTimer.current);
    window.clearTimeout(lingerTimer.current);
    lingerTimer.current = window.setTimeout(() => setRevealed(false), LINGER_MS);
  };

  return (
    <div
      className="relative select-none [-webkit-touch-callout:none]"
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      onContextMenu={(event) => event.preventDefault()}
    >
      {children}
      <div
        className={`${hand.className} pointer-events-none absolute left-4 top-3 max-w-[60%] sm:max-w-[34%] text-text [text-shadow:0_0_10px_theme(colors.bg)]`}
      >
        <motion.span
          className="block origin-left -rotate-3 pr-2 text-[30px] font-semibold leading-none"
          initial={{ clipPath: HIDDEN }}
          whileInView={{ clipPath: SHOWN }}
          viewport={{ once: true }}
          transition={still ? { duration: 0 } : { duration: 1.4, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
        >
          Ove
        </motion.span>
        <AnimatePresence>
          {revealed && <WrittenLine key="line" line={line} still={still} />}
        </AnimatePresence>
        <span aria-live="polite" className="sr-only">
          {revealed ? line : ""}
        </span>
      </div>
    </div>
  );
}
