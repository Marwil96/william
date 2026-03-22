import { useState, useEffect } from "react";
import { motion } from "motion/react";

// ─── ASCII Spinner ────────────────────────────────────────────
const LOADING_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function useAsciiSpinner(active: boolean, speed = 80) {
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

export const AsciiSpinner = ({ className }: { className?: string }) => {
  const frame = useAsciiSpinner(true);
  return (
    <motion.span
      className={className ?? "font-mono text-sm text-gray-400"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {frame}
    </motion.span>
  );
};
