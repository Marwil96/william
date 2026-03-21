import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    <div className="flex flex-col items-center gap-12 w-full py-4">
      {/* Button */}
      <div className="flex items-center justify-center min-h-[100px]">
        <AddToCartButton
          forcedState={mode === "manual" ? forcedState : null}
        />
      </div>

      {/* Controller */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Mode toggle */}
          <div className="flex">
            {(["auto", "manual"] as const).map((m, i) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={clsx(
                  "px-4 py-2 text-[10px] font-inter uppercase tracking-[0.15em] transition-colors cursor-pointer border border-dashed border-gray-600",
                  i === 1 && "border-l-0",
                  mode === m
                    ? "text-[#F7F7F7] bg-[#1a1a1a]"
                    : "text-gray-600 hover:text-gray-400"
                )}
              >
                {m}
              </button>
            ))}
          </div>

          {/* State selector — slides in when manual */}
          <AnimatePresence>
            {mode === "manual" && (
              <motion.div
                className="flex"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: "spring", damping: 22, stiffness: 200 }}
                style={{ overflow: "hidden" }}
              >
                <div className="flex">
                  {states.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setForcedState(s.id)}
                      className={clsx(
                        "px-4 py-2 text-[10px] font-inter uppercase tracking-[0.15em] transition-colors border border-dashed border-gray-600 cursor-pointer whitespace-nowrap",
                        i > 0 && "border-l-0",
                        forcedState === s.id
                          ? "text-[#F7F7F7] bg-[#1a1a1a]"
                          : "text-gray-600 hover:text-gray-400"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="text-[10px] font-inter text-gray-600 uppercase tracking-[0.12em]">
          {mode === "auto" ? "Click the button" : "Select a state"}
        </span>
      </div>
    </div>
  );
};
