import React, {useEffect} from 'react'
import {graphql} from 'gatsby';
import Anime from 'react-anime';
import PageWrapper from '../components/PageWrapper';
import ServiceBlock from '../components/ServiceBlock';
import SEO from '../components/SEO';

const Services = ({location, data}) => {
  useEffect(() => {
    if(location.hash) {
      document.querySelector(location.hash).scrollIntoView({
        behavior: "smooth", // smooth scroll
        block: "center", // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.
      })
    }
  }, [location.hash])

  return (
    <PageWrapper className="Services">
      <SEO
        title="Services"
        description="I'll guide you from start to finish through today's complex world of development and design."
      />
      <section className="Services-intro">
        <Anime
          opacity={[0, 1]}
          translateY={[100, 0]}
          duration={850}
          delay={50}
          easing={"easeInOutCubic"}
        >
          <h1>
            I'll guide you from start to finish through today's complex world of
            development and design.
          </h1>
        </Anime>
      </section>
      <section className="Services-services">
        <div className="Services-services__container">
          <ServiceBlock
            title="Design & Development"
            id="design-development"
            text={
              <span>
                Creating websites, applications, and digital products can be
                complicated. With my experience as both designer and developer,
                I can stand by your side during the entire project to make you
                confident in the project and the project understandable. <br />{" "}
                <br /> I design and create digital products that are easy to
                use, stand the test of time, and make the customers/users
                interaction with you better. I build my websites with the latest
                technologies to secure exceptional user experience and
                performance. Often I try to convince you to invest in a Design
                System to make the digital side of your business move faster and
                more agile.
              </span>
            }
            tags="UX-UI-DESIGN. DEVELOPMENT. DESIGN-SYSTEM. RAPID-PROTOTYPING. MAINTENENCE."
            image={data.design.childImageSharp.fluid}
          />

          <ServiceBlock
            title="Strategy"
            id="strategy"
            text={
              <span>
                I'll help you create a digital strategy where design,
                technology, and business work together so your business will be
                able to reach new heights. With the help of product analysis and
                data, we can establish new goals for your business. <br />{" "}
                <br /> I'll help you stay true to those goals. With my
                background in both design and development, I can take the
                project from start to finish while having your goals in
                continuous focus.
              </span>
            }
            tags="RESEARCH. PROTOTYPE. WORKSHOP. CUSTOMER-JOURNEY. PERSONA. USER-INTERVIEWS"
            image={data.strategy.childImageSharp.fluid}
          />

          <ServiceBlock
            title="Whole Package"
            id="whole-package"
            text={
              <span>
                Every website needs regular care and optimization, so I'll
                maintain and improve your website for as long as your business
                needs. <br /> <br /> Do you need help with anything else? Trough
                my company, I can offer other essential services, such as
                photography, animation, copywriting, and more because of my
                extensive freelance network and that without you lifting a
                finger.
              </span>
            }
            tags="MAINTENENCE. SEO. ANALYTICS. USER-INTERVIEWS. ANIMATIONS. PHOTOGRAPHY. COPY."
            image={data.wholePackage.childImageSharp.fluid}
          />
        </div>
      </section>
    </PageWrapper>
  )
}

export const query = graphql`
  {
    design: file(name: { eq: "design" }) {
      id
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
          originalImg
          originalName
          base64
          aspectRatio
        }
      }
    }
    strategy: file(name: { eq: "strategy" }) {
      id
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
          originalImg
          originalName
          base64
          aspectRatio
        }
      }
    }
    wholePackage: file(name: { eq: "whole-package" }) {
      id
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
          originalImg
          originalName
          base64
          aspectRatio
        }
      }
    }
  }
`

export default Services;