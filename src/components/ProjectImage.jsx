import React from 'react'
import styled from 'styled-components';
import { breakpoint, variables } from '../mixins/breakpoint';
import LazyImage from './LazyImage';

const ImageContainer = styled.div`
  width: 100%;
  max-width: ${variables.maxWidth};
  padding: 6.4rem 0;
  padding-top: 3.2rem;

  ${breakpoint.laptop`
    max-width: ${variables.maxWidthLaptop};
  `}
`

const SplitImageWrapper = styled.div`
  width: 100%;
  max-width: ${variables.maxWidth};
  padding: 6.4rem 0;
  padding-top: 3.2rem;
  display: flex;
  justify-content: space-between;
  height: 100%;

  ${breakpoint.laptop`
    max-width: ${variables.maxWidthLaptop}
  `}
`

export const FullWidthImage = ({ fluid }) => (
  <ImageContainer>
    <LazyImage fluid={fluid} />
  </ImageContainer>
)

export const SplitImage = ({ left, right}) => (
  <SplitImageWrapper>
    <LazyImage fluid={left} />
    <LazyImage fluid={right} />
  </SplitImageWrapper>
)
