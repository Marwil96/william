import React from "react"
import styled from "styled-components"

const ProjectHeaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 6.4rem;
  width: 100%;
  align-items: center;
  background: #f7f7f7;
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
  max-width: 119rem;
  width: 100%;
  padding: 14rem 0;
  padding-top: 18rem;
`

const ProjectHeaderTitle = styled.h1`
  font-size: 5.4rem;
  font-weight:500;
  margin:0;
  max-width: 74.9rem;
`

const ProjectHeaderImage = styled.img`
  width: 100%;
  margin-top: -9.6rem;
`

const ProjectHeaderImageWrapper = styled.div`
  display: flex;
  max-width: 130rem;
  width:100%;
`




const ProjectHeader = ({ projectName, projectTitle, projectImage }) => (
  <ProjectHeaderWrapper>
    <ProjectHeaderContainer>
      <TextContainer>
        <ProjectHeaderTitle>{`${projectName} — ${projectTitle}`}</ProjectHeaderTitle>
      </TextContainer>
    </ProjectHeaderContainer>

    <ProjectHeaderImageWrapper>
      <ProjectHeaderImage src={projectImage} />
    </ProjectHeaderImageWrapper>
  </ProjectHeaderWrapper>
)

export default ProjectHeader
