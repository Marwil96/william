import { useEffect, useState, useCallback, useRef } from "react";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  WEATHER_REFRESH_INTERVAL,
  weatherCodeToCondition,
} from "./constants";
import { WeatherData } from "./types";

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    is_day: number;
  };
}

async function fetchWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  const data: OpenMeteoResponse = await res.json();

  const { temperature_2m, weather_code, is_day } = data.current;
  return {
    temperature: temperature_2m,
    weatherCode: weather_code,
    isDay: is_day === 1,
    condition: weatherCodeToCondition(weather_code),
  };
}

function getLocation(): { lat: number; lon: number } {
  return { lat: DEFAULT_LATITUDE, lon: DEFAULT_LONGITUDE };
}

export function useWeatherData() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const { lat, lon } = getLocation();
      const data = await fetchWeather(lat, lon);
      setWeather(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch weather");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    intervalRef.current = setInterval(load, WEATHER_REFRESH_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [load]);

  return { weather, isLoading, error };
}
