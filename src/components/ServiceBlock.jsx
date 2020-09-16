import React from 'react';
import styled from 'styled-components';
import { breakpoint } from "../mixins/breakpoint"
import LazyImage from './LazyImage';

const ServiceBlockWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rem;
  align-items: center;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${breakpoint.phone`
    flex-direction: column-reverse;
    margin-bottom: 10rem;

    &:nth-child(even) {
      flex-direction: column-reverse;
    }
  `}
`

const TextContainer = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  max-width: 53rem;
`

const ServiceTitle = styled.h2`
  font-size: 4.2rem;
  font-weight: 300;
  color: #f7f7f7;
  margin: 0;
  margin-bottom: 1.6rem;

  ${breakpoint.phone`
    font-size: 3.2rem;
  `}
`

const ServiceText = styled.p`
  font-size: 1.8rem;
  font-weight: 300;
  line-height: 150%;
  margin-bottom: 1.6rem;
  color: #f7f7f7;

  ${breakpoint.phone`
    font-size: 1.6rem;
  `}
`

const ServiceTags = styled.span`
  text-transform: uppercase;
  color: #c6c6c6;
  font-weight: 600;
  font-size: 1.8rem;
  word-spacing: 0.8rem;
  line-height: 140%;

  ${breakpoint.phone`
    font-size: 1.6rem;
  `}
`

const ImageWrapper = styled.div`
  /* width: 100%; */
  max-width: 53rem;
  width: 100%;

  ${breakpoint.phone`
    width: 100%;
    position: relative;
    margin-bottom: 2.4rem;
  `}/* img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    ${breakpoint.phone`
      position: absolute;
    `}
  } */
`

const ServiceBlock = ({title, id, text, tags, image}) => {
  return (
    <ServiceBlockWrapper id={id}>
      <TextContainer>
        <ServiceTitle>{title}</ServiceTitle>
        <ServiceText>{text}</ServiceText>
        <ServiceTags>{tags}</ServiceTags>
      </TextContainer>

      <ImageWrapper>
        <LazyImage fluid={image} />
      </ImageWrapper>
    </ServiceBlockWrapper>
  )
}

export default ServiceBlock;