import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { breakpoint } from "../mixins/breakpoint"
import { animated, useSpring } from "react-spring"

const TextBlockWrapper = styled(animated.section)`
  grid-column: span 12;
  margin-bottom: 6.4rem;

  ${breakpoint.tabPort`
    margin-bottom: 16.4rem;
  `}
`

const ContentContainer = styled.section`
  /* direction: rtl; */
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3.2rem;
  display: flex;
  flex-direction: column-reverse;
  grid-auto-flow: dense;

  ${breakpoint.tabPort`
    display: grid;
  `}
`

const TextSection = styled(animated.div)`
  display: flex;
  flex-direction: column;
  /* grid-column-start: 1;
  grid-column-end: 6; */
  justify-content: center;
  
`

const TextItem = styled.div`
  margin-bottom: 2.4rem;

  ${breakpoint.tabPort`
    margin-bottom: 3.2rem;
  `}
  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: 2rem;
    font-weight: 500;
    color: #333333;
    margin-bottom: 0.5rem;

    ${breakpoint.tabPort`
      font-size: 2.4rem;
      margin-bottom: 1rem;
    `}
  }

  span {
    font-size: 1.8rem;
    font-weight: 300;
    color: #333333;
    line-height: 2.8rem;

    ${breakpoint.tabPort`
      font-size: 2rem;
      line-height: 3rem;
    `}
  }
`

const SectionTitle = styled.h5`
  font-size: 1.6rem;
  font-style: italic;
  font-weight: 400;
  text-transform: uppercase;
  color: #464646;
  margin-bottom: 2.4rem;
  line-height: 2.8rem;

  ${breakpoint.tabPort`
    margin-bottom: 3.2rem;
    font-size: 1.6rem;
    line-height: auto;
  `}
`

const ImageWrapper = styled.div`
  margin-bottom: 3.2rem;
  position: relative;
  grid-column: span 12;
  width: 100vw;
  margin-left: -1.6rem;

  ${breakpoint.tabPort`
    margin-bottom: 6.4rem;
    width: 100%;
    margin-left: none;
  `}
`

const HeroMask = styled(animated.div)``


const TextBlock = ({reverse, sectionItems, sectionTitle, image, style, animationDelay}) => {
  const heroMaskSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1,1)'}, to:{ transform: 'scale(1,0)'}, delay: animationDelay ? animationDelay : 800})
  const heroSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1.3)'}, to:{ transform: 'scale(1)'}, delay: animationDelay ? animationDelay : 800})
  const slideText = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: animationDelay ? animationDelay : 800})

  return (
    <TextBlockWrapper style={{ ...style }}>
      <ContentContainer>
        <TextSection
          style={
            reverse
              ? { gridColumnStart: 8, gridColumnEnd: 13, ...slideText }
              : { gridColumnStart: 1, gridColumnEnd: 6, ...slideText }
          }
        >
          <SectionTitle>{sectionTitle}</SectionTitle>
          {sectionItems.map(item => (
            <TextItem>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
            </TextItem>
          ))}
        </TextSection>
        {/* <div style={{ gridColumn: "span 1" }}></div> */}
        <ImageWrapper
          style={
            reverse
              ? { gridColumnStart: 1, gridColumnEnd: 7 }
              : { gridColumnStart: 7, gridColumnEnd: 13 }
          }
        >
          <HeroMask
            className="mask"
            style={{
              height: "100%",
              width: "101%",
              position: "absolute",
              background: "white",
              transformOrigin: "top",
              zIndex: 1,
              ...heroMaskSpring,
            }}
          ></HeroMask>
          <div style={{ overflow: "hidden" }}>
            <animated.div style={heroSpring}>
              <Img fluid={image} />
            </animated.div>
          </div>
        </ImageWrapper>
      </ContentContainer>
    </TextBlockWrapper>
  )
}

export default TextBlock;