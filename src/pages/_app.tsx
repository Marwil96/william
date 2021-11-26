import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import Script from 'next/script';
import React from 'react';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
  <React.Fragment>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
    <AnimatePresence exitBeforeEnter>   
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </React.Fragment>
  )
}

export default MyApp
