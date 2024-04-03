import Layout from "../components/Layout";
import TextBlock from "src/components/TextBlock";
import Parser from "rss-parser";
import BlogComponent from "src/components/BlogComponent";

export const latest = [
  {
    title: "UI Experiments",
    desc: "This is a playground for me to experiment with different animations, interactions, and design patterns.",
    action: "Go to Playground",
    leftText: "Experiments",
    href: "/experiments",
    external: false,
    type: "experiments",
  },
  {
    title: "Fuck WCAG! [New Hot Design Trend] Here I come",
    desc: "What’s the most important? Making the web accessible for all or letting the user make the website black?",
    action: "Go to Article",
    leftText: "Writing ",
    href: "https://williammartinsson.medium.com/fuck-screenreaders-darkmode-here-i-come-2d7eebe463ab",
    external: true,
    type: "writing",
  },
  {
    title: "Knodd",
    desc: "An entirely new part of the website with articles about different child diseases and a rewrite to server rendering.",
    action: "Go to case study",
    leftText: "Case Study",
    href: "/projects/knodd",
  },
  {
    title: "Master Digital Design",
    desc: "We were tasked to create an alumni page for Amsterdam University of Applied Sciences design students.",
    action: "Go to Case Study Study",
    leftText: "Case Study",
    href: "/projects/master-digital-design",
  },
  {
    title: "Superchicane",
    desc: "Superchicane is a Formula One news platform made to tell stories with the help of data, everything from character portraits to the sport's technical aspects.",
    action: "Go to Project",
    leftText: "Case Study",
    href: "/projects/superchicane",
    type: "project",
  },
  {
    title: "Radionight",
    desc: "A podcasting platform designed to generate hype around new episodes. Taking advantage of live streaming to imitate the movie premiere feel and producing a sense of community.",
    action: "Go to Project",
    leftText: "Case Study",
    href: "/projects/radionight",
    type: "project",
  },
  {
    title: "How to use the grid",
    desc: "How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.",
    action: "Go to Article",
    leftText: "Writing ",
    href: "https://williammartinsson.medium.com/how-to-use-the-css-grid-to-implement-a-design-on-a-website-that-uses-gatsby-and-styled-components-ebccb77cade8",
    external: true,
    type: "writing",
  },
];

const Home = ({ currentlyReading, readRecently }: any) => {
  return (
    <Layout
      title="William Martinsson - Designer & Developer"
      desc="Crafting digital products. Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at Artscape. Helping businesses succeed under the name Oh, Hi."
      framerKey="home"
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
        systems and the dev & designer relationship. Currently UI Team Lead at{" "}
        <a
          href="https://madepeople.se/"
          target="__blank"
          className="font-title italic font-light underline cursor-pointer"
        >
          Made People
        </a>
        , creating ecom sites for some of Swedens biggest fashion brands(
        <a
          href="https://minirodini.com/"
          target="__blank"
          className="font-title italic font-light underline cursor-pointer"
        >
          Mini Rodini
        </a>
        ,{" "}
        <a
          href="https://oascompany.com/"
          target="__blank"
          className="font-title italic font-light underline cursor-pointer"
        >
          OAS
        </a>
        ,{" "}
        <a
          href="https://www.rohnisch.com/"
          target="__blank"
          className="font-title italic font-light underline cursor-pointer"
        >
          Röhnisch
        </a>
        ) and internal tools.
        <br /> <br /> Previously, designed and developed the new wave of
        internet art at{" "}
        <a
          href="https://artscape.se/"
          target="__blank"
          className="font-title italic font-light underline cursor-pointer"
        >
          Artscape
        </a>{" "}
        & built a great communication tool with{" "}
        <a
          href="https://www.levelshealth.com/"
          target="__blank"
          className="font-title italic font-light underline cursor-pointer"
        >
          Levels Health
        </a>
        .
      </span>
      <BlogComponent
        title="Suggested Reading"
        subtitle="Stories, Case reports and more."
        posts={latest}
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
            <>
              <strong>
                <a href={book.link}>{book.title}</a> by {book.creator}
                {currentlyReading.length - 1 !== index && "&"}
              </strong>
            </>
          ))}
        , and recently read{" "}
        {readRecently.length > 0 &&
          readRecently.map((book, index) => (
            <>
              <strong>
                <a href={book.link}>{book.title}</a> by {book.creator}
              </strong>
              {readRecently.length - 1 !== index ? " and " : "."}
            </>
          ))}
      </TextBlock>
      <h2 className="text-xs lg:text-sm font-inter font-medium mb-2 lg:mb-4 text-gray-400">
        Reach out
      </h2>
      <TextBlock>
        Looking for a chat, a freelance proposal or advice?
        <br />
        Say{" "}
        <a target="__blank" href="mailto:hi@williammartinsson.com">
          hi@williammartinsson.com
        </a>
      </TextBlock>
    </Layout>
  );
};

export async function getServerSideProps() {
  let parser = new Parser();

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
  };
}

export default Home;
