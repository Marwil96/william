import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import { WeatherSeasonProvider } from "../components/weather";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WeatherSeasonProvider>
      <Script
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        strategy="afterInteractive"
      />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <Analytics />
      <Component {...pageProps} />
    </WeatherSeasonProvider>
  );
}

export default MyApp;
