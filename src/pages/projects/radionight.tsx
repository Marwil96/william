import React from "react";
import Layout from "src/components/Layout";
import ComposedImage from "src/components/ComposedImage";
import ProjectComponent from "src/components/ProjectComponent";
import HeroImage from "../../assets/radionight/hero.png";
import Image1 from "../../assets/radionight/image_1.png";
import Image2 from "../../assets/radionight/image_2.png";
import Image3 from "../../assets/radionight/image_3.png";

const metadata = [
  {
    label: "Tech",
    value: "React Native, Firebase, NodeJS, Express, Styled-Components, Expo",
  },
  { label: "State", value: "In Appstore Hell" },
];
const subtitle =
  "A podcasting platform designed to generate hype around new episodes. Taking advantage of live streaming to imitate the movie premiere feel and producing a sense of community.";

const RadioNight = () => {
  return (
    <Layout
      title="Radionight"
      desc={subtitle}
      project={true}
      framerKey="radionight"
    >
      <ProjectComponent
        title="Radionight"
        metadata={metadata}
        subtitle={subtitle}
        heroImage={HeroImage}
        linkToWebsite="https://play.google.com/store/apps/details?id=com.williammartinsson.radionight"
      >
        <ComposedImage image={Image3} />
        <ComposedImage image={Image1} />
        <ComposedImage image={Image2} />
      </ProjectComponent>
    </Layout>
  );
};

export default RadioNight;
