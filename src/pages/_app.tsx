import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import React from "react";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <React.Fragment>
      <script
        async
        defer
        src="https://scripts.simpleanalyticscdn.com/latest.js"
      ></script>
      <noscript>
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <Analytics />
      <AnimatePresence>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </React.Fragment>
  );
}

export default MyApp;
