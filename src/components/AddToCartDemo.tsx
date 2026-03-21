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
