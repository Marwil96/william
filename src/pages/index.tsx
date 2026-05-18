import Layout from "../components/Layout";
import TextBlock from "src/components/TextBlock";
import BlogComponent from "src/components/BlogComponent";
import ProjectList, { ProjectRow } from "src/components/ProjectList";
import React from "react";

import KnoddHero from "../assets/knodd/hero.png";
import SuperchicaneHero from "../assets/superchicane/hero.png";
import RadionightHero from "../assets/radionight/hero.png";
import MasterDigitalDesignHero from "../assets/masterdigitaldesign/hero.png";
import AgenlyHero from "../assets/agenly/hero.png";
import MatieHero from "../assets/matie/hero.png";
import KnvbHero from "../assets/knvb/hero.png";

// PLACEHOLDER DATA — agency mapping is a best-guess. William will refine.
export const projects: ProjectRow[] = [
  {
    title: "Knodd",
    agency: "Momkai",
    year: "2019",
    desc: "An entirely new part of the website with articles about different child diseases and a rewrite to server rendering.",
    href: "/projects/knodd",
    image: KnoddHero,
  },
  {
    title: "Radionight",
    agency: "Oh Hi",
    year: "2022",
    desc: "A podcasting platform designed to generate hype around new episodes. Taking advantage of live streaming to imitate the movie premiere feel and producing a sense of community.",
    href: "/projects/radionight",
    image: RadionightHero,
  },
  {
    title: "Superchicane",
    agency: "Personal",
    year: "2021",
    desc: "Superchicane is a Formula One news platform made to tell stories with the help of data, everything from character portraits to the sport's technical aspects.",
    href: "/projects/superchicane",
    image: SuperchicaneHero,
  },
  {
    title: "Matie",
    agency: "Personal",
    year: "2021",
    desc: "Matie is a recipe app, built around the feature to create cookbooks, which you can work on together with your friends and family.",
    href: "/projects/matie",
    image: MatieHero,
  },
  {
    title: "Agenly",
    agency: "Personal",
    year: "2019",
    desc: "A website builder where you build your sites through having a dialogue with a decision tree (semi-AI).",
    href: "/projects/agenly",
    image: AgenlyHero,
  },
  {
    title: "KNVB Rinus",
    agency: "Momkai",
    year: "2019",
    desc: "The new version of KNVB's Rinus, a training platform for football teams where they plan exercises and get advice from other coaches.",
    href: "/projects/knvb-rinus",
    image: KnvbHero,
  },
  {
    title: "Master Digital Design",
    agency: "Momkai",
    year: "2018",
    desc: "An alumni page for Amsterdam University of Applied Sciences design students.",
    href: "/projects/master-digital-design",
    image: MasterDigitalDesignHero,
  },
  // TRY Stockholm work — no case study pages yet, no images yet.
  {
    title: "Mini Rodini",
    agency: "TRY Stockholm",
    year: "2024",
    desc: "Ecom site for the Swedish kidswear brand.",
    externalHref: "https://minirodini.com/",
  },
  {
    title: "Stronger",
    agency: "TRY Stockholm",
    year: "2024",
    desc: "Ecom site for the activewear brand.",
    externalHref: "https://www.strongerlabel.com/se",
  },
  {
    title: "OAS",
    agency: "TRY Stockholm",
    year: "2024",
    desc: "Ecom site for OAS Company.",
    externalHref: "https://oascompany.com/",
  },
];

export const writings = [
  {
    title: "UI Experiments",
    desc: "This is a playground for me to experiment with different animations, interactions, and design patterns.",
    action: "Go to Playground",
    leftText: "Experiments",
    href: "/experiments",
    key: "experiments",
    external: false,
    type: "experiments",
  },
  {
    title: "Fuck WCAG! [New Hot Design Trend] Here I come",
    desc: "What’s the most important? Making the web accessible for all or letting the user make the website black?",
    action: "Go to Article",
    leftText: "Writing",
    key: "writing",
    href: "https://williammartinsson.medium.com/fuck-screenreaders-darkmode-here-i-come-2d7eebe463ab",
    external: true,
    type: "writing",
  },
  {
    title: "How to use the grid",
    desc: "How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.",
    action: "Go to Article",
    key: "go-to-article",
    leftText: "Writing ",
    href: "https://williammartinsson.medium.com/how-to-use-the-css-grid-to-implement-a-design-on-a-website-that-uses-gatsby-and-styled-components-ebccb77cade8",
    external: true,
    type: "writing",
  },
];

const Home = ({ currentlyReading, readRecently }) => {
  return (
    <Layout
      title="William Martinsson - Designer & Developer"
      desc="Crafting digital products. Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at Artscape. Helping businesses succeed under the name Oh, Hi."
      framerKey="home"
      className="lg:w-[655px] mx-auto"
    >
      <h1 className="text-base font-title -tracking-tight italic font-normal mt-5 mb-4 md:mt-[250px]">
        William Martinsson -<br />
        Based in Stockholm
      </h1>
      <span className="text-base font-text mb-12 inline-block text-balance">
        <strong className="font-title italic font-medium">
          Design Engineer.
        </strong>{" "}
        Builder of performant software and web experiences. Musing about design
        systems and the dev & designer relationship. Currently Team Lead at{" "}
        <a
          href="https://trystockholm.com/"
          target="_blank" rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          TRY Stockholm
        </a>
        , creating ecom sites for some of Swedens biggest fashion brands(
        <a
          href="https://minirodini.com/"
          target="_blank" rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          Mini Rodini
        </a>
        ,{" "}
        <a
          href="https://oascompany.com/"
          target="_blank" rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          OAS
        </a>
        ,{" "}
        <a
          href="https://www.strongerlabel.com/se"
          target="_blank" rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          Stronger
        </a>
        ) and internal tools.
        <br /> <br /> Previously, designed and developed the new wave of
        internet art at{" "}
        <a
          href="https://artscape.se/"
          target="_blank" rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          Artscape
        </a>{" "}
        & built a great communication tool with{" "}
        <a
          href="https://www.levelshealth.com/"
          target="_blank" rel="noopener noreferrer"
          className="font-title italic font-light underline cursor-pointer lg:hover:text-[#ff5800]"
        >
          Levels Health
        </a>
        .
      </span>
      <h2 className="text-sm font-inter font-medium mb-2 lg:mb-4 text-gray-400">
        Projects
      </h2>
      <div className="mb-12">
        <ProjectList projects={projects} />
      </div>
      <BlogComponent
        title="Writing & Experiments"
        subtitle="Articles, playground, and side projects."
        posts={writings}
        className="mb-12"
      />

      {/* BIO BLOCK */}
      <h2 className="text-sm font-inter font-medium mb-2 lg:mb-4 text-gray-400">
        Me
      </h2>
      <TextBlock>
        I'm all about learning through <strong>play</strong>, diving into good{" "}
        <strong>reads</strong>, and getting hands-on with{" "}
        <strong>building</strong>. When I tackle a new challenge, I aim to stay
        thoughtful, and open-minded, and take full responsibility for <br />
        figuring it out. <br />
        <br />
        I've been working with <strong>React</strong> since I made my first
        website almost ten years ago. I still{" "}
        <strong className="text-[pink]">love</strong> it, and I haven't found
        anything that can make me work as fast as it can. For styling, I’m
        usually using <strong>Tailwind</strong>.
        <br />
        <br />I take pride in working fast with a high level of detail. I
        believe speed is one of the cornerstones of creating great software. You
        have to be fast, if you want to have time to{" "}
        <strong>collaborate</strong> with design and other engineers, do more{" "}
        <strong>iterations</strong>, and dare to do things{" "}
        <strong>differently</strong>.
        <br />
        <br /> When I'm not hunched over my laptop, I hunt after{" "}
        <strong>Unknown Pleasures</strong> in <strong>Stockholms</strong> vinyl
        shops. Rooting for
        <strong className="text-[#89CFF0]"> Änglarna </strong> in Allsvenskan
        and <strong className="text-[orange]"> McLaren </strong> in Formula One.
        Currently reading{" "}
        {currentlyReading.length > 0 &&
          currentlyReading.map((book, index) => (
            <strong key={index}>
              <a href={book.link}>{book.title}</a> by {book.creator}
              {currentlyReading.length - 1 !== index && "&"}
            </strong>
          ))}
        , and recently read{" "}
        {readRecently.length > 0 &&
          readRecently.map((book, index) => (
            <React.Fragment key={index}>
              <strong>
                <a href={book.link}>{book.title}</a> by {book.creator}
              </strong>
              {readRecently.length - 1 !== index ? " and " : "."}
            </React.Fragment>
          ))}
      </TextBlock>
      <h2 className="text-xs lg:text-sm font-inter font-medium mb-2 lg:mb-4 text-gray-400">
        Reach out
      </h2>
      <TextBlock>
        Looking for a chat, a freelance proposal or advice?
        <br />
        Say hi at{" "}
        <a target="_blank" rel="noopener noreferrer" href="mailto:william.c.o.martinsson@gmail.com">
          william.c.o.martinsson@gmail.com
        </a>
      </TextBlock>
    </Layout>
  );
};

export async function getStaticProps() {
  const Parser = (await import("rss-parser")).default;
  let parser = new Parser();

  try {
    const currentlyReading = await parser.parseURL(
      "https://oku.club/rss/collection/b4aUW"
    );
    const readRecently = await parser.parseURL(
      "https://oku.club/rss/collection/8OVTk"
    );

    return {
      props: {
        currentlyReading: currentlyReading.items,
        readRecently: readRecently.items,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: {
        currentlyReading: [],
        readRecently: [],
      },
      revalidate: 60,
    };
  }
}

export default Home;
