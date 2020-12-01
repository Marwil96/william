import React from 'react'
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
 0% {transform: translateY(300px);  opacity: 0},
 100% {transform: translateY(0);  opacity: 1}
`

const slideOut = keyframes`
 100% {transform: translateY(-300px); opacity: 0},
 0% {transform: translateY(0);  opacity: 1}
`

const ProjectNameText = styled.h2`
  font-size: 15vw;
  color: white;
  width: 100%;
  position: absolute;
  transition: all ease 450ms;

  &.active {
    /* transform: translateY(0); */
    animation: 450ms forwards ${slideIn};
  }

  &.unactive {
    /* transform: translateY(-300px); */
    animation: 450ms forwards ${slideOut};
  }
`
const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  overflow: hidden;
  position: absolute;
`
const ProjectNameWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
  pointer-events: none;
  z-index: 10000;
`

const ProjectName = ({selectedCase}) => {
  const items = ['Knodd', 'Agenly', 'KNVB', 'MDD', 'ReceptSamlingen']
  return (
    <ProjectNameWrapper>
      <TextWrapper style={{ overflow: "hidden" }}>
        {/* {items.map((item) => {
          <ProjectName className={items[selectedCase] === 'Knodd' && 'active'}>{item}</ProjectName>
        })} */}
        <ProjectNameText className={items[selectedCase] === 'Knodd' ? 'active' : 'unactive'}>Knodd</ProjectNameText>
        <ProjectNameText className={items[selectedCase] === 'Agenly' ? 'active' : 'unactive'}>Agenly</ProjectNameText>
        <ProjectNameText className={items[selectedCase] === 'KNVB' ? 'active' : 'unactive'}>KNVB</ProjectNameText>
        <ProjectNameText className={items[selectedCase] === 'MDD' ? 'active' : 'unactive'}>MDD</ProjectNameText>
      </TextWrapper>
    </ProjectNameWrapper>
  )
}

export default ProjectName;