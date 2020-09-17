import React from "react"
import { graphql } from 'gatsby';
import { FullWidthImage, SplitImage } from "../components/ProjectImage"
import PageWrapper from "../components/PageWrapper"
import "../scss/main.scss"
import ProjectHeader from "../components/ProjectHeader"
import ProjectSummary from "../components/ProjectSummary"
import RichText from "../components/RichText";
import SEO from "../components/Seo";

const Project = ({data}) => {
  const content = data.prismicProject.data;

  return (
    <PageWrapper>
      <SEO
        title={`${content.project_name.text} - ${content.title.text}`}
        description={content.project_introduction.text}
      />
      <ProjectHeader
        projectName={content.project_name.text}
        projectTitle={content.title.text}
        projectImage={content.hero_image.localFile.childImageSharp.fluid}
      />

      <ProjectSummary
        summaryArray={content.summary}
        summaryIntro={content.project_introduction.text}
        linkToWebsite={content.link_to_website.url}
      />

      {content.body.map((section, index) => {
        if (section.slice_type === "rich_text") {
          return <RichText key={index} content={section.primary.text.html} />
        } else if (section.slice_type === "full_width_image") {
          return (
            <FullWidthImage
              fluid={section.primary.image.localFile.childImageSharp.fluid}
              key={index}
            />
          )
        } else if (section.slice_type === "split_images") {
          return (
            <SplitImage
              left={section.primary.left_image.localFile.childImageSharp.fluid}
              right={
                section.primary.right_image.localFile.childImageSharp.fluid
              }
              key={index}
            />
          )
        } else {
          return true
        }
      })}
    </PageWrapper>
  )
}

export const query = graphql`
  query PostBySlug($uid: String!) {
    prismicProject(uid: { eq: $uid }) {
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
