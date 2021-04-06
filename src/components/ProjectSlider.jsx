import React, { useState, useEffect } from "react"
import styled, { css, keyframes } from "styled-components"
import TransitionLink from "gatsby-plugin-transition-link"
import { breakpoint } from "../mixins/breakpoint"
import { animated, useSpring } from "react-spring"
import { Bubble } from "./Bubble"

const ProjectSliderWrapper = styled.section`
  width: 100%;
  height: 45vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  /* overflow: hidden; */
  ${breakpoint.tabPort`
    height: 45vh;
  `}
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
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
    url(${props => props.image});
  background-size: cover;
  background-position: 50%, 50%;
  /* transition: ease 450ms all; */
  /* transform: translateY(0); */
  /* animation: ${props =>
    props.active
      ? props.forwards
        ? css`450ms ease ${SlideImageUp} forwards`
        : css`450ms ease ${SlideImageDown} forwards`
      : "none"}; */
  &.go_up {
    animation: 750ms ease ${SlideImageUp} forwards;
  }
  &.go_down {
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
  font-size: ${props => (props.longWord ? "13vw" : "16vw")};
  font-weight: 400;
  color: white;
  z-index: 100;
  width: 100%;
  line-height: 110%;
  margin-bottom: 0.2rem;
  text-align: center;
  font-family: "fraunces";
  /* text-shadow: 1px 1px 30px black; */
  ${breakpoint.tabPort`
    margin-top: -2.5vh;
    font-size: 10rem;
    width: fit-content;
    text-align: left;
    
     &:before {
      border-bottom: 3px solid #fff;
      content: "";
      display: block;
      position: absolute;
      bottom: 1px;
      width: 0;
      transition: width 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  `}
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
  /* display: none; */
  button {
    top: -4.3vh !important;
    right: 1.6rem !important;
    height: 6.4rem !important;
    width: 6.4rem !important;
  }
  ${breakpoint.tabPort`
    button {
      right: 10rem !important;
      height: 11.4rem !important;
      width: 11.4rem !important;
      top: -6vh !important;
    }
  `}
`

const ProjectSlider = ({ projects }) => {
  const [currentSlide, setCurrentSlide] = useState(null)
  const [wheel, setWheel] = useState()
  const [scrollActive, setScrollActive] = useState(true)
  const [scrollDirectionForwards, setScrollDirectonForwards] = useState(true)

  useEffect(() => {
    document.addEventListener("wheel", wheel => {
      setWheel(wheel)
    })

    const slider = document.getElementsByClassName("project_slider")[0]
    if (window.innerWidth < 800) {
      slider.addEventListener("scroll", wheel => {
        setWheel(wheel)
      })

      slider.addEventListener("touchmove", wheel => {
        setWheel(wheel)
      })
    }

    setTimeout(() => {
      setCurrentSlide(0)
    }, 900)
  }, [])

  useEffect(() => {
    let forwards
    if (wheel !== undefined) {
      if (wheel.type === "touchmove") {
        forwards = false
      } else {
        wheel.deltaY > 0 ? (forwards = true) : (forwards = false)
      }
      changeSlide(forwards)
    }
  }, [wheel])

  const slideInCard = useSpring({
    config: { friction: 35 },
    from: { height: "0%", transform: "scale(1.3)" },
    to: { height: "100%", transform: "scale(1)" },
    delay: 500,
  })
  const slideBubble = useSpring({
    config: { friction: 10, tension: 400 },
    from: { transform: "scale(0)" },
    to: { transform: "scale(1)" },
    delay: 1300,
  })

  const changeSlide = forwards => {
    if (scrollActive) {
      setScrollDirectonForwards(forwards)
      setScrollActive(false)

      setTimeout(() => {
        setScrollActive(true)
      }, 1000)

      if (forwards) {
        setCurrentSlide(currentSlide !== 4 ? currentSlide + 1 : 0)
      } else {
        setCurrentSlide(currentSlide !== 0 ? currentSlide - 1 : 4)
      }
    }
  }

  let lastSlide

  return (
    <ProjectSliderWrapper className="project_slider">
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
            setCurrentSlide(currentSlide !== 4 ? currentSlide + 1 : 0)
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
          if (index === 4)
            !scrollDirectionForwards
              ? currentSlide === 3
                ? (lastSlide = true)
                : (lastSlide = false)
              : currentSlide === 0
              ? (lastSlide = true)
              : (lastSlide = false)

          const title = item.node.data.title.text
          const name = item.node.data.project_name.text
          // const tags = item.node.data.category.text
          const image = item.node.data.hero_image.localFile.publicURL
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
                  longWord={name.split(" ")[0].length > 10}
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
                {/* <ProjectSubtitle
                  className={
                    active
                      ? scrollDirectionForwards
                        ? "go_up"
                        : "go_down"
                      : ""
                  }
                >
                  {title}
                </ProjectSubtitle> */}
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

export default ProjectSlider
