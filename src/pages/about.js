import React from 'react';
import { breakpoint, variables } from "../mixins/breakpoint"
import { animated, useSpring } from 'react-spring';
import Img from "gatsby-image"
import styled from 'styled-components';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';

const HeadTitle = styled(animated.h1)`
  font-size: 10rem;
  font-weight: 400;
  padding: 12rem 0;
  padding-top: 3.2rem;
`

const ImageWrapper = styled.div`
  margin-bottom: 4.8rem;
  position: relative;

  ${breakpoint.tabPort`
    margin-bottom: 6.4rem;
  `}
`

const HeroMask = styled(animated.div)``

const About = ({transitionStatus, location, entry, exit, data }) => {
  const heroMaskSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1,1)'}, to:{ transform: 'scale(1,0)'}, delay: 800})
  const heroSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1.3)'}, to:{ transform: 'scale(1)'}, delay: 800})
  const slideName = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 500})


  const images = data.allImageSharp.edges;

  const heroImage = images.filter((edge) => edge.node.fluid.originalName === 'hero_image.png')[0].node.fluid

  console.log(heroImage)

  console.log(data)

  return (
    <PageWrapper
      style={{ display: "flex", flexDirection: "column" }}
      outerWrapperStyle={{ height: "auto" }}
      transitionActive={transitionStatus}
    >
      <HeadTitle style={slideName}>About me</HeadTitle>
      <ImageWrapper>
        <HeroMask
          className="mask"
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            background: "white",
            transformOrigin: "top",
            zIndex: 1,
            ...heroMaskSpring,
          }}
        ></HeroMask>
        <div style={{ overflow: "hidden" }}>
          <animated.div style={heroSpring}>
            <Img fluid={heroImage} />
          </animated.div>
        </div>
      </ImageWrapper>
      <Footer />
    </PageWrapper>
  )
}

  export const query = graphql`
  {
    allImageSharp {
      edges {
        node {
          id
          fluid {
            aspectRatio
            base64
            originalImg
            originalName
            presentationHeight
            presentationWidth
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
          }
        }
      }
    }
  }
`
  

export default About;