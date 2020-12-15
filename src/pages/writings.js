import React from "react"
import { breakpoint } from "../mixins/breakpoint"
import { animated, useSpring, useSprings } from "react-spring"
import styled from "styled-components"
import Footer from "../components/Footer"
import PageWrapper from "../components/PageWrapper"
import { graphql } from "gatsby"
import ProjectCard from "../components/ProjectCard"
import SEO from "../components/SEO"

const HeadTitle = styled(animated.h1)`
  font-size: 4.8rem;
  font-weight: 300;
  padding: 4.8rem 0;
  padding-top: 6.4rem;
  grid-column: span 12;
  text-align: left;

  ${breakpoint.tabPort`
    font-size: 10rem;
    padding: 6.4rem 0;
    padding-top: 3.2rem;
    text-align: left;
  `}
`

const Writings = ({ transitionStatus, data }) => {
  const projects = data.allPrismicProject.edges

  const slideName = useSpring({
    config: { friction: 35 },
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 500,
  })

  const slideInCards = useSprings(
    projects.length,
    projects.map((item, index) => ({
      config: { friction: 45 },
      from: { transform: "scale(1,1)" },
      to: { transform: "scale(1,0)" },
      delay: 800 + 300 * index,
    }))
  )

  return (
    <PageWrapper
      outerWrapperStyle={{ height: "auto" }}
      transitionActive={transitionStatus}
    >
      <SEO
        title='Writings'
        description="William is combo between a Frontend Developer and a Digital Designer.
          Whose passion lies in creating smooth products & experiences."
      />
      <HeadTitle style={{ gridColumn: "span 12", ...slideName }}>
        Writings
      </HeadTitle>
      {slideInCards.map((style, index) => (
        <ProjectCard
          index={index}
          style={style}
          outsideOfWebsite={projects[index].node.data.link_to_website.url}
          link={projects[index].node.uid}
          title={projects[index].node.data.project_name.text}
          image={
            projects[index].node.data.thumbnail_image.localFile.childImageSharp
              .fluid
          }
          category={projects[index].node.data.category.text}
        />
      ))}

      <Footer style={{ marginTop: "10rem" }} />
    </PageWrapper>
  )
}

export const query = graphql`
  {
    allPrismicProject(
      filter: { tags: { eq: "article" } }
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
            link_to_website {
              url
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

export default Writings
