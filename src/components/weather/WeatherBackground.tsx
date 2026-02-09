import React from "react";
import { WeatherCanvas } from "./WeatherCanvas";

/**
 * WeatherBackground -- wraps the weather canvas particle system.
 * This is the component dynamically imported (ssr: false) from Layout.
 */
export function WeatherBackground() {
  return <WeatherCanvas />;
}
