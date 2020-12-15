import React from 'react';
import styled from "styled-components"
import { breakpoint } from "../mixins/breakpoint"
import NavBar from './NavBar';
import { animated } from "react-spring"
import SEO from './SEO';

const OuterWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background-color: white;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  /* border: 10px solid black; */
  /* overscroll-behavior: 'contain'; */
`

const InnerWrapper = styled(animated.section)`
  /* width: 100%; */
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1.6rem;
  padding: 5rem 1.6rem 0rem 1.6rem;
  transition: opacity 500ms ease;

  ${breakpoint.tabPort`
      padding: 16.4rem 10rem 0rem 10rem;
      grid-column-gap: 3.2rem;
  `}
`

// const noiseAni = keyframes`
//   0% { background-position: 0%, 0%; },
//   10% { background-position: -5%, -10%; },
//   20% { background-position: -15%, 5%; },
//   30% { background-position: 7%, -25%; },
//   40% { background-position: 20%, 25%; },
//   50% { background-position: -25%, 10%; },
//   60% { background-position: 15%, 5%; },
//   70% { background-position: 0%, 15%; },
//   80% { background-position: 25%, 35%; },
//   90% { background-position: -10%, 10%; },
//   100% { background-position: 0%, 0%; }
// `

// const Noise = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   opacity: 0.15;
//   pointer-events: none;
//   z-index: 1000;

//   &:before {
//     content: "";
//     z-index: 999;
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: url("http://localhost:8000/static/302e84290552ee6d40e02d5821b9d44b/fc32b/noise-web.webp");
//     -webkit-animation: 90ms infinite ${noiseAni};
//     animation: 90ms infinite ${noiseAni};
//     pointer-events: none;
//   }
// `


const PageWrapper = ({ children, location, style, outerWrapperStyle, transitionActive }) => {
  // const [props, set, stop] = useSpring(() => ({config: { duration: 250 }, opacity: transitionActive ? 0 : 1 }))
  
  return (
    <OuterWrapper style={{...outerWrapperStyle}}>
      {/* <Noise /> */}
      <SEO
        title="William Martinsson - Digital Designer - Frontend Developer"
        description="Hey, I'm William Martinsson. I'm a creator of websites, apps, and digital products. Sometimes I develop them other times I design them but usually, I do both. Currently freelancing from my home in the middle of Sweden."
      />
      <NavBar />
      <InnerWrapper style={{ opacity:  transitionActive === 'entering' ||  transitionActive === 'exiting' ? 0 : 1, ...style }}>{children}</InnerWrapper>
    </OuterWrapper>
  )
}

export default PageWrapper;