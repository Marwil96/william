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

export function WeatherIndicator() {
  const { weather, theme, isLoading } = useWeatherSeason();
  const [expanded, setExpanded] = useState(false);

  if (isLoading || !weather) return null;

  const icon = conditionIcons[weather.condition];
  const label = conditionLabels[weather.condition];
  const temp = `${Math.round(weather.temperature)}\u00B0`;

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.4 }}
    >
      <motion.button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md bg-white/5 text-xs font-system text-gray-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label={`Weather: ${label}, ${temp}`}
      >
        <span className="text-sm leading-none">{icon}</span>
        <span>{temp}</span>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-md bg-[#1a1a1a]/90 text-xs font-system text-gray-300 min-w-[160px]"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{icon}</span>
              <div>
                <div className="text-white font-medium">{label}</div>
                <div className="text-gray-500 capitalize">{theme.season}</div>
              </div>
            </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
