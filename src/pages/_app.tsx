import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { WeatherSeasonProvider } from "../components/weather";

declare global {
  interface Window {
    goatcounter?: { count: (opts?: { path?: string }) => void };
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handler = (url: string) => {
      window.goatcounter?.count({ path: url });
    };
    router.events.on("routeChangeComplete", handler);
    return () => router.events.off("routeChangeComplete", handler);
  }, [router.events]);

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
      <Script
        data-goatcounter="https://williammartinsson.goatcounter.com/count"
        src="https://gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
      <Analytics />
      <Component {...pageProps} />
    </WeatherSeasonProvider>
  );
}

export default MyApp;
