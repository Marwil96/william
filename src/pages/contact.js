import React from "react"
import { breakpoint } from "../mixins/breakpoint"
import { animated, useSpring } from "react-spring"
import TransitionLink from "gatsby-plugin-transition-link"
import styled from "styled-components"
import Footer from "../components/Footer"
import PageWrapper from "../components/PageWrapper"
import TextBlock from "../components/TextBlock"
import { graphql } from "gatsby"
import SEO from "../components/SEO"
import { colors } from "../mixins/colors"

const Introduction = styled(animated.div)`
  margin-bottom: 6.4rem;
  grid-column: span 12;
  padding-top: 6.4rem;

  ${breakpoint.tabPort`
    grid-column-start: 1;
    grid-column-end: 13;
    margin-bottom: -7rem;
    padding-top: 0rem;
  `}

  h3 {
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 4rem;

    ${breakpoint.tabPort`
      font-size: 4.1vw;
      line-height: 5.9vw;
      margin-bottom: 6.4rem;
    `}
  }
`

  const Label = styled(animated.h5)`
    font-size: 2rem;
    color: #e63a2e;
    font-weight: 400;
    margin-bottom: 0.4rem;
    color: ${colors.orange};
    line-height: 180%;
    font-family: "fraunces";

    ${breakpoint.tabPort`
      font-size: 3.2rem;
       margin-bottom: 1.2rem;
    `}
  `


const NextProject = styled.section`
  width: 100%;
  background-color: #131313;
  padding: 6.4rem 0;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 6.4rem;

  div {
    position: absolute;
    width: 100vw;
    margin-left: -1.6rem;
    background-color: black;
    height: 100%;
    margin-top: -6.4rem;
    z-index: 0;
  }

  span {
    font-size: 1.8rem;
    font-weight: 300;
    margin-bottom: 0.6rem;
    color: white;
    z-index: 10;
  }

  a {
    color: white;
    font-size: 3.2rem;
    font-family: "fraunces";
    font-weight: 400;
    z-index: 10;
    position: relative;
    width: fit-content;

    &:before {
      border-bottom: 3px solid #fff;
      content: "";
      display: block;
      position: absolute;
      bottom: 1px;
      width: 0;
      transition: width 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    &:hover {
      cursor: pointer;
      &:before {
        width: 100%;
      }
    }
  }

  ${breakpoint.tabPort`
    padding: 14rem 0;

    div {
      margin-left: -10rem;
      margin-top: -14rem;
    }

    span {
      font-size: 2.4rem;
    }

    a {
      font-size: 6.4rem;
    }
  `}
`
    

const Contact = ({ transitionStatus, location, entry, exit, data }) => {
  const slideLabel = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 500})
  const slideIntro = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 800})

  return (
    <PageWrapper
      outerWrapperStyle={{ height: "auto" }}
      transitionActive={transitionStatus}
    >
      <SEO
        title="Contact William"
        description="William is combo between a Frontend Developer and a Digital Designer.
          Whose passion lies in creating smooth products & experiences."
      />
      <Introduction>
        <Label style={{ ...slideLabel }}>State of affairs</Label>
        <animated.h3 style={{ ...slideIntro }}>
          William is currently freelancing and building on his side projects,
          but rumors say that he is open to new opportunities in early 2021 and
          forwards.
        </animated.h3>
      </Introduction>
      <TextBlock
        image={data.imageSharp.gatsbyImageData}
        animationDelay={1100}
        sectionItems={[
          {
            title: "How to contact william",
            text:
              "Say hi at hi@williammartinsson.com or (if urgent!) text +46 768023804 if you want to talk about a future project, need advice or exchange puppy pictures.",
          },
          {
            title: "Looking for a freelance dev or designer?",
            text:
              "You have arrived at the right place, the first thing you should do is send me an email at hi@williammartinsson.com so I can get to know more about how I can help you.",
          },
        ]}
      />
      <NextProject style={{ gridColumn: "span 12" }}>
        <div> </div>
        <span>Read More</span>
        <TransitionLink
          to={`/about`}
          exit={{ length: 0.5 }}
          entry={{ length: 0.5, delay: 0.5 }}
        >
          About William
        </TransitionLink>
      </NextProject>
      <Footer />
    </PageWrapper>
  )
}

export const query = graphql`
  {
    imageSharp(fluid: { originalName: { eq: "william_as_a_kid.png" } }) {
      id
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
`

export default Contact
