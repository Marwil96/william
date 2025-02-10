import type { NextPage } from "next";
import Layout from "../components/Layout";
import BlogComponent from "src/components/BlogComponent";

const posts = [
  {
    title: "Fuck WCAG! [New Hot Design Trend] Here I come",
    desc: "What’s the most important? Making the web accessible for all or letting the user make the website black?",
    action: "Go to Article",
    leftText: "13/12/21",
    href: "https://williammartinsson.medium.com/fuck-screenreaders-darkmode-here-i-come-2d7eebe463ab",
    external: true,
  },
  {
    title: "How to use the grid",
    desc: "How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.",
    action: "Go to Article",
    leftText: "09/11/20",
    href: "https://williammartinsson.medium.com/how-to-use-the-css-grid-to-implement-a-design-on-a-website-that-uses-gatsby-and-styled-components-ebccb77cade8",
    external: true,
  },
  {
    title: "The Greatest and the Cursed Car Numbers",
    desc: "Coming from football where the numbers are almost mythological, I wanted to find out more about the car numbers and try to discover their hidden meanings and status.",
    action: "Go to Article",
    leftText: "30/03/21",
    href: "https://superchicane.com/articles/thecursedf1number",
    external: true,
  },
  {
    title: "Why Figma Beats Sketch",
    desc: "For a long time, the biggest players in the UI design market were Adobe(Photoshop, Illustrator) and Sketch. Both of these tools aren’t very collaborative.",
    action: "Go to Article",
    leftText: "10/10/19",
    href: "https://williammartinsson.medium.com/why-figma-is-better-then-sketch-872b7bf8631a",
    external: true,
  },
];

const Writings: NextPage = () => {
  return (
    <Layout
      title="Writings - William Martinsson - Designer & Developer"
      desc="Crafting digital products. Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at Artscape. Helping businesses succeed under the name Oh, Hi."
      framerKey="writings"
      className="lg:w-[655px]"
    >
      <BlogComponent
        title="Writings"
        subtitle="A collection of my writings"
        posts={posts}
      />
    </Layout>
  );
};

export default Writings;
