import React from "react"
import { breakpoint, variables } from "../mixins/breakpoint"
import parse from 'html-react-parser';
import styled from "styled-components"

const RichTextWrapper = styled.section`
  width: 100%;
  max-width: ${variables.maxWidth};
  line-height: 130%;

  ${breakpoint.laptop`
    max-width: ${variables.maxWidthLaptop};
  `}

  ${breakpoint.tabPort`
    padding: 0 1.6rem;
    width: calc(100% - 3.2rem);
  `}

  h5,h4,h3,h1,h2 {
    color: #333;
    font-size: 2.4rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
    line-height: 150%;
    max-width: 86rem;
  }

  h1 {
    font-size: 3.2rem;
    font-weight: 600;
  }

  strong {
    font-weight: 600;
  }

  li {
    margin-bottom: 1rem;
    line-height: 150%;
    max-width: 86rem;
  }

  p {
    margin-bottom: 4.8rem;
    line-height: 150%;
    font-size: 2rem;
    max-width: 86rem;
  }

  ul {
    padding: 2.4rem;
    padding-top: 0;
  }
`

const RichText = ({ content }) => (
  <RichTextWrapper>
    {parse(content)}
  </RichTextWrapper>
)

export default RichText
