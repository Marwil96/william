import React from "react"
import parse from 'html-react-parser';
import styled from "styled-components"

const RichTextWrapper = styled.section`
  width: 100%;
  max-width: 119rem;
  line-height: 130%;

  h5,h4,h3,h1,h2 {
    color: #333;
    font-size: 2.4rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
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
