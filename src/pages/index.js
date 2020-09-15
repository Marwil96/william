import React from "react"
import { graphql } from "gatsby"
import Anime from 'react-anime';
import PageWrapper from "../components/PageWrapper";
import '../scss/main.scss';
import LinkBlock from "../components/LinkBlock";
import ProjectItem from "../components/ProjectItem";

const LandingPage = ({ data }) => {
  const projects = data.allPrismicProject.edges
  return (
    <PageWrapper className="LandingPage">
      <Anime
        opacity={[0, 1]}
        translateY={[100, 0]}
        duration={850}
        width={["100%", "100%"]}
        delay={0}
        // backgroundColor={["#F7F7F7", "#F7F7F7"]}
        easing={"easeInOutCubic"}
        className="anime"
      >
        <section className="LandingPage-intro">
          <Anime
            opacity={[0, 1]}
            translateY={[100, 0]}
            duration={850}
            delay={50}
            easing={"easeInOutCubic"}
          >
            <h1>
              I'm a creator of websites, apps, and digital products. <br />
              Based in Sweden.
            </h1>
          </Anime>
          <Anime
            opacity={[0, 1]}
            translateY={[100, 0]}
            duration={850}
            delay={250}
            easing={"easeInOutCubic"}
            className="textWrapper"
          >
            <span>
              I’m available for freelance work. <br /> Contact me at
              william@agenly.se
            </span>
          </Anime>
        </section>

        <Anime
          translateY={["43%", 0]}
          opacity={[1, 1]}
          duration={750}
          width={["100%", "100%"]}
          delay={450}
          easing={"easeInOutCubic"}
        >
          <section className="LandingPage-services">
            <div className="LandingPage-services__container">
              <h2 className="LandingPage-services__title">
                I'll guide you from start to finish through today's complex
                world of development and design.
              </h2>
              <div className="LandingPage-services__wrapper-right">
                <LinkBlock
                  title="Design & Development"
                  text="We build websites that work. For each business, and for each customer. Beautiful in their design. Effortless in their usability. Created to make impressions that last."
                  link="/services#design-development"
                />

                <LinkBlock
                  title="Strategy"
                  text="Everything we build needs to have a purpose. It could be strengthening your brand, higher ranking on Google or something completely different. We help you find your goals and reach them."
                  link="/services#strategy"
                />

                <LinkBlock
                  title="Whole Package"
                  text="Don't worry – we never just design and run. Every website needs regular care, so we'll check, maintain and improve yours for as long as your business needs."
                  link="/services#whole-package"
                />
              </div>
            </div>
          </section>
        </Anime>

        <section className="LandingPage-projects">
          <h3 className="LandingPage-projects__title">Selected Projects</h3>
          <div className="LandingPage-projects__projectWrapper">
            {projects.map(item => (
              <ProjectItem
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
      </Anime>
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
