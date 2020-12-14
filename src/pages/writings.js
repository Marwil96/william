import React from "react"
import { breakpoint, variables } from "../mixins/breakpoint"
import { animated, useSpring } from "react-spring"
import Img from "gatsby-image"
import styled from "styled-components"
import Footer from "../components/Footer"
import PageWrapper from "../components/PageWrapper"

const HeadTitle = styled(animated.h1)`
  font-size: 4.8rem;
  font-weight: 400;
  padding: 4.8rem 0;
  padding-top: 6.4rem;
  grid-column: span 12;
  text-align: left;

  ${breakpoint.tabPort`
    font-size: 10rem;
    padding: 12rem 0;
    padding-top: 3.2rem;
    text-align: left;
  `}
`

const Writings = ({ transitionStatus, location, entry, exit, data }) => {
  const slideName = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 500})

  return (
    <PageWrapper
      outerWrapperStyle={{ height: "auto" }}
      transitionActive={transitionStatus}
    >
      <HeadTitle style={slideName}>Writings</HeadTitle>
    </PageWrapper>
  )
}

export default Writings
