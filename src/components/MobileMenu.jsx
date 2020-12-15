import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { breakpoint } from "../mixins/breakpoint"

const MobileMenuWrapper = styled.section`
  width: 100%;
  position: fixed;
  height: 100%;
  background: #000;
  z-index: 1000;
  bottom: 0;
  left: 0;
  padding: 3.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateX(100%);
  transition: transform ease 450ms;
  display: flex;

  ${breakpoint.tabPort`
    display:none;
  `}

  &.is-active {
    transform: translateX(0);

    span {
      transform: translateY(0);
      opacity: 1;

      &:after {
        width: 100%;
        transition-delay: 600ms;
        transition: width 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }
`

const MobileLink = styled.span`
  font-size: 4.2rem;
  margin-bottom: 2.4rem;
  width: fit-content;
  transition: ease 450ms all;
  transition-delay: 450ms;
  color: #fff;
  font-weight: 300;
  transform: translateY(5rem);
  opacity: 0;
  &:nth-child(2) {
    transition-delay: 650ms;
  }
  &:nth-child(3) {
    transition-delay: 750ms;
  }
  &:nth-child(4) {
    transition-delay: 850ms;
  }
  &:nth-child(5) {
    transition-delay: 950ms;
  }
  &:after {
    content: "";
    display: block;
    border-bottom: 1px solid #fff;
    /* position: absolute; */
    left: 0.1875rem;
    bottom: 0.75rem;
    width: 0%;
  }
`

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  h3 {
    font-size: 2.4rem;
  }
  svg {
    width: 1.6rem;
    opacity: 1;
  }
`

const MobileMenu = ({ menuActive, closeMenu }) => {
  return (
    <MobileMenuWrapper className={menuActive ? "is-active" : ""}>
      <MobileMenuHeader>
        <svg
          onClick={() => closeMenu(false)}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
        >
          <path
            d="M13 1L1 13"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
          <path
            d="M1 1l12 12"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeLinecap="square"
          />
        </svg>
      </MobileMenuHeader>
      <LinkContainer>
        <MobileLink>
          <Link to="/">Home</Link>
        </MobileLink>
        <MobileLink>
          <Link to="/about">About</Link>
        </MobileLink>
        <MobileLink>
          <Link to="/work">Work</Link>
        </MobileLink>
        <MobileLink>
          <Link to="/writings">Writings</Link>
        </MobileLink>
        <MobileLink>
          <Link to="/contact">Contact</Link>
        </MobileLink>
      </LinkContainer>
    </MobileMenuWrapper>
  )
}

export default MobileMenu
