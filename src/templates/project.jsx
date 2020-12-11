import React, { useEffect, useState } from "react"
import { graphql, Link } from 'gatsby';
// import { FullWidthImage, SplitImage } from "../components/ProjectImage"
import PageWrapper from "../components/PageWrapper"
import styled from 'styled-components';
import "../scss/main.scss"
import { breakpoint, variables } from "../mixins/breakpoint"
import ProjectHeader from "../components/ProjectHeader";
import Img from "gatsby-image";
import { Bubble } from "../components/Bubble";
import RichText from "../components/RichText";
import Footer from "../components/Footer";
import { useSpring, animated } from "react-spring"

const ImageWrapper = styled.div`
  margin-bottom: 4.8rem;
  position: relative;
  
  ${breakpoint.tabPort`
    margin-bottom: 6.4rem;
  `}
`

const ContentWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3.2rem;
  padding-bottom: 10rem;
`

const Introduction = styled.h3`
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 4rem;
  margin-bottom: 4.8rem;

  grid-column: span 12;

  ${breakpoint.tabPort`
    grid-column-start: 3;
    grid-column-end: 11;
    font-size: 3.2rem;
    line-height: 5.4rem;
    margin-bottom: 6.4rem;
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

const HeroMask = styled(animated.div)`

`

const Project = ({data, transitionStatus, location, entry, exit}) => {
  const content = data.prismicProject.data;
  const [nextProject, setNextProject] = useState({slug: '', name:''})
  useEffect(() => {
    if(content.project_name.text === 'KNVB Rinus') setNextProject({slug: "master-digital-design", name:'Amsterdam University'})
    else if(content.project_name.text === 'Amsterdam University') setNextProject({ slug: "agenly", name: "Agenly" })
    else if(content.project_name.text === 'Agenly') setNextProject({ slug: "knodd", name: "Knodd" })
    else {setNextProject({ slug: "knvb-rinus", name: "KNVB Rinus" })}
  }, [])

   const heroMaskSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1,1)'}, to:{ transform: 'scale(1,0)'}, delay: 1600})
   const heroSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1.3)'}, to:{ transform: 'scale(1)'}, delay: 1600})
   const slideBubble = useSpring({config: {friction: 10, tension: 400}, from: {transform: 'scale(0)'}, to:{ transform: 'scale(1)'}, delay: 2200})


  return (
    <PageWrapper
      style={{ display: "flex", flexDirection: "column" }}
      outerWrapperStyle={{ height: "auto" }}
      transitionActive={transitionStatus}
    >
      <ProjectHeader
        name={content.project_name.text}
        metaData={content.summary}
      />
      <ImageWrapper>
        <Bubble
          style={{
            position: "absolute",
            top: "-8vh",
            right: "10rem",
            height: "15.7rem",
            width: "15.8rem",
            fontSize: "2.4rem",
            padding: "1rem",
            ...slideBubble,
          }}
        >
          Visit Website
        </Bubble>
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
        <div style={{overflow: "hidden"}}><animated.div style={heroSpring}><Img fluid={content.hero_image.localFile.childImageSharp.fluid} /></animated.div></div>
      </ImageWrapper>

      {/* CONTENT START HERE  */}
      <ContentWrapper>
        <Introduction>{content.project_introduction.text}</Introduction>

        {content.body.map((section, index) => {
          if (section.slice_type === "rich_text") {
            return <RichText key={index} content={section.primary.text.html} />
          } else if (section.slice_type === "full_width_image") {
            return (
              <ImageWrapper
                style={{ gridColumn: "span 12", marginTop: "6.4rem" }}
              >
                <Img
                  fluid={section.primary.image.localFile.childImageSharp.fluid}
                  key={index}
                />
              </ImageWrapper>
            )
          } else {
            return true
          }
        })}
      </ContentWrapper>
      <NextProject>
        <div> </div>
        <span>Next Project</span>
        <Link to={`/projects/${nextProject.slug}`}>{nextProject.name}</Link>
      </NextProject>
      <Footer />
    </PageWrapper>
  )
}

export const query = graphql`
  query PostBySlug($uid: String!) {
    prismicProject(uid: { eq: $uid }) {
      tags
      data {
        title {
          text
        }
        summary {
          summary_title {
            text
          }
          summary_value {
            text
          }
        }
        project_name {
          text
        }
        category {
          text
        }
        hero_image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 3080, quality: 100) {
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
                tracedSVG
              }
            }
          }
        }
        link_to_website {
          url
        }
        project_introduction {
          text
        }
        body {
          ... on PrismicProjectBodyFullWidthImage {
            id
            slice_type
            internal {
              type
            }
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3080, quality: 100) {
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
                      tracedSVG
                    }
                  }
                }
              }
            }
          }
          ... on PrismicProjectBodySplitImages {
            id
            slice_type
            internal {
              type
            }
            primary {
              left_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3080, quality: 100) {
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
                      tracedSVG
                    }
                  }
                }
              }
              right_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3080, quality: 100) {
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
                      tracedSVG
                    }
                  }
                }
              }
            }
          }
          ... on PrismicProjectBodyRichText {
            id
            primary {
              text {
                html
              }
            }
            slice_type
          }
          ... on PrismicProjectBodyQuote {
            id
            primary {
              author {
                text
              }
              quote {
                text
              }
            }
            slice_type
          }
          ... on PrismicProjectBodyQuote1 {
            primary {
              quote {
                text
              }
              author {
                text
              }
            }
            slice_type
          }
        }
      }
    }
  }
`


export default Project
