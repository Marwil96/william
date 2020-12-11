import { animated } from "react-spring";
import styled from "styled-components";
import { breakpoint, variables } from "../mixins/breakpoint"
import { colors } from "../mixins/colors";

export const Bubble = styled(animated.button)`
  width: 11.4rem;
  height: 11.4rem;
  border-radius: 100%;
  background-color: ${colors.orange};
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  font-size: 2.4rem;
  font-weight: 500;
  color: white;
  z-index: 150;
  cursor: pointer;
  transition: background-color 0.5s ease,
  transform 0.45s cubic-bezier(0.17, 0.67, 0.3, 1.33);
  display: none;
  ${breakpoint.tabPort`
    display: flex;
  `}

  &:hover {
    transform: scale(1.2)!important;
  }
`
