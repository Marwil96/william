import React, { useState } from "react"
import PageWrapper from "../components/PageWrapper";
import ProjectName from "../components/ProjectName";
import ProjectSlider from "../components/ProjectSlider";
import '../scss/main.scss';

const LandingPage = () => {

  const [selectedCase, setSelectedCase ] = useState(0)

  return (
    <PageWrapper>
      <ProjectSlider setSelectedCase={setSelectedCase} />
      <ProjectName selectedCase={selectedCase} />
    </PageWrapper>
  )
}

export default LandingPage;
