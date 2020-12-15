import React from "react"
import { breakpoint } from "../mixins/breakpoint"
import parse from "html-react-parser"
import styled from "styled-components"

const RichTextWrapper = styled.section`
  width: 100%;
  line-height: 130%;
  grid-column: span 12;

  ${breakpoint.tabPort`
    grid-column-start: 3;
    grid-column-end: 11;
  `}

  h5,h4,h3,h1,h2 {
    margin-bottom: 0.6rem;
    line-height: 150%;
    font-weight: 500;
    font-size: 2.4rem;

    ${breakpoint.tabPort`
      font-size: 2.4rem;
      margin-bottom: 1.6rem;
    `}
  }

  h1 {
    font-size: 1.6rem;
    font-style: italic;
    font-weight: 400;
    margin-bottom: 1.2rem;
    text-transform: uppercase;
    color: #464646;
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
    margin-bottom: 2.4rem;
    line-height: 32px;
    font-size: 1.8rem;
    font-weight: 300;

    ${breakpoint.tabPort`
      line-height: 40px;
      font-size: 2.4rem;
      margin-bottom: 4.8rem;
    `}

    img {
      width: 100%;
    }
  }

  ul {
    padding: 2.4rem;
    padding-top: 0;
  }
  iframe {
    width: 100%;

    ${breakpoint.tabPort`
      min-height: 32vw;
    `}
  }
`

const RichText = ({ content }) => (
  <RichTextWrapper>{parse(content)}</RichTextWrapper>
)

export default RichText
