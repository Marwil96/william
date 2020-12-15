import React from 'react';
import { breakpoint } from "../mixins/breakpoint"
import { animated, useSpring } from 'react-spring';
import Img from "gatsby-image"
import TransitionLink from "gatsby-plugin-transition-link"
import styled from 'styled-components';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';
import TextBlock from '../components/TextBlock';
import SEO from '../components/SEO';

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

const ImageWrapper = styled.div`
  margin-bottom: 4.8rem;
  position: relative;
  grid-column: span 12;
  width: 100vw;
  margin-left: -1.6rem;

  ${breakpoint.tabPort`
    margin-bottom: 10rem;
    width: 100%;
    margin-left: none;
  `}
`

const Introduction = styled(animated.div)`
  margin-bottom: 6.4rem;
  grid-column: span 12;

  ${breakpoint.tabPort`
    grid-column-start: 2;
    grid-column-end: 12;
    margin-bottom: 16.4rem;
  `}

  h3 {
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 4rem;

    ${breakpoint.tabPort`
      font-size: 4.8rem;
      line-height: 7rem;
      margin-bottom: 6.4rem;
    `}
  }
`

// const DraqQuote = styled(animated.h2)`
//   font-weight: 300;
//   font-size: 26.2rem;
//   /* position: absolute; */
//   word-break: keep-all;
//   white-space: nowrap;
//   font-size: 20vw;
//   margin-left: -1.5vw;
// `

const Label = styled.h5`
  font-size: 1.6rem;
  font-style: italic;
  font-weight: 400;
  margin-bottom: 1.2rem;
  text-transform: uppercase;
  color: #464646;
  line-height: 180%;
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
    margin-bottom: 1.6rem;
    color: white;
    z-index: 10;
  }

  a {
    color: white;
    font-size: 3.2rem;
    font-style: italic;
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

const HeroMask = styled(animated.div)``

const About = ({transitionStatus, location, entry, exit, data }) => {
  const heroMaskSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1,1)'}, to:{ transform: 'scale(1,0)'}, delay: 800})
  const heroSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1.3)'}, to:{ transform: 'scale(1)'}, delay: 800})
  const slideName = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 500})
  const slideContent = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 1200})


  const images = data.allImageSharp.edges;

  const heroImage = images.filter((edge) => edge.node.fluid.originalName === 'hero_image.png')[0].node.fluid
  const childImage = images.filter((edge) => edge.node.fluid.originalName === 'william_as_a_kid.png')[0].node.fluid

  return (
    <PageWrapper
      outerWrapperStyle={{ height: "auto" }}
      transitionActive={transitionStatus}
    >
      <SEO
        title={`About William`}
        description="William is combo between a Frontend Developer and a Digital Designer.
          Whose passion lies in creating smooth products & experiences."
      />
      <HeadTitle style={slideName}>About me</HeadTitle>

      {/* Hero Image */}
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

      <Introduction style={{ ...slideContent }}>
        <Label>What is William In a professional sense.</Label>
        <h3>
          William is combo between a Frontend Developer and a Digital Designer.
          Whose passion lies in creating smooth products & experiences.
        </h3>
      </Introduction>
      <TextBlock
        sectionTitle="Who is william"
        image={childImage}
        sectionItems={[
          {
            title: "Born and Raised.",
            text:
              "William grew up in Skara, a small countryside town in the middle of Sweden with his two brothers and his mom.",
          },
          {
            title: "Education.",
            text:
              "William studied Digital Design at YRGO in Gothenburg. He fondly looks back at those years where he could design and code whatever he felt like, everyday.",
          },
          {
            title: "Sports.",
            text:
              "William is a big Arsenal fan, sometimes he admits that it effects his general wellbeing to much, especially in the last couple of years. Outside of football, William follows Mclaren in Formula 1 and Team Liquid in Dota 2.",
          },
        ]}
      />

      <Introduction style={{ gridColumn: "span 12" }}>
        <Label>Indiehacker but not an anarchist i promise</Label>
        <h3>
          William likes to call himself a indiehacker, because he creates small
          independent products that he hope will find market fit one day. He is
          currently working on a recipe network and a website builder.
        </h3>
      </Introduction>
      <TextBlock
        sectionTitle="how he learned to love the web"
        image={childImage}
        reverse={true}
        sectionItems={[
          {
            title: "How he got entangled in the web.",
            text:
              "When Williams brother introduced him to HTML & CSS he instantly got hooked to the ability to create something out of nothing. He started to make stupid websites, everything from political satire to art according to him.",
          },
          {
            title: "Way of working.",
            text:
              "William is primarily working with Javascript these days, often React or React Native. He has taken a liking to Gatsby a framework which makes it easy to create fast, small in size and easily scaleable static websites.",
          },
          {
            title: "Rapid, Fast, Sprint.",
            text:
              "William is a big advocate of working fast and sprinting. He believes seeing a user interacting with the product is worth more then a million meetings. ",
          },
        ]}
      />
      <TextBlock
        sectionTitle="design is not equal to Art"
        image={childImage}
        sectionItems={[
          {
            title: "A designer solves problems",
            text:
              "One of the first lessons William learned about design was that the hard part is to find all the problems not to solve them. William have been using user-interviews, A/B testing and other methods to more easily find problems.",
          },
          {
            title: "Design Systems",
            text:
              "William likes to think that he creates systems and not static designs, he dreams about the day when all of his code components will be completely reusable and always in sync with his Figma file. Because todays digital products are not  static paintings they are fast moving platforms which forces the design to be more fluid and the documentation better.",
          },
          {
            title: "Talking solves problems",
            text:
              "William believes that communication is the most important ability of a designer. You need to able to get the stakeholder onboard and you do that by bringing them along on the ride and communicating your ideas clearly.",
          },
        ]}
      />
      {/* <div style={{gridColumn: 'span 12'}}>
        <span style={{fontSize: '2.4rem'}}>Grab and drag</span>
        <DraqQuote>It was the saddest backflip of my career.</DraqQuote>
      </div> */}
      <NextProject style={{ gridColumn: "span 12" }}>
        <div> </div>
        <span>How to reach William</span>
        <TransitionLink
          to={`/contact`}
          exit={{ length: 0.5 }}
          entry={{ length: 0.5, delay: 0.5 }}
        >
          Contact page
        </TransitionLink>
      </NextProject>
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