import React, {useState} from "react"
import Anime from "react-anime";
import PageWrapper from "../components/PageWrapper";
import SEO from "../components/Seo";
import '../scss/main.scss';

const Contact =() => { 

  const [aniState, setAniState] = useState(false)
  return (
    <PageWrapper>
      <SEO
        title="Contact"
        description="Hey, I'm William Martinsson. I'm a creator of websites, apps, and digital products. Sometimes I develop them other times I design them but usually, I do both. Currently freelancing from my home in the middle of Sweden."
      />
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
        <section className="Contact">
          <h1
            className={`Contact__highfive ${
              aniState ? "Contact__highfive-active" : ""
            }`}
          >
            *SMACK* HIGHFIVE
          </h1>
          <div className="Contact__container">
            <div className="Contact__col-left">
              <h1 className="Contact__title">Get in touch!</h1>
              <p className="Contact__text">
                Are you unsure of your digital strategy, do you need help
                figuring out what kind of technical solution you need, or are
                you just curious to know more about me?
                <br /> <br />
                Say hi at{" "}
                <a href="mailto: william@agenly.se" className="Contact__link">
                  william@agenly.com
                </a>{" "}
                or (if urgent!) text{" "}
                <a href="tel:+46768023804" className="Contact__link">
                  +46 768023804
                </a>{" "}
                if you want to talk about a future project, need advice or
                exchange puppy pictures.
              </p>
            </div>
            <div className="Contact__col-right">
              <svg
                onClick={() => setAniState(true)}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 309 298"
              >
                <path
                  d="M73.1 233.9c-2.5-.5-4.6-1-7.2-2-2.5-1-4.6-1.6-6.6-2.6-4.7-2-8.8-4.7-12.9-7.7a65.7 65.7 0 01-20-22.7c-5.2-8.7-8.3-19-8.8-28.7-.5-5.2 0-9.8.5-15l1.6-7.1c.5-2.6 1.5-4.7 2-7.2l.5 7.2c0 2.5.6 4.6 1 7.2.6 4.6 1.6 9.2 2.6 13.3 2.1 8.8 5.2 17 9.8 24.7A109.1 109.1 0 0062.3 224c1.6 1.6 3.6 3.1 5.7 4.7l5.1 5.1zM71.6 252.4c-1.6 1-3.6 1.5-5.7 2-2 .6-3.6 1-5.6 1-3.6.6-7.7 1.1-11.8.6a57 57 0 01-22.7-6.2A43.6 43.6 0 018.4 234c-2-3-4.1-6.7-5.7-10.3L1.2 218c0-1.6-.5-3.1-.5-5.2 1.5 1.6 2.5 3.1 3.6 4.1 1.5 1.6 2.5 3.1 3.6 4.1 2.5 2.6 4.6 5.2 7.1 7.2a74.2 74.2 0 0016.5 11.9 117 117 0 0018.5 7.7c3 1 6.7 1.5 10.3 2.5 1.5.6 3.6.6 5.1 1 2.6.6 4.1.6 6.2 1.1zM187.7 2.6c2.6.5 4.7 1.6 7.2 2.6 2.6 1 4.7 2 6.7 3 4.6 2.6 8.8 5.2 12.9 8.3a67 67 0 0126.7 53 73.4 73.4 0 01-3.6 22c-1 2.6-1.5 4.7-2.6 6.7l-.5-7.2c0-2.6 0-4.6-.5-7.2L232.5 70a95 95 0 00-24.2-47.8c-3-3.6-6.7-6.6-9.8-10.2-1.5-1.6-3.6-3.1-5.6-4.7l-5.2-4.6zM232.5.6c2 .5 3.6 1 5.1 2a24 24 0 015.1 2.6c3.1 2 6.2 4 9.3 6.7a46.3 46.3 0 0112.8 18.5C268 37.6 269 45.3 268 53c-.5 3.6-1.5 7.2-2.5 10.8-.6 1.5-1.6 3.6-2.1 5.1-1 1.6-1.5 3.1-3 4.6V63.3c0-3.6-.6-6.7-.6-9.8-1-6.7-2-12.9-4.6-18.5-2.6-6.2-5.7-11.3-9.3-17-2-2.5-4-5.6-6.1-8.2-1-1.5-2.1-2.6-3.6-4.1-1-2.6-2.6-4.1-3.6-5.1z"
                  fill="#42ADE2"
                />
                <path
                  d="M41.8 77.1c-10.3 4.7-13.9 17-9.3 27.3l64.8 135.2 36-17L68.5 86.9a19.5 19.5 0 00-26.7-9.8zM211.9 184.6l38-18-74-154.2a21.2 21.2 0 00-28.2-9.8 21.2 21.2 0 00-9.8 28.3l74 153.7z"
                  fill="#FFDD67"
                />
                <path
                  d="M148.2 2.1c-1 .5-2 1-3.1 2 9.7-2.5 20 2.1 24.7 11.4l74 154.2 6.6-3.1-74-154.2A21 21 0 00148.2 2z"
                  fill="#EBA352"
                />
                <path
                  d="M133.3 222l39.5-19L97.3 45.9C92 35 78.8 29.8 68 35a22.2 22.2 0 00-10.3 29.3L133.3 222z"
                  fill="#FFDD67"
                />
                <path
                  d="M68 35.5c-1 .5-2 1-3.1 2 9.8-2.5 21 2.1 25.7 11.9l46.8 98.2 11.3 6.6L97.3 46.3C92 35 79.3 30.3 68 35.5z"
                  fill="#EBA352"
                />
                <path
                  d="M166.7 190.7l39.5-19-75.5-157.3a21.7 21.7 0 00-29.3-10.2 22.2 22.2 0 00-10.3 29.3l75.6 157.2z"
                  fill="#FFDD67"
                />
                <path
                  d="M101.4 3.6c-1 .6-2 1.6-3 2.1 9.7-2.6 21 2 25.6 11.8l53 111 11.3 6.7-57.6-120.8a22 22 0 00-29.3-10.8zM41.8 77.1c-1 .6-2 1-3.1 2 9.2-2.5 19 2.2 23.1 11.4l38.6 80.7 11.3 6.7-43.2-90.5a19.3 19.3 0 00-26.7-10.3z"
                  fill="#EBA352"
                />
                <path
                  d="M302.9 61.7c-14-10.8-36.5 1-47.8 38-7.7 25.8-8.8 33.5-25.2 41.2l-9.3-19s-146 70.4-140.3 81.7c0 0 17.5 54.5 47.3 79.6 44.2 38 147.5-2.5 152.1-100.7 2.6-57 38-109 23.2-120.8z"
                  fill="#FFDD67"
                />
                <path
                  d="M302.9 61.7c-2.6-2-5.7-3-8.8-3.6.5.5 1.6.5 2 1 15.5 11.9-.4 39.1-9.2 63.8-7.2 19.5-13.3 39.6-12.3 59 4.1 85.4-81.7 126-133.1 110.6 50.4 21 143.9-19 139.8-108-1-19.5 4.6-38.5 12.3-59 8.2-24.7 24.2-52 9.3-63.8z"
                  fill="#EBA352"
                />
                <path
                  d="M234.5 138.8c-31.9 3.6-78.6 49.4-45.7 99.2-24.2-50.4 15.4-84.3 40.6-96.1 2.5-2 5.1-3 5.1-3z"
                  fill="#EBA352"
                />
              </svg>
            </div>
          </div>
        </section>
      </Anime>
    </PageWrapper>
  )
}

export default Contact;