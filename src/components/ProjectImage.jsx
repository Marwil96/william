import React from 'react'
import styled from 'styled-components';
import LazyImage from './LazyImage';

const ImageContainer = styled.div`
  width: 100%;
  max-width: 119rem;
  padding: 6.4rem 0;
  padding-top: 3.2rem;
`

const SplitImageWrapper = styled.div`
  width: 100%;
  max-width: 119rem;
  padding: 6.4rem 0;
  padding-top: 3.2rem;
  display: flex;
  justify-content: space-between;
  height: 100%;
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
