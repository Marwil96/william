import React, { useEffect } from "react";
import { useWeatherSeason } from "./WeatherSeasonProvider";

/**
 * SeasonalTheme applies CSS custom properties to :root based on the
 * current season and weather. These variables can be consumed anywhere
 * in CSS / Tailwind for subtle seasonal adjustments.
 *
 * Variables set:
 *   --season-accent
 *   --season-gradient-from
 *   --season-gradient-to
 *   --season-particle-color
 *   --season-glow-color
 *   --weather-condition   (string value, useful for CSS selectors on body)
 *   --weather-is-day      (1 or 0)
 */
export function SeasonalTheme() {
  const { theme } = useWeatherSeason();

  useEffect(() => {
    const root = document.documentElement;
    const { palette, condition, isDay } = theme;

    root.style.setProperty("--season-accent", palette.accent);
    root.style.setProperty("--season-gradient-from", palette.gradientFrom);
    root.style.setProperty("--season-gradient-to", palette.gradientTo);
    root.style.setProperty("--season-particle-color", palette.particleColor);
    root.style.setProperty("--season-glow-color", palette.glowColor);
    root.style.setProperty("--weather-condition", condition);
    root.style.setProperty("--weather-is-day", isDay ? "1" : "0");

    // Also set data attributes on body for CSS selector targeting
    document.body.dataset.season = theme.season;
    document.body.dataset.weather = condition;
    document.body.dataset.daytime = isDay ? "day" : "night";

    return () => {
      root.style.removeProperty("--season-accent");
      root.style.removeProperty("--season-gradient-from");
      root.style.removeProperty("--season-gradient-to");
      root.style.removeProperty("--season-particle-color");
      root.style.removeProperty("--season-glow-color");
      root.style.removeProperty("--weather-condition");
      root.style.removeProperty("--weather-is-day");
      delete document.body.dataset.season;
      delete document.body.dataset.weather;
      delete document.body.dataset.daytime;
    };
  }, [theme]);

  return null;
}
