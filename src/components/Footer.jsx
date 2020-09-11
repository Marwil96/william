import React from "react"
import { breakpoint } from "../mixins/breakpoint"
import { Link } from "gatsby"
import styled from "styled-components"

const FooterWrapper = styled.footer`
  width: 100%;
  background: #000000;
  padding-top: 6.4rem;
  padding-bottom: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f7f7f7;

  h3 {
    font-size: 6.4rem;
    font-weight: 300;
    text-align: center;
    margin-bottom: 6.4rem;
    border-bottom: 3px solid #f7f7f7;
    cursor: pointer;

    ${breakpoint.tab` 
      font-size: 4.2rem;
      border-bottom: 2px solid #f7f7f7;
      margin-bottom: 4.8rem;
  `}
  }
`

const SocialContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  a {
    font-size: 2.4rem;
    margin-right: 3.2rem;
    border-bottom: 1px solid #f7f7f7;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
  }
`

const Footer = ({ background, children }) => (
  <FooterWrapper>
    <Link to="/contact">
      <h3>Let’s work together</h3>
    </Link>
    <SocialContainer>
      <a href='https://www.linkedin.com/in/william-martinsson-a24a3b111/'>Linkedin</a>
      <a href='https://github.com/Marwil96'>Github</a>
      <a href='https://medium.com/@marwil1996'>Medium</a>
    </SocialContainer>
  </FooterWrapper>
)

export default Footer
