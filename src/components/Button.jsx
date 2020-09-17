import React from "react"
import styled from "styled-components"

const ButtonWrapper = styled.button`
  border: 0;
  margin: 0;
  font-family: Inter;
  text-decoration: none;
  padding: 1.4rem 1.6rem;
  border-radius: 0.4rem;
  width: fit-content;
  cursor: pointer;
  background: ${props => (props.background ? props.background : "#000000")};
  color: ${props => (props.color ? props.color : "#F7F7F7")};
  transition: opacity ease 450ms;

  span {
    font-size: 1.8rem;
    font-weight: 500;
    text-decoration: none;
    display: flex;
    align-items: center;

    svg {
      width: 2.4rem;
      margin-left: 0.6rem;
    }
  }

  &:hover {
    opacity: 0.6;
  }
`

const Button = ({background, children}) => (
  <ButtonWrapper>
    <span>{children}</span>
  </ButtonWrapper>
)

export default Button;