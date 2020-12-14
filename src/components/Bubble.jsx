import { animated } from "react-spring";
import styled from "styled-components";
import { breakpoint, variables } from "../mixins/breakpoint"
import { colors } from "../mixins/colors";

export const Bubble = styled(animated.button)`
  position: absolute;
  top: -6vh;
  right: 1.6rem;
  height: 8rem;
  width: 8rem;
  font-size: 1.6rem;
  padding: 1rem;
  top: -6vh;
  right: 1.6rem;

  border-radius: 100%;
  background-color: ${colors.orange};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  font-weight: 500;
  color: white;
  z-index: 150;
  cursor: pointer;
  transition: background-color 0.5s ease, transform 0.45s cubic-bezier(0.17, 0.67, 0.3, 1.33);
  /* display: none; */
  ${breakpoint.tabPort`    
    top: -8vh;
    right: 10rem;
    height: 15.8rem;
    width: 15.8rem;
    font-size: 2.4rem;
    padding: 1rem;
  `}

  &:hover {
    transform: scale(1.2) !important;
  }
`
