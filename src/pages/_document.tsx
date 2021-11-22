import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '../../stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wdth,wght@100,400;100,500;86.9,500&family=Newsreader:ital,wght@0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
