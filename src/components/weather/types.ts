export type Season = "spring" | "summer" | "autumn" | "winter";

export type WeatherCondition =
  | "clear"
  | "cloudy"
  | "rain"
  | "snow"
  | "fog"
  | "thunderstorm"
  | "drizzle";

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
  condition: WeatherCondition;
}

export interface WeatherSeasonState {
  season: Season;
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

export interface SeasonPalette {
  /** Subtle accent tint for the season */
  accent: string;
  /** Gradient start color (very subtle, overlaid on dark bg) */
  gradientFrom: string;
  /** Gradient end color */
  gradientTo: string;
  /** Particle / ambient effect color */
  particleColor: string;
  /** Glow color for weather overlays */
  glowColor: string;
}

export interface WeatherTheme {
  season: Season;
  palette: SeasonPalette;
  condition: WeatherCondition;
  isDay: boolean;
  temperature: number;
}

export interface WeatherSeasonContextValue {
  season: Season;
  weather: WeatherData | null;
  theme: WeatherTheme;
  isLoading: boolean;
  bgEnabled: boolean;
  setBgEnabled: (enabled: boolean) => void;
}
