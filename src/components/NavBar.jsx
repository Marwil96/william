// import { Link } from 'gatsby';
import React, { useState } from 'react';
import TransitionLink from "gatsby-plugin-transition-link"
import styled from 'styled-components';
import { breakpoint } from "../mixins/breakpoint"
import MobileMenu from './MobileMenu';
import { colors } from "../mixins/colors"

const NavBarWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2.4rem 1.6rem 0rem 1.6rem;
  position: absolute;
  z-index: 10000;

  a {
    display: inline-block;

    &:hover {
      color: ${colors.orange};
    }
  }

  ${breakpoint.tabPort`
    padding: 4.6rem 10rem 0rem 10rem;
  `}

  svg {
    width: 2.2rem;
    height: 2.2rem;

    display: block;

    ${breakpoint.tabPort`
      display: none;
    `}
  }
  .navlinks_desktop {
    display: none;

    ${breakpoint.tabPort`
      display: block;
    `}
  }
`

const NavBarTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 400;

  ${breakpoint.tabPort`
    font-size: 2.4rem;
  `}
`
const NavBarLink = styled.span`
  font-weight: 300;
  margin-left: 3.2rem;
  font-size: 2.4rem;
`


const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <NavBarWrapper>
      <TransitionLink
        to="/"
        exit={{
          length: 0.5,
        }}
        entry={{
          length: 0.5,
          delay: 0.5,
        }}
      >
        <NavBarTitle>William Martinsson</NavBarTitle>
      </TransitionLink>
      <div className="navlinks_desktop">
        <TransitionLink
          to="/work"
          exit={{
            length: 0.5,
          }}
          entry={{
            length: 0.5,
            delay: 0.5,
          }}
        >
          <NavBarLink>All Projects</NavBarLink>
        </TransitionLink>
        <TransitionLink
          to="/writings"
          exit={{
            length: 0.5,
          }}
          entry={{
            length: 0.5,
            delay: 0.5,
          }}
        >
          <NavBarLink>Writings</NavBarLink>
        </TransitionLink>
        <TransitionLink
          to="/about"
          exit={{
            length: 0.5,
          }}
          entry={{
            length: 0.5,
            delay: 0.5,
          }}
        >
          <NavBarLink>About</NavBarLink>
        </TransitionLink>
        <TransitionLink
          to="/contact"
          exit={{
            length: 0.5,
          }}
          entry={{
            length: 0.5,
            delay: 0.5,
          }}
        >
          <NavBarLink>Contact</NavBarLink>
        </TransitionLink>
      </div>

      <svg
        onClick={() => setMenuActive(true)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 12"
      >
        <path
          d="M0 11h16M0 1h16H0zm0 5h16H0z"
          stroke="#333"
          strokeWidth="1.4"
          strokeMiterlimit="10"
        />
      </svg>
      <MobileMenu menuActive={menuActive} closeMenu={setMenuActive} />
    </NavBarWrapper>
  )
}

export default NavBar;