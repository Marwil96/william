import React from "react"
import { breakpoint, variables } from "../mixins/breakpoint"
import styled from "styled-components"
import LazyImage from "./LazyImage"

const ProjectHeaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 6.4rem;
  width: 100%;
  align-items: center;
  background: #fff;

  ${breakpoint.tabPort`
    padding-bottom: 3.2rem;
  `}
`

const ProjectHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4.6rem;
  background: #ECE7DA;
  width: 100%;
`

const TextContainer = styled.div`
  max-width: ${variables.maxWidth};
  width: 100%;
  padding: 14rem 0;
  padding-top: 18rem;

  ${breakpoint.laptop`
    max-width: ${variables.maxWidthLaptop};
  `}

  ${breakpoint.tabPort`
    padding: 10rem 1.6rem;
    padding-top: 12rem;
    width: auto;
  `}
`

const ProjectHeaderTitle = styled.h1`
  font-size: 5.4rem;
  font-weight: 500;
  margin: 0;
  max-width: 74.9rem;

  ${breakpoint.tabPort`
    font-size: 4.8rem;
  `}

  ${breakpoint.tabPort`
    font-size: 3.2rem;
  `}
`

const ProjectHeaderImageWrapper = styled.div`
  display: flex;
  max-width: 130rem;
  width: 100%;
  margin-top: -9.6rem;

  ${breakpoint.laptop`
    max-width: 120rem;
  `}

  .LazyImage {
    ${breakpoint.tabPort`
      padding: 0 1.6rem;

      &:before {
        width: calc(100% - 3.2rem);
      }
    `}
  }

  .gatsby-image-wrapper {
    width: 100%;
  }
`




const ProjectHeader = ({ projectName, projectTitle, projectImage }) => (
  <ProjectHeaderWrapper>
    <ProjectHeaderContainer>
      <TextContainer>
        <ProjectHeaderTitle>{`${projectName} — ${projectTitle}`}</ProjectHeaderTitle>
      </TextContainer>
    </ProjectHeaderContainer>

    <ProjectHeaderImageWrapper>
      <LazyImage fluid={projectImage} />
    </ProjectHeaderImageWrapper>
  </ProjectHeaderWrapper>
)

export default ProjectHeader
