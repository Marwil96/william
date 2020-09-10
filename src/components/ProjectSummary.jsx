import React from "react"
import styled from "styled-components"
import Button from "./Button"
import SummaryRow from "./SummaryRow"

const ProjectSummaryWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10rem;
`

const ProjectSummaryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 119rem;

  .column {
    display: flex;
    flex-direction: column;
    max-width: 42rem;
    width: 100%;
  }
`
const Introduction = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 0.6rem;
`

const IntroductionText = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: #6f6f6f;
  line-height: 133%;
  margin-bottom: 2.4rem;
  font-family: Inter;
`

const ProjectSummary = ({ summaryArray, summaryIntro, linkToWebsite }) => (
  <ProjectSummaryWrapper>
    <ProjectSummaryContainer>
      <div className="column">
        <Introduction>Introduction</Introduction>
        <IntroductionText>{summaryIntro}</IntroductionText>
        <a target="__blank" href={linkToWebsite}>
          <Button>
            Go to website
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2 5.2a.9.9 0 01.9-.9h7.3a.9.9 0 01.9.9v7.3a.9.9 0 01-1.7 0V6H11a.9.9 0 01-1-.8z"
                fill="#fff"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.3 19.3a.9.9 0 010-1.2L17.2 5a.9.9 0 111.2 1.3L5.5 19.3a.9.9 0 01-1.2 0z"
                fill="#fff"
              />
            </svg>
          </Button>
        </a>
      </div>

      <div className="column">
        {summaryArray.map((summary, index) => (
          <SummaryRow 
            key={index}
            summaryTitle={summary.summary_title.text} 
            summaryValue={summary.summary_value.text}
          />
        ))}
      </div>
    </ProjectSummaryContainer>
  </ProjectSummaryWrapper>
)

export default ProjectSummary
