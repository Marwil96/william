import React from "react"
import styled from "styled-components"
import { breakpoint } from "../mixins/breakpoint"

const SummaryRowWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-weight: 500;
    margin: 0;
    margin-bottom: 0.6rem;
    font-size: 2rem;
  }

  span {
    color: #6f6f6f;
    font-weight: 400;
    font-size: 2rem;
    
    ${breakpoint.phone`
      font-size: 1.8rem;
    `}
  }
`
const SummaryRow = ({ summaryTitle, summaryValue }) => (
  <SummaryRowWrapper>
    <h3>{summaryTitle}</h3>
    <span>{summaryValue}</span>
  </SummaryRowWrapper>
)

export default SummaryRow;
