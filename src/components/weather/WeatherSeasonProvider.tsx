import React, { createContext, useContext, useMemo } from "react";
import { useWeatherData } from "./useWeatherData";
import { monthToSeason, SEASON_PALETTES } from "./constants";
import { Season, WeatherSeasonContextValue, WeatherTheme } from "./types";

const WeatherSeasonContext = createContext<WeatherSeasonContextValue | null>(
  null
);

function getCurrentSeason(): Season {
  return monthToSeason(new Date().getMonth());
}

export function WeatherSeasonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { weather, isLoading } = useWeatherData();
  const season = getCurrentSeason();

  const theme: WeatherTheme = useMemo(() => {
    const palette = SEASON_PALETTES[season];
    return {
      season,
      palette,
      condition: weather?.condition ?? "clear",
      isDay: weather?.isDay ?? true,
      temperature: weather?.temperature ?? 15,
    };
  }, [season, weather]);

  const value: WeatherSeasonContextValue = useMemo(
    () => ({ season, weather, theme, isLoading }),
    [season, weather, theme, isLoading]
  );

  return (
    <WeatherSeasonContext.Provider value={value}>
      {children}
    </WeatherSeasonContext.Provider>
  );
}

export function useWeatherSeason(): WeatherSeasonContextValue {
  const ctx = useContext(WeatherSeasonContext);
  if (!ctx) {
    // Fallback for usage outside provider -- return sensible defaults
    const season = getCurrentSeason();
    return {
      season,
      weather: null,
      theme: {
        season,
        palette: SEASON_PALETTES[season],
        condition: "clear",
        isDay: true,
        temperature: 15,
      },
      isLoading: false,
    };
  }
  return ctx;
}
