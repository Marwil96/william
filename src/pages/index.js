import React from "react"
import styled from 'styled-components';
import { breakpoint } from "../mixins/breakpoint"
import PageWrapper from "../components/PageWrapper";
import ProjectSlider from "../components/ProjectSlider";
import '../scss/main.scss';
import { animated, useSpring } from "react-spring";
import { graphql } from "gatsby";
import { colors } from "../mixins/colors";

const IntroContainer = styled(animated.div)`
  height: 55%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;

  ${breakpoint.tabPort`
    height: 55vh;
  `}

  .phone {
    /* font-size: ${window.innerHeight > 600 ? `48px` : "32px"}; */
    font-size: 4.8rem;
    line-height: 100%;
    font-weight: 400;
    text-align: left;
    margin-bottom: 1rem;
    margin-top: 3.2vh;
    font-family: "fraunces";

    ${breakpoint.phone`
      display: none;
    `}
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 300;
    text-align: left;
    line-height: 130%;

    ${breakpoint.phone`
      margin-top: 7vh;
      font-size: 4.8rem;
      font-weight: 300;
      max-width: 89.7rem;
      text-align: left;
    `}

    ${breakpoint.desktop`
      font-size: 3vw;
      max-width: 56vw;
    `}

    strong {
      font-size: 4.8rem;
      font-weight: 400;
      font-family: "fraunces";
      color: ${colors.orange};
      line-height: 103%;
      margin-bottom: 0.8rem;
      display: block;

      ${breakpoint.phone`
        font-size: 6.4rem;
        margin-right: 1rem;
        margin-bottom: 0rem;
        display: inline;
      `}

      ${breakpoint.desktop`
        font-size: 3.9vw;
      `}
    }
  }
`

const LandingPage = ({transitionStatus, location, entry, exit, data }) => {
  const slideText = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 500})

  return (
    <PageWrapper outerWrapperStyle={{position: 'fixed', height:'100%'}} style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between', paddingTop: 0}} location={location} fixedHeight transitionActive={transitionStatus}>
        <IntroContainer style={slideText}>
          <h1 className='desktop'>
            <strong>William Martinsson,</strong> A Digital Designer with a
            passion for technology.
          </h1>
        </IntroContainer>
        <ProjectSlider projects={data.allPrismicProject.edges} />
    </PageWrapper>
  )
}

export const query = graphql`
  {
    allPrismicProject(
      filter: { tags: { eq: "featured" } }
      sort: { fields: data___order }
    ) {
      edges {
        node {
          id
          uid
          data {
            category {
              text
            }
            hero_image {
              url
              localFile {
                publicURL
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
            project_name {
              text
            }
            title {
              text
            }
          }
        }
      }
    }
  }
`

export default LandingPage;
