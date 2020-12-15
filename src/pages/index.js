import React from "react"
import styled from 'styled-components';
import { breakpoint } from "../mixins/breakpoint"
import PageWrapper from "../components/PageWrapper";
import ProjectSlider from "../components/ProjectSlider";
import '../scss/main.scss';
import { animated, useSpring } from "react-spring";

const IntroContainer = styled(animated.div)`
  height: 45%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;

  ${breakpoint.tabPort`
    height: 45%;
  `}

  .phone {
    font-size: 14vw;
    line-height: 100%;
    font-weight: 400;
    text-align: left;
    margin-bottom: 1rem;

    ${breakpoint.phone`
      display: none;
    `}
  }

  h1 {
    font-size: 2.4rem;
    font-weight: 300;
    text-align: left;
    line-height: 130%;

    ${breakpoint.phone`
      margin-top: -8vh;
      font-size: 4.2rem;
      font-weight: 300;
      max-width: 89.7rem;
      text-align: left;
    `}

    ${breakpoint.desktop`
      font-size: 2.5vw;
      max-width: 56vw;
    `}

    strong {
      font-size: 4.8rem;
      font-weight: 400;
      display: none;

      ${breakpoint.phone`
        display: block;
      `}

      ${breakpoint.desktop`
        font-size: 3.5vw;
      `}
    }
  }
`

const LandingPage = ({transitionStatus, location, entry, exit, data }) => {
  const slideText = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 500})

  return (
    <PageWrapper outerWrapperStyle={{position: 'fixed', height:'100%'}} style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between'}} location={location} transitionActive={transitionStatus}>
        <IntroContainer style={slideText}>
          <h1 className='phone'>
            William Martinsson
          </h1>
          <h1 className='desktop'>
            <strong>William Martinsson,</strong> A Digital Designer with a
            passion for technology. Currently in Sweden
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
          }
            thumbnail_image {
              localFile {
                url
                childImageSharp {
                  fluid {
                    tracedSVG
                    srcWebp
                    srcSetWebp
                    srcSet
                    src
                    sizes
                    presentationWidth
                    presentationHeight
                    originalName
                    originalImg
                    base64
                    aspectRatio
                  }
                }
              }
              url
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
