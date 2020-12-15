import Img from 'gatsby-image';
import TransitionLink from "gatsby-plugin-transition-link"
import React from 'react';
import { animated, useSpring, useSprings } from "react-spring"
import styled from "styled-components"
import { breakpoint } from "../mixins/breakpoint"

const ProjectCardWrapper = styled.a`
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  margin-bottom: 6.4rem;

  ${breakpoint.tabPort`
    grid-column: span 6;
  `}

  ${breakpoint.laptop`
   grid-column: span 4;
  `}
`

const ImageWrapper = styled.div`
  margin-bottom: 2.2rem;
  position: relative;

  ${breakpoint.tabPort`
    margin-bottom: 2.4rem;
    margin-left: none;
  `}
`

const ProjectTitle = styled(animated.h1)`
  font-size: 2.4rem;
  margin-bottom: 1.2rem;
  font-weight: 400;

  ${breakpoint.tabPort`
    font-size: 3.2rem;
    margin-bottom: 1.6rem;
  `}
`

const Label = styled(animated.h5)`
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 400;
  /* margin-bottom: 1.2rem; */
  text-transform: uppercase;
  /* color: #464646; */
  line-height: 180%;
  max-width: 70%;

  ${breakpoint.tabPort`
    font-size: 1.4rem;
  `}
`

const ProjectCard = ({image, title, category, type, style, index, link, outsideOfWebsite}) => {
//  const heroMaskSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1,1)'}, to:{ transform: 'scale(1,0)'}, delay: 800})
  const heroSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1.3)'}, to:{ transform: 'scale(1)'}, delay: 800 + (300 * index)})
  const slideTitle = useSpring({
    config: { friction: 35 },
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 1200 + (300 * index),
  })

  const slideCategory = useSpring({
    config: { friction: 35 },
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 1600 + 300 * index,
  })

  
  return (
    <ProjectCardWrapper href={outsideOfWebsite ? outsideOfWebsite : false} target='__blank'>
      <TransitionLink
        to={outsideOfWebsite ? false : `/projects/${link}`}
        exit={{ length: 0.5 }}
        entry={{ length: 0.5, delay: 0.5 }}
      >
        <ImageWrapper>
          <animated.div
            className="mask"
            style={{
              height: "100%",
              width: "101%",
              position: "absolute",
              background: "white",
              transformOrigin: "top",
              zIndex: 1,
              ...style,
            }}
          ></animated.div>
          <div style={{ overflow: "hidden" }}>
            <animated.div style={heroSpring}>
              <Img fluid={image} />
            </animated.div>
          </div>
        </ImageWrapper>
        <ProjectTitle style={slideTitle}>{title}</ProjectTitle>
        <animated.div
          style={{
            display: "flex",
            justifyContent: "space-between",
            ...slideCategory,
          }}
        >
          <Label>{category}</Label>
          <Label>co-owner</Label>
        </animated.div>
      </TransitionLink>
    </ProjectCardWrapper>
  )
}

export default ProjectCard;