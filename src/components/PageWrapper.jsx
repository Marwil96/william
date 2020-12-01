import React from 'react';
import styled, { keyframes } from "styled-components"

const OuterWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: white;
  box-sizing: border-box;
  /* border: 10px solid black; */
`

const InnerWrapper = styled.section`
  /* width: 100%; */
  height: 100%;
  background-color: #e34d50;
  box-sizing: border-box;
  padding: 0.8vw;
`

const BorderOuter = styled.div`
  /* z-index: 10; */
  display: flex;
  border: 0.8vw solid #000;
  border-width: 0.8vw;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`
const BorderInner = styled.div`
  /* z-index: 8; */
  pointer-events: none;
  display: flex;
  border: 0.8vw solid #000;
  border-radius: 2vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const noiseAni = keyframes`
  0% { background-position: 0%, 0%; },
  10% { background-position: -5%, -10%; },
  20% { background-position: -15%, 5%; },
  30% { background-position: 7%, -25%; },
  40% { background-position: 20%, 25%; },
  50% { background-position: -25%, 10%; },
  60% { background-position: 15%, 5%; },
  70% { background-position: 0%, 15%; },
  80% { background-position: 25%, 35%; },
  90% { background-position: -10%, 10%; },
  100% { background-position: 0%, 0%; }
`

const Noise = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.35;
  pointer-events: none;
  z-index: 100;

  &:before {
    content: "";
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("http://localhost:8000/static/noise-web-302e84290552ee6d40e02d5821b9d44b.webp");
    -webkit-animation: 90ms infinite ${noiseAni};
    animation: 90ms infinite ${noiseAni};
    pointer-events: none;
  }
`

const PageWrapper = ({ children }) => (
  <OuterWrapper>
    <Noise />
    <BorderInner />
    <BorderOuter />
    <InnerWrapper>{children}</InnerWrapper>
  </OuterWrapper>
)

export default PageWrapper;