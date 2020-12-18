import React from 'react';
import { animated, useSpring, useSprings } from 'react-spring';
import styled from 'styled-components';
import { breakpoint } from "../mixins/breakpoint"

const ProjectHeaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2.4rem;
  padding-top: 3.2rem;

  ${breakpoint.tabPort`
    margin-bottom: 6.4rem;
    padding-top: 0;
  `}
`
const ProjectName = styled(animated.h1)`
  font-weight: 400;
  font-size: 48px;
  margin-bottom: 1.6rem;
  margin-left: -2px;
  text-align: left;
  word-break: break-all;
  word-break: break-all;

  ${breakpoint.tabPort`
    font-size: 7vw;
    margin-bottom: 3.2rem;
    margin-left: -6px;
  `}
`

const ProjectMetaContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3.2rem; */
`

const MetaItem = styled(animated.div)`
  display: flex;
  flex-direction: column;
  /* grid-column: span 3; */
  margin-right: 1.7rem;
  margin-bottom: 2.4rem;

  span {
    font-size: 1.6rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 400;
  }

  ${breakpoint.tabPort`
    margin-right: 6.4rem;
    margin-bottom: 0;

    span {
      font-size: 1.8rem;
      font-style: italic;
      margin-bottom: 0.8rem;
    }

    h3 {
      font-size: 2rem;
      max-width: 50rem;
    }
  `}
`

const ProjectHeader = ({style, name, metaData}) => {
  const slideName = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 500})
  // const slideMetaItems = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 700})
  const slideMetaItems = useSprings(metaData.length, metaData.map((item, index) => ({config: {friction: 25}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay:( 1000 + (300 * index)) })))
  return (
    <ProjectHeaderWrapper style={style}>
      <ProjectName style={slideName}> {name}</ProjectName>
      <ProjectMetaContainer>
        {slideMetaItems.map((style, index) => {
          return (
            <MetaItem style={style}>
              <span>{metaData[index].summary_title.text}</span>
              <h3>{metaData[index].summary_value.text}</h3>
            </MetaItem>
          )
        })}
      </ProjectMetaContainer>
    </ProjectHeaderWrapper>
  )
}

export default ProjectHeader;