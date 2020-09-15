import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { breakpoint } from "../mixins/breakpoint"

const LinkBlockWrapper = styled.div`
 display: flex;
 flex-direction: column;
 max-width: 42rem;
`

const LinkBlockTitle = styled.h3`
  font-size: 3.2rem;
  color: #f7f7f7;
  font-weight: 300;
  margin: 0;
  margin-bottom: 0.8rem;

  ${breakpoint.phone`
    font-size: 2.8rem;
  `}
`
const LinkBlockText = styled.span`
  font-size: 1.8rem;
  color: #f7f7f7;
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.6rem;
  line-height: 145.6%;

  ${breakpoint.phone`
    font-size: 1.8rem;
    line-height: 145%;
  `}
`

const LinkBlockRedirect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #f7f7f7;
  border-bottom: 1px solid #f7f7f7;
  cursor: pointer;
  transition: opacity ease 350ms;

  span {
    padding-bottom: 1.2rem;
    font-size: 2rem;
    font-weight: 300;

    ${breakpoint.phone`
      padding-bottom: 0.8rem;
    `}
  }

  svg {
    width: 2.4rem;
    transition: transform ease 350ms;
  }

  &:hover {
    opacity: 0.8;
    svg {
      transform: translateX(15px);
    }
  }
`

const LinkBlock = ({ title, text, link }) => (
  <LinkBlockWrapper className="LinkBlock">
    <LinkBlockTitle> {title} </LinkBlockTitle>
    <LinkBlockText>{text}</LinkBlockText>
    <Link to={link}>
      <LinkBlockRedirect>
        <span>Read more</span>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 15">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5.3a1 1 0 011.5 0l6.4 6.4a1 1 0 010 1.6L19 14.7a1 1 0 01-1.8-.8c0-.3.1-.5.3-.7l5.6-5.7-5.6-5.7a1 1 0 010-1.5z"
            fill="#F7F7F7"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.1 7.5a1 1 0 011-1h22.5a1 1 0 011 1 1 1 0 01-1 1H1.2a1 1 0 01-1-1z"
            fill="#F7F7F7"
          />
        </svg>
      </LinkBlockRedirect>
    </Link>
  </LinkBlockWrapper>
)

export default LinkBlock;
