import { createStitches } from '@stitches/react';

export const { styled, getCssText } : {styled: any, getCssText: any} = createStitches({
  media: {
    bp1: '(min-width: 56.25em)',
  },
  
  theme: {
    fonts: {
      system: 'Inconsolata, serif',
      text: 'Inconsolata, monospace',
      title: 'Newsreader, serif'
    },
    colors: {
      secondary: '#979797',
      black: '#000000',
      text: '#F7F7F7',
      bg: '#161616',
      white: '#ffffff',
    },
    fontSizes: {
      1: '1.2rem',
      2: '1.6rem',
      3: '2rem',
      4: '2.4rem',
      5: '3.2rem',
      6: '4.2rem',
      7: '4.8rem',
      8: '6.4rem',
    },
    space: {
      1: '1.2rem',
      2: '1.6rem',
      3: '2rem',
      4: '2.4rem',
      5: '3.2rem',
      6: '4.2rem',
      7: '4.8rem',
      8: '6.4rem',
    },
    fontWeights: {},
    lineHeights: {      
      1: '1.2rem',
      2: '1.6rem',
      3: '2rem',
      4: '2.4rem',
      5: '3.2rem',
      6: '4.2rem',
      7: '4.8rem',
      8: '6.4rem',},
    letterSpacings: {},
    sizes: {      
      1: '1.2rem',
      2: '1.6rem',
      3: '2rem',
      4: '2.4rem',
      5: '3.2rem',
      6: '4.2rem',
      7: '4.8rem',
      8: '6.4rem',},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
});