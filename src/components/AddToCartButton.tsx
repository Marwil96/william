import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type ButtonState = "idle" | "loading" | "success";

const springTransition = {
  type: "spring" as const,
  damping: 25,
  stiffness: 300,
};

const CheckIcon = () => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
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

const CartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const Spinner = () => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
  >
    <path d="M12 2a10 10 0 0 1 10 10" />
  </motion.svg>
);

export const AddToCartButton = ({
  forcedState,
}: {
  forcedState?: ButtonState | null;
}) => {
  const [state, setState] = useState<ButtonState>("idle");
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const isControlled = forcedState != null;
  const currentState = isControlled ? forcedState : state;

  const handleClick = () => {
    if (isControlled || currentState !== "idle") return;
    setState("loading");
    timersRef.current.push(setTimeout(() => setState("success"), 1800));
    timersRef.current.push(setTimeout(() => setState("idle"), 3800));
  };

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  return (
    <motion.button
      onClick={handleClick}
      disabled={currentState !== "idle" && !isControlled}
      layout
      className={`relative flex items-center justify-center gap-2 h-12 overflow-hidden rounded-full font-inter text-sm font-medium tracking-wide disabled:cursor-default
        ${currentState === "success" ? "bg-emerald-400 text-emerald-950" : "bg-white text-black"}
        ${currentState === "loading" ? "px-6" : "px-8"}
        ${currentState === "idle" && !isControlled ? "cursor-pointer" : ""}
        transition-colors duration-300`}
      animate={{
        width: currentState === "loading" ? 56 : "auto",
      }}
      transition={springTransition}
      whileHover={currentState === "idle" && !isControlled ? { y: -1, scale: 1.03 } : {}}
      whileTap={currentState === "idle" && !isControlled ? { scale: 0.97 } : {}}
    >
      <AnimatePresence mode="wait" initial={false}>
        {currentState === "loading" ? (
          <motion.span
            key="loading"
            className="flex items-center justify-center text-black"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Spinner />
          </motion.span>
        ) : currentState === "success" ? (
          <motion.span
            key="success"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={springTransition}
          >
            <CheckIcon />
            <span>Added!</span>
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={springTransition}
          >
            <CartIcon />
            <span>Add to Cart</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
