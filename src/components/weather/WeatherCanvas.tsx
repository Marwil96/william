"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { useWeatherSeason } from "./WeatherSeasonProvider";
import { ParticleSystem, renderParticles } from "./particles";

/**
 * WeatherCanvas -- full-viewport HTML5 Canvas particle overlay.
 *
 * Renders weather-appropriate particles (rain, snow, stars, fog, etc.)
 * with mouse parallax, interaction, and reduced-motion fallback.
 * Layered behind all content with pointer-events: none.
 */
export function WeatherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<ParticleSystem | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { theme } = useWeatherSeason();

  // Detect reduced-motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Track mouse position
  useEffect(() => {
    if (prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [prefersReducedMotion]);

  // Click ripple
  useEffect(() => {
    if (prefersReducedMotion) return;

    const onClick = (e: MouseEvent) => {
      systemRef.current?.addRipple(e.clientX, e.clientY);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [prefersReducedMotion]);

  // Setup canvas and animation loop
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    return { w, h, ctx };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const result = setupCanvas();
    if (!result) return;
    const { w, h, ctx } = result;
    if (!ctx) return;

    const config = {
      condition: theme.condition,
      season: theme.season,
      palette: theme.palette,
      isDay: theme.isDay,
      width: w,
      height: h,
    };

    if (!systemRef.current) {
      systemRef.current = new ParticleSystem(config);
    } else {
      systemRef.current.updateConfig(config);
    }

    const globalOpacity = getGlobalOpacity(theme.condition, theme.isDay);

    const tick = () => {
      const system = systemRef.current;
      if (!system) return;

      const { x: mx, y: my } = mouseRef.current;
      system.update(mx, my);
      renderParticles(ctx, system, mx, my, globalOpacity);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      const r = setupCanvas();
      if (!r) return;
      systemRef.current?.updateConfig({
        ...config,
        width: r.w,
        height: r.h,
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [theme, prefersReducedMotion, setupCanvas]);

  // Reduced-motion fallback: static gradient only
  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at 50% 30%, ${theme.palette.glowColor}, transparent 70%)`,
          opacity: 0.5,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

/**
 * Controls how strongly the canvas overlay shows.
 * We keep it subtle so portfolio content remains readable.
 */
function getGlobalOpacity(condition: string, isDay: boolean): number {
  switch (condition) {
    case "rain":
    case "thunderstorm":
      return 0.55;
    case "drizzle":
      return 0.45;
    case "snow":
      return 0.6;
    case "clear":
      return isDay ? 0.4 : 0.7;
    case "cloudy":
      return 0.4;
    case "fog":
      return 0.5;
    default:
      return 0.4;
  }
}
