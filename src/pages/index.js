import React from "react"
import PageWrapper from "../components/PageWrapper";
import '../scss/main.scss';
import Header from "../components/Header";
import LinkBlock from "../components/LinkBlock";
import ProjectItem from "../components/ProjectItem";
import Footer from "../components/Footer";

const LandingPage =() => {
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
          <ProjectItem
            title="Your digital identity. For everything."
            name="Proxy"
            tags="Design & Development"
            image="https://images.prismic.io/14islands/a758ed1a-135c-4418-adde-547355564481_14islands-proxy.jpg?auto=compress,format&rect=0,0,2400,2400&w=730&h=730"
          />
          <ProjectItem
            title="The next wave of tech startups"
            name="Bird.co"
            tags="Branding"
            image="https://images.prismic.io/14islands/de8079f0-4945-45fe-8002-b09786121059_14islands-antler.jpg?auto=compress,format&rect=0,0,2400,2400&w=730&h=730"
          />
          <ProjectItem
            title="Play your way to be internet awesome."
            name="Google Interland"
            tags="Website"
            image="https://images.prismic.io/14islands/1b08a19a-ce96-44ec-bdd0-f31802e3e99c_14islands-interland-2.jpg?auto=compress,format&rect=0,0,2710,2710&w=730&h=730"
          />
        </div>
      </section>

      <Footer />
    </PageWrapper>
  )
}

export default LandingPage;
