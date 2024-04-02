import type { NextPage } from "next";
import Layout from "../components/Layout";
import BlogComponent from "src/components/BlogComponent";
import { styled } from "../../stitches.config";
import SectionLabel from "src/components/SectionLabel";
import TextBlock from "src/components/TextBlock";

const Contact: NextPage = () => {
  return (
    <Layout
      title="Contact - William Martinsson - Designer & Developer"
      desc="Crafting digital products. Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at Artscape. Helping businesses succeed under the name Oh, Hi."
      framerKey="contact"
    >
      <div className="flex flex-col relative mt-5 mb-8 md:mt-20">
        <h1 className="font-title text-2xl mb-0.5 leading-snug">Contact</h1>
        <span className="text-base font-text text-gray-500 font-medium leading-snug flex pb-5 border-b border-dashed border-gray-400">
          Say hi, send proposals or ask me out for a walk.
        </span>
        <div className="flex flex-col py-3 justify-center border-b border-dashed border-gray-400 last:mb-0">
          <h5 className="text-sm font-title mb-1 leading-snug font-light text-white">
            Email
          </h5>
          <a
            href="mailto:hi@williammartinsson.com"
            className="text-base font-text font-light leading-snug text-white underline cursor-pointer hover:opacity-80"
          >
            hi@williammartinsson.com
          </a>
        </div>

        <div className="flex flex-row py-3 justify-start items-start border-b border-dashed border-gray-400 text-white">
          <a
            href="https://www.linkedin.com/in/william-martinsson-a24a3b111/"
            className="text-base font-title mr-5"
          >
            LinkedIn
          </a>
          <a
            href="https://williammartinsson.medium.com/"
            className="text-base font-title mr-5"
          >
            Medium
          </a>
          <a
            href="https://github.com/Marwil96"
            className="text-base font-title"
          >
            Github
          </a>
        </div>
      </div>
      <h2 className="text-sm font-inter font-medium mb-4 text-gray-400">Me</h2>
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
      </TextBlock>
    </Layout>
  );
};

export default Contact;
