import { Season, SeasonPalette, WeatherCondition } from "./types";

/**
 * Season palettes -- subtle tints that overlay the existing dark theme (#161616).
 * Designed to be barely noticeable yet give an ambient seasonal feel.
 */
export const SEASON_PALETTES: Record<Season, SeasonPalette> = {
  spring: {
    accent: "#7ecf8e",
    gradientFrom: "rgba(126, 207, 142, 0.04)",
    gradientTo: "rgba(180, 220, 140, 0.02)",
    particleColor: "rgba(126, 207, 142, 0.6)",
    glowColor: "rgba(126, 207, 142, 0.08)",
  },
  summer: {
    accent: "#ff5800",
    gradientFrom: "rgba(255, 88, 0, 0.04)",
    gradientTo: "rgba(255, 160, 60, 0.02)",
    particleColor: "rgba(255, 170, 80, 0.6)",
    glowColor: "rgba(255, 88, 0, 0.08)",
  },
  autumn: {
    accent: "#d4813f",
    gradientFrom: "rgba(212, 129, 63, 0.04)",
    gradientTo: "rgba(180, 90, 40, 0.02)",
    particleColor: "rgba(212, 129, 63, 0.6)",
    glowColor: "rgba(212, 129, 63, 0.08)",
  },
  winter: {
    accent: "#8ab4f8",
    gradientFrom: "rgba(138, 180, 248, 0.04)",
    gradientTo: "rgba(100, 140, 220, 0.02)",
    particleColor: "rgba(200, 220, 255, 0.6)",
    glowColor: "rgba(138, 180, 248, 0.08)",
  },
};

/**
 * WMO Weather interpretation codes mapped to our simplified conditions.
 * See: https://open-meteo.com/en/docs
 */
export function weatherCodeToCondition(code: number): WeatherCondition {
  if (code === 0) return "clear";
  if (code <= 3) return "cloudy";
  if (code >= 45 && code <= 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code >= 85 && code <= 86) return "snow";
  if (code >= 95 && code <= 99) return "thunderstorm";
  return "cloudy";
}

/**
 * Determine season from a month (0-indexed: 0=Jan, 11=Dec).
 * Based on Northern Hemisphere (Stockholm default).
 */
export function monthToSeason(month: number): Season {
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

/** Stockholm fallback coordinates */
export const DEFAULT_LATITUDE = 59.33;
export const DEFAULT_LONGITUDE = 18.07;

/** How often to re-fetch weather data (ms) */
export const WEATHER_REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes
