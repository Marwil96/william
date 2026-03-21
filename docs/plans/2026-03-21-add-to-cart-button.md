# Add to Cart Button Experiment — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a standalone add-to-cart button experiment with morphing state transitions (idle → loading → success) and a manual state controller.

**Architecture:** Single React component (`AddToCartButton`) using motion/react for spring-based morphing between three states. A sibling state controller (segmented radio group) lets viewers force any state. Registered as a new experiment on the experiments page using the existing `ExperimentConfig` pattern.

**Tech Stack:** React, motion/react (AnimatePresence, layout animations, spring physics), Tailwind CSS, Next.js

---

### Task 1: Create the AddToCartButton component

**Files:**
- Create: `src/components/AddToCartButton.tsx`

**Step 1: Create the component file**

```tsx
import { useState, useEffect } from "react";
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
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
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

const buttonContent: Record<ButtonState, { label: string; bg: string }> = {
  idle: { label: "Add to Cart", bg: "bg-white" },
  loading: { label: "", bg: "bg-white" },
  success: { label: "Added!", bg: "bg-emerald-400" },
};

export const AddToCartButton = ({
  forcedState,
}: {
  forcedState?: ButtonState | null;
}) => {
  const [state, setState] = useState<ButtonState>("idle");
  const isControlled = forcedState != null;
  const currentState = isControlled ? forcedState : state;

  // Auto-flow: idle → loading → success → idle
  const handleClick = () => {
    if (isControlled || currentState !== "idle") return;
    setState("loading");
    setTimeout(() => setState("success"), 1800);
    setTimeout(() => setState("idle"), 3800);
  };

  // Sync with forced state
  useEffect(() => {
    if (isControlled) setState(forcedState);
  }, [forcedState, isControlled]);

  return (
    <motion.button
      onClick={handleClick}
      disabled={currentState !== "idle" && !isControlled}
      layout
      className={`relative flex items-center justify-center gap-2 h-12 overflow-hidden rounded-full font-inter text-sm font-medium tracking-wide cursor-pointer
        ${currentState === "success" ? "bg-emerald-400 text-emerald-950" : "bg-white text-black"}
        ${currentState === "loading" ? "px-6" : "px-8"}
        ${currentState === "idle" && !isControlled ? "hover:scale-[1.03] active:scale-[0.97]" : ""}
        transition-colors duration-300`}
      animate={{
        width: currentState === "loading" ? 56 : "auto",
      }}
      transition={springTransition}
      whileHover={currentState === "idle" && !isControlled ? { y: -1 } : {}}
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
```

**Step 2: Verify it compiles**

Run: `cd /Users/williammartinsson/web/personal/william && npx next build 2>&1 | head -20`
Expected: No type errors in AddToCartButton.tsx

**Step 3: Commit**

```bash
git add src/components/AddToCartButton.tsx
git commit -m "feat: add AddToCartButton component with morphing state transitions"
```

---

### Task 2: Create the AddToCartDemo wrapper with state controller

**Files:**
- Create: `src/components/AddToCartDemo.tsx`

**Step 1: Create the demo wrapper**

```tsx
import { useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { AddToCartButton } from "./AddToCartButton";

type ButtonState = "idle" | "loading" | "success";

const states: { id: ButtonState; label: string }[] = [
  { id: "idle", label: "Idle" },
  { id: "loading", label: "Loading" },
  { id: "success", label: "Success" },
];

export const AddToCartDemo = () => {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [forcedState, setForcedState] = useState<ButtonState>("idle");

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      {/* Button */}
      <div className="flex items-center justify-center min-h-[120px]">
        <AddToCartButton
          forcedState={mode === "manual" ? forcedState : null}
        />
      </div>

      {/* Controller */}
      <div className="flex flex-col items-center gap-3">
        {/* Mode toggle */}
        <div className="flex border border-dashed border-gray-600 rounded overflow-hidden">
          <button
            onClick={() => setMode("auto")}
            className={clsx(
              "px-4 py-2 text-[11px] font-inter uppercase tracking-[0.1em] transition-colors cursor-pointer",
              mode === "auto"
                ? "bg-[#1e1e1e] text-gray-200"
                : "text-gray-500 hover:text-gray-300"
            )}
          >
            Auto
          </button>
          <button
            onClick={() => setMode("manual")}
            className={clsx(
              "px-4 py-2 text-[11px] font-inter uppercase tracking-[0.1em] border-l border-dashed border-gray-600 transition-colors cursor-pointer",
              mode === "manual"
                ? "bg-[#1e1e1e] text-gray-200"
                : "text-gray-500 hover:text-gray-300"
            )}
          >
            Manual
          </button>
        </div>

        {/* State selector (only in manual mode) */}
        {mode === "manual" && (
          <motion.div
            className="flex border border-dashed border-gray-600 rounded overflow-hidden"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            {states.map((s) => (
              <button
                key={s.id}
                onClick={() => setForcedState(s.id)}
                className={clsx(
                  "px-4 py-2 text-[11px] font-inter uppercase tracking-[0.1em] transition-colors border-r last:border-r-0 border-dashed border-gray-600 cursor-pointer",
                  forcedState === s.id
                    ? "bg-[#1e1e1e] text-gray-200"
                    : "text-gray-500 hover:text-gray-300"
                )}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}

        <span className="text-[10px] font-inter text-gray-600 uppercase tracking-[0.1em]">
          {mode === "auto" ? "Click the button" : "Select a state"}
        </span>
      </div>
    </div>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/AddToCartDemo.tsx
git commit -m "feat: add AddToCartDemo with auto/manual state controller"
```

---

### Task 3: Register experiment on the experiments page

**Files:**
- Modify: `src/pages/experiments.tsx`

**Step 1: Add import at top of file (after MockedCartProvider import)**

Add this line after line 8:
```tsx
import { AddToCartDemo } from "src/components/AddToCartDemo";
```

**Step 2: Add experiment config to the `experiments` array**

Add after the minicart entry (after the closing `}` of the minicart object, before the `];`):

```tsx
  {
    id: "add-to-cart",
    title: "Add to Cart",
    shortDescription:
      "A morphing button with spring-driven state transitions.",
    description:
      "An exploration of micro-interactions in a single button — morphing between idle, loading, and success states with spring physics and layout animations.",
    tags: ["React", "Motion", "Micro-interaction", "E-commerce"],
  },
```

**Step 3: Add case to ExperimentDemo switch**

Add before the `default:` case:

```tsx
    case "add-to-cart":
      return <AddToCartDemo />;
```

**Step 4: Verify build**

Run: `cd /Users/williammartinsson/web/personal/william && npx next build 2>&1 | tail -10`
Expected: Build succeeds

**Step 5: Visual check**

Run: `cd /Users/williammartinsson/web/personal/william && npx next dev`
Open: http://localhost:3000/experiments
Verify: New "Add to Cart" experiment appears with button and state controller

**Step 6: Commit**

```bash
git add src/pages/experiments.tsx
git commit -m "feat: register add-to-cart button experiment on experiments page"
```

---

### Task 4: Polish & tune animations

**Files:**
- Modify: `src/components/AddToCartButton.tsx`

**Step 1: Test all transitions visually**

- Click button in auto mode → verify smooth idle → loading → success → idle
- Switch to manual → force each state → verify transitions are smooth
- Check mobile responsiveness

**Step 2: Tune spring values if needed**

Adjust `damping` and `stiffness` in `springTransition` until transitions feel satisfying. Target: snappy but not jarring.

**Step 3: Commit final polish**

```bash
git add -A
git commit -m "polish: tune add-to-cart button animations"
```
