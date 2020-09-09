import React from "react"
import { graphql } from 'gatsby';
import PageWrapper from "../components/PageWrapper"
import "../scss/main.scss"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProjectHeader from "../components/ProjectHeader"
import ProjectSummary from "../components/ProjectSummary"

const Project = ({data}) => {
  const content = data.prismicProject.data;
  console.log(content)
  return (
    <PageWrapper>
      <Header />
        <ProjectHeader 
          projectName={content.project_name[0].text}
          projectTitle={content.title[0].text} 
          projectImage={content.hero_image.url}
        />
        <ProjectSummary 
          summaryArray={content.summary}
          summaryIntro={content.project_introduction[0].text}
          linkToWebsite={content.link_to_website.url}

        />
      <Footer />
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
        }
        link_to_website {
          url
        }
        project_introduction {
          text
        }
      }
    }
  }
`

export default Project
