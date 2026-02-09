import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWeatherSeason } from "./WeatherSeasonProvider";
import type { WeatherCondition } from "./types";

const conditionIcons: Record<WeatherCondition, string> = {
  clear: "\u2600",
  cloudy: "\u2601",
  rain: "\uD83C\uDF27",
  snow: "\uD83C\uDF28",
  fog: "\uD83C\uDF2B",
  thunderstorm: "\u26C8",
  drizzle: "\uD83C\uDF26",
};

const conditionLabels: Record<WeatherCondition, string> = {
  clear: "Clear",
  cloudy: "Cloudy",
  rain: "Rain",
  snow: "Snow",
  fog: "Fog",
  thunderstorm: "Thunderstorm",
  drizzle: "Drizzle",
};

const seasonDescriptions: Record<string, string> = {
  spring: "Fresh breezes carry the scent of blossoms",
  summer: "Warm light stretches across the horizon",
  autumn: "Leaves drift through the crisp air",
  winter: "A quiet stillness settles over the city",
};

export function WeatherIndicator() {
  const { weather, theme, isLoading, bgEnabled, setBgEnabled } = useWeatherSeason();
  const [expanded, setExpanded] = useState(false);

  if (isLoading || !weather) return null;

  const icon = conditionIcons[weather.condition];
  const label = conditionLabels[weather.condition];
  const temp = `${Math.round(weather.temperature)}\u00B0`;
  const accent = theme.palette.accent;

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.4 }}
    >
      <div className="relative">
        {/* Season-colored glow behind pill */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md"
          style={{ background: accent, opacity: 0.15 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.button
          onClick={() => setExpanded((prev) => !prev)}
          className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md bg-white/5 text-xs font-system text-gray-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label={`Weather: ${label}, ${temp}`}
        >
          <span className="text-sm leading-none">{icon}</span>
          <span>{temp}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 rounded-xl border border-white/10 backdrop-blur-md bg-[#1a1a1a]/90 text-xs font-system text-gray-300 min-w-[180px] overflow-hidden"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Accent top bar */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{icon}</span>
                <div>
                  <div className="text-white font-medium">{label}</div>
                  <div className="capitalize" style={{ color: accent }}>
                    {theme.season}
                  </div>
                </div>
              </div>
              <p className="text-gray-500 italic text-[10px] mb-2 leading-relaxed">
                {seasonDescriptions[theme.season]}
              </p>
              <div className="flex justify-between border-t border-white/10 pt-2 mt-1">
                <span className="text-gray-500">Temperature</span>
                <span className="text-white">{temp}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500">Time</span>
                <span className="text-white">
                  {weather.isDay ? "Daytime" : "Night"}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-500">Location</span>
                <span className="text-white">Stockholm</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBgEnabled(!bgEnabled);
                }}
                className="flex items-center justify-between w-full mt-2 pt-2 border-t border-white/10 cursor-pointer"
              >
                <span className="text-gray-500">Effects</span>
                <span
                  className="relative inline-flex h-4 w-7 items-center rounded-full transition-colors"
                  style={{ background: bgEnabled ? accent : "rgba(255,255,255,0.1)" }}
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full bg-white transition-transform"
                    style={{ transform: bgEnabled ? "translateX(12px)" : "translateX(2px)" }}
                  />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
