// import { Link } from 'gatsby';
import TransitionLink from "gatsby-plugin-transition-link"
import React from 'react';
import styled from 'styled-components';
import { breakpoint } from "../mixins/breakpoint"

const FooterWrapper = styled.section`
  width: 100%;
  padding-bottom: 6.4rem;
  grid-column: span 12;

  ${breakpoint.tabPort` 
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 3.2rem;
  `}
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
  
  ${breakpoint.tabPort` 
    margin-bottom: 0rem;
  `}

  h1 {
    font-size: 2.4rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
  }

  h3 {
    font-size: 2rem;
    font-weight: 300;
    line-height: 34px;
  }

  a {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 2.4rem;
    text-decoration: underline;
  }
`


const Footer = ({style}) => {
  return (
    <FooterWrapper style={style}>
      <FooterColumn style={{ gridColumn: "span 4" }}>
        <h1>William Martinsson</h1>
        <h3>
          William Martinsson is combo between a Frontend Developer and a Digital
          Designer. Whose passion lies in creating smooth products &
          experiences.
        </h3>
      </FooterColumn>
      <FooterColumn style={{ gridColumn: "span 2" }}>
        <h1>Links</h1>
        <TransitionLink exit={{length: 0.5}} entry={{length: 0.5, delay:0.5}} to='/'>Home</TransitionLink>
        <TransitionLink exit={{length: 0.5}} entry={{length: 0.5, delay:0.5}} to='/about'>About</TransitionLink>
        <TransitionLink exit={{length: 0.5}} entry={{length: 0.5, delay:0.5}} to='/work'>All Projects</TransitionLink>
        <TransitionLink exit={{length: 0.5}} entry={{length: 0.5, delay:0.5}} to='/writings'>Writings</TransitionLink>
        <TransitionLink exit={{length: 0.5}} entry={{length: 0.5, delay:0.5}} to='/contact'>Contact</TransitionLink>
      </FooterColumn>
      <FooterColumn style={{ gridColumn: "span 3" }}>
        <h1>Contact</h1>
        <a href='mailto:hi@williammartinsson.com'>hi@williammartinsson.com</a>
        <a>+46768023804</a>
      </FooterColumn>
      <FooterColumn style={{ gridColumn: "span 3" }}>
        <h1>Socials</h1>
        <a href='https://williammartinsson.medium.com/' target='__blank'>Medium</a>
        <a href='https://github.com/Marwil96' target='__blank'>Github</a>
        <a href='https://www.linkedin.com/in/william-martinsson-a24a3b111/' target='__blank'>Linkedin</a>
      </FooterColumn>
    </FooterWrapper>
  )
}

export default Footer;