import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import TransitionLink from "gatsby-plugin-transition-link"
import { breakpoint, variables } from "../mixins/breakpoint"
import { useSprings, useTransition, interpolate, animated, useSpring } from 'react-spring';
import { Bubble } from './Bubble';

const ProjectData = [
  {
    title: "Master Digital Design",
    subTitle: "Alumnipage good enough for design students.",
    image:
      "https://williammartinsson.com/static/06ccbc3611ff4ef1a5001ce79bc222b8/5e592/3e9c83b6-3548-4304-983f-9324da792959_MDDLandingpage.png",
  },
  {
    title: "Knodd",
    subTitle: "Using Gatsby to create an SEO-optimized website.",
    image:
      "https://williammartinsson.com/static/270ee8579cdd7cccc528639592ede241/a0891/011062d2-89a5-4b73-973c-e3619d7756b2_KnoddLandingPageMockup.webp",
  },
  {
    title: "KNVB",
    subTitle: "The next generation training platform for football teams.",
    image:
      "https://williammartinsson.com/static/be276d5718b759fe90c5a508e5b64d0c/a0891/969fc8dd-640e-44d4-b7ac-6f7fd22fb2f8_KNVB%2BMOCKUP.webp",
  },
  {
    title: "Agenly",
    subTitle: "Building a product from a blank sheet.",
    image:
      "https://williammartinsson.com/static/88e506fb2c614972a784d1216d1a1bcd/a0891/46b95005-6cc1-4cda-a23d-0a1337f358f2_AgenlyMarketingLanding.webp",
  },
]


const ProjectSliderWrapper = styled.section`
  width: 100%;
  height: 45vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  left:0;
  right: 0;
  /* overflow: hidden; */
`

const ProjectSliderItem = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0rem 1.6rem;

  ${breakpoint.tabPort`
    padding: 0rem 10rem;
  `}

  &:hover {
    cursor: pointer;
    h1 {
      &:before {
        width: 100%;
      }
    }
  }
`

const SlideImageUp = keyframes`
  from {transform: translateY(50vh) scale(1.3)}
  to {transform: translateY(0) scale(1)}
`

const SlideImageDown = keyframes`
  from {transform: translateY(-50vh) scale(1.3)}
  to {transform: translateY(0) scale(1)}
`

const ProjectImage = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5) ), url(${props => props.image});
  background-size: cover;
  background-position: 50%, 50%;
  /* transition: ease 450ms all; */
  /* transform: translateY(0); */
  /* animation: ${props => props.active ? props.forwards ?  css`450ms ease ${SlideImageUp} forwards`  :  css`450ms ease ${SlideImageDown} forwards` : 'none' }; */
  &.go_up{
    animation: 750ms ease ${SlideImageUp} forwards;
  }
  &.go_down{
    animation: 750ms ease ${SlideImageDown} forwards;
  }
` 

const SlideTitleUp = keyframes`
  from {transform: translateY(10vh); opacity: 0}
  to {transform: translateY(0); opacity: 1}
`

const SlideTitleDown = keyframes`
  from {transform: translateY(-10vh); opacity: 0}
  to {transform: translateY(0); opacity: 1}
`

const ProjectTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 400;
  color: white;
  z-index: 100;
  text-align: left;
  width: 100%;
  /* opacity: 0; */

  ${breakpoint.tabPort`
    margin-bottom: 0.6rem;
    margin-top: -2.5vh;
    text-align: left;
    font-style: italic;
    font-size: 6.4rem;
    width: fit-content;
  `}

  &:before {
    border-bottom: 3px solid #fff;
    content: "";
    display: block;
    position: absolute;
    bottom: 1px;
    width: 0;
    transition: width 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  &.go_up {
    animation: 450ms ease ${SlideTitleUp} forwards;
    animation-delay: 400ms;
    opacity: 0;
    &:after {
      opacity: 0;
      border-bottom: none;
    }
  }
  &.go_down {
    animation: 450ms ease ${SlideTitleDown} forwards;
    animation-delay: 400ms;
    opacity: 0;
    &:after {
      border-bottom: none;
    }
  }
`

const ProjectSubtitle = styled.span`
  font-size: 2.4rem;
  font-weight: 300;
  color: white;
  z-index: 100;
  /* opacity: 0; */

  ${breakpoint.tabPort`
    font-size: 3.2rem;
  `}

  &.go_up {
    animation: 450ms ease ${SlideTitleUp} forwards;
    animation-delay: 400ms;
    opacity: 0;
  }
  &.go_down {
    animation: 450ms ease ${SlideTitleDown} forwards;
    animation-delay: 400ms;
    opacity: 0;
  }
`

const BubbleContainer = styled.div`
  display: none;
  
  ${breakpoint.tabPort`
    display: block;
  `}
`

const ProjectSlider = ({projects}) => {
  const [currentSlide, setCurrentSlide] = useState(null)
  const [wheel, setWheel] = useState()
  const [scrollActive, setScrollActive] = useState(true)
  const [scrollDirectionForwards, setScrollDirectonForwards] = useState(true)
  const [items, setItems] = useState(ProjectData)

  useEffect(() => {
    document.addEventListener("wheel", (wheel) => {
      setWheel(wheel)
    })
    setTimeout(() => {
      setCurrentSlide(0)
    }, 900)
  }, [])

  useEffect(() => {
    let forwards
    if(wheel !== undefined){
      wheel.deltaY > 0 ? (forwards = true) : (forwards = false)
      changeSlide(forwards)
    }
  }, [wheel])

  const slideInCard = useSpring({config: {friction: 35}, from: {height: '0%', transform: 'scale(1.3)'}, to:{height: '100%', transform: 'scale(1)'}, delay: 500})
  const slideBubble = useSpring({config: {friction: 10, tension: 400}, from: {transform: 'scale(0)'}, to:{ transform: 'scale(1)'}, delay: 1300})
  


   const changeSlide = (forwards) => {
    if(scrollActive){
      setScrollDirectonForwards(forwards)
      setScrollActive(false)

      setTimeout(() => {
         setScrollActive(true)
      }, 1000)


      if(forwards) {
        setCurrentSlide(currentSlide !== 3 ? currentSlide + 1 : 0)
      } else {
        setCurrentSlide(currentSlide !== 0 ? currentSlide - 1 : 3)
      }
    }
  }

  let lastSlide

  return (
    <ProjectSliderWrapper>
      {/* {springs.map(({transform, zIndex}, index) => {
        return (
        <ProjectSliderItem key={index} style={{transform, zIndex}}>
          <ProjectTitle >{ProjectData[index].title}</ProjectTitle>
          <ProjectSubtitle >{ProjectData[index].subTitle}</ProjectSubtitle>
          <ProjectImage image={ProjectData[index].image} forwards={scrollDirectionForwards} />
          <div style={{position: "absolute", width: '100%', height: '100%', background: 'black', opacity: 0.3, marginLeft: '-10rem' }}></div>
        </ProjectSliderItem>
        )
      })} */}
      <BubbleContainer>
        <Bubble
          style={{
            position: "absolute",
            top: "-6vh",
            right: "10rem",
            height: "11.4rem",
            width: "11.4rem",
            ...slideBubble,
          }}
          onClick={() => {
            setScrollDirectonForwards(true)
            setCurrentSlide(currentSlide !== 3 ? currentSlide + 1 : 0)
          }}
        >
          {" "}
          Scroll{" "}
        </Bubble>
      </BubbleContainer>
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        {projects.map((item, index) => {
          let active
          index === currentSlide ? (active = true) : (active = false)
          if (index === 0)
            !scrollDirectionForwards
              ? currentSlide === 3
                ? (lastSlide = true)
                : (lastSlide = false)
              : currentSlide === 1
              ? (lastSlide = true)
              : (lastSlide = false)
          if (index === 1)
            !scrollDirectionForwards
              ? currentSlide === 0
                ? (lastSlide = true)
                : (lastSlide = false)
              : currentSlide === 2
              ? (lastSlide = true)
              : (lastSlide = false)
          if (index === 2)
            !scrollDirectionForwards
              ? currentSlide === 1
                ? (lastSlide = true)
                : (lastSlide = false)
              : currentSlide === 3
              ? (lastSlide = true)
              : (lastSlide = false)
          if (index === 3)
            !scrollDirectionForwards
              ? currentSlide === 2
                ? (lastSlide = true)
                : (lastSlide = false)
              : currentSlide === 0
              ? (lastSlide = true)
              : (lastSlide = false)

          const title = item.node.data.title.text
          const name = item.node.data.project_name.text
          const tags = item.node.data.category.text
          const image = item.node.data.hero_image.url
          const link = item.node.uid

          return (
            <TransitionLink
              to={`/projects/${link}`}
              exit={{ length: 0.5 }}
              entry={{ length: 0.5, delay: 0.5 }}
            >
              <ProjectSliderItem
                style={
                  active
                    ? { zIndex: 100 }
                    : lastSlide
                    ? { zIndex: 80 }
                    : { zIndex: 0 }
                }
              >
                <ProjectTitle
                  className={
                    ("Project_Title",
                    active
                      ? scrollDirectionForwards
                        ? "go_up"
                        : "go_down"
                      : "")
                  }
                >
                  {name}
                </ProjectTitle>
                <ProjectSubtitle
                  className={
                    active
                      ? scrollDirectionForwards
                        ? "go_up"
                        : "go_down"
                      : ""
                  }
                >
                  {title}
                </ProjectSubtitle>
                <ProjectImage
                  style={slideInCard}
                  image={image}
                  forwards={scrollDirectionForwards}
                  className={
                    active
                      ? scrollDirectionForwards
                        ? "go_up"
                        : "go_down"
                      : ""
                  }
                />
                {/* <div style={{position: "absolute", width: '100%', height: '100%', background: 'black', opacity: 0.3, marginLeft: '-10rem' }}></div> */}
              </ProjectSliderItem>
            </TransitionLink>
          )
        })}
      </div>
    </ProjectSliderWrapper>
  )
}

export default ProjectSlider;