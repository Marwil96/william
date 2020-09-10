import React from "react"
import { graphql } from "gatsby"
import PageWrapper from "../components/PageWrapper";
import '../scss/main.scss';
import Header from "../components/Header";
import LinkBlock from "../components/LinkBlock";
import ProjectItem from "../components/ProjectItem";
import Footer from "../components/Footer";

const LandingPage = ({data}) => {
  console.log(data.allPrismicProject.edges)
  const projects = data.allPrismicProject.edges; 

  return (
    <PageWrapper className="LandingPage">
      <Header />
      <section className="LandingPage-intro">
        <h1>
          I'm a creator of websites, apps, and digital products. <br />
          Based in Sweden.
        </h1>

        <span>
          I’m available for freelance work. <br /> Contact me at
          william@agenly.se
        </span>
      </section>

      <section className="LandingPage-services">
        <div className="LandingPage-services__container">
          <h2 className="LandingPage-services__title">
            I'll guide you from start to finish through today's complex world of
            development and design.
          </h2>
          <div className="LandingPage-services__wrapper-right">
            <LinkBlock
              title="Web Design & Development"
              text="We build websites that work. For each business, and for each customer. Beautiful in their design. Effortless in their usability. Created to make impressions that last."
            />

            <LinkBlock
              title="Strategy"
              text="Everything we build needs to have a purpose. It could be strengthening your brand, higher ranking on Google or something completely different. We help you find your goals and reach them."
            />

            <LinkBlock
              title="Whole Package"
              text="Don't worry – we never just design and run. Every website needs regular care, so we'll check, maintain and improve yours for as long as your business needs."
            />
          </div>
        </div>
      </section>

      <section className="LandingPage-projects">
        <h3 className="LandingPage-projects__title">Selected Projects</h3>
        <div className="LandingPage-projects__projectWrapper">
          {projects.map(item => (
            <ProjectItem
              title={item.node.data.title.text}
              name={item.node.data.project_name.text}
              tags={item.node.data.category.text}
              image={item.node.data.thumbnail_image.localFile.childImageSharp.fluid}
              link={item.node.uid}
            />
          ))}
        </div>
      </section>

      <Footer />
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

export default LandingPage;
