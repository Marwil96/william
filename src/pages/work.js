import React from "react"
import styled from 'styled-components'
import { graphql } from "gatsby"
import { breakpoint, variables } from "../mixins/breakpoint"
import PageWrapper from "../components/PageWrapper"
import "../scss/main.scss"
import ProjectItem from "../components/ProjectItem"
import Anime from "react-anime"
import SEO from "../components/SEO"

const TextContainer = styled.div`
  padding: 12rem 0;
  padding-top: 20rem;
  display: flex;
  justify-content: center;
  width: 100%;

  ${breakpoint.phone`
      padding: 6rem 0;
      padding-top: 12rem;
    `}

  h1 {
    margin: 0;
    max-width: ${variables.maxWidth};
    font-size: 6.4rem;
    font-weight: 400;
    width: 100%;
    text-align: center;

    ${breakpoint.laptop`
      max-width: ${variables.maxWidthLaptop};
    `}

    ${breakpoint.phone`
      padding: 0 1.6rem;
      text-align: left;
    `}
  }
`

const Work = ({data}) => {
  const projects = data.allPrismicProject.edges;
  return (
    <PageWrapper className="LandingPage">
      <SEO
        title="Work and Articles"
        description="Hey, I'm William Martinsson. I'm a creator of websites, apps, and digital products. Sometimes I develop them other times I design them but usually, I do both. Currently freelancing from my home in the middle of Sweden."
      />
      <TextContainer>
        <h1>
          <Anime
            opacity={[0, 1]}
            translateY={[100, 0]}
            duration={650}
            delay={0}
            easing={"easeInOutCubic"}
          >
            Work & Articles
          </Anime>
        </h1>
      </TextContainer>

      <section className="LandingPage-projects">
        <div className="LandingPage-projects__projectWrapper">
          {projects.map((item, index) => (
            <ProjectItem
              key={index}
              title={item.node.data.title.text}
              name={item.node.data.project_name.text}
              tags={item.node.data.category.text}
              image={
                item.node.data.thumbnail_image.localFile.childImageSharp.fluid
              }
              link={item.node.uid}
            />
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}

export const query = graphql`
  {
    allPrismicProject(filter: { tags: { eq: "featured" } }) {
      edges {
        node {
          id
          uid
          data {
            category {
              text
            }
            thumbnail_image {
              localFile {
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

export default Work
