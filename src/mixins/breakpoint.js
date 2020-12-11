import { css } from "styled-components"

export const variables = {
  phone: "37.5em",
  tabPort: "56.25em",
  tabLand: "75em",
  laptop: "85em",
  desktop: "112.5em",
  overMax: "1050px",
  maxWidth: "119rem",
  maxWidthLaptop: "110rem"
}


export const breakpoint = Object.keys(variables).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${variables[label]}) {
        ${css(...args)};
      }
    `
    return accumulator
  },
  {}
)
