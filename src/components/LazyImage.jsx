import React from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import Img from "gatsby-image"

const LazyImageWrapper = styled.div`
  width: 100%;
  position: relative;

  &:nth-child(2n) {
    margin-left: 2rem;

    &:before {
      transition-delay: 1s;
    }
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: #f7f7f7;
    z-index: 1000;
    transition: transform ease 1450ms;
    transform: scaleX(1);
    transform-origin: right;
  }

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  &.inView {
    &:before {
      content: "";
      height: 100%;
      position: absolute;
      transform: scaleX(0);
    }
  }
`

const LazyImage = ({ fluid }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.4,
    triggerOnce: true,
  })

  return (
    <LazyImageWrapper className={inView ? 'LazyImage inView' : 'LazyImage'} ref={ref}>
      <Img fluid={fluid} />
    </LazyImageWrapper>
  )
}

export default LazyImage;
