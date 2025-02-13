import React from "react";
import Layout from "src/components/Layout";
import ComposedImage from "src/components/ComposedImage";
import ProjectComponent from "src/components/ProjectComponent";
import HeroImage from "../../assets/knvb/hero.png";
import Image1 from "../../assets/knvb/image_1.png";

const metadata = [
  { label: "Client", value: "KNVB" },
  { label: "Role", value: "Frontend" },
  { label: "Team", value: "Momkai" },
];
const subtitle =
  "We were tasked to build the new version of KNVBs Rinus, a training platform for football teams. Where they can plan their exercises and get inspiration and advice from other football coaches.";

const KNVBRinus = () => {
  return (
    <Layout
      title="KNVB Rinus"
      desc={subtitle}
      project={true}
      framerKey="knvb-rinus"
    >
      <ProjectComponent
        title="KNVB Rinus"
        metadata={metadata}
        subtitle={subtitle}
        heroImage={HeroImage}
        linkToWebsite="https://rinus.knvb.nl/"
      >
        {/* <h5>My role</h5>
        <p>
          My Role in this project was mainly to implement the frontend and
          fine-tune all animations together with the motion designer. The
          hardest task with the project was to create an app-like experience for
          a website, so animations and transitions needed to be top class. And
          that while not making something that toasted the coaches' laptops,
          because the coaches mainly used old old laptops.
          <br /> <br /> One of the harder tasks was creating a dynamic calendar
          that was going to display all of the exercises. To make the load
          faster we used an intersection observer(the greatest thing coming out
          of javascript in the last couple of years) that only loaded days/weeks
          observed by the user. Which made it possible for us to create some
          nice animations, watch below.
        </p> */}
        <ComposedImage image={Image1} />
      </ProjectComponent>
    </Layout>
  );
};

export default KNVBRinus;
