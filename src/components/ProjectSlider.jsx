import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Flickity from 'react-flickity-component'
import { useEffect } from 'react';
var flkty = new Flickity(".slider")

const SliderWrapper = styled.section`
  width: calc(100% - 1.6vw);
  overflow: hidden;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  .slider {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    &:focus {
      outline: none;
    }
  }
  /* align-items: center; */
`

const SliderItem = styled.div`
  width: 30vw;
  height: 30vw;
  border-radius: 100%;
  background-color: #3939a5;
  margin-left: 12.5vw;
  margin-right: 12.5vw;
  transition: transform ease 450ms;
  transform: translateY(0);
  cursor: grabbing;

  &.is-selected {
    background-color: green;
    transform: translateY(-20vh);
    /* margin-left: 20vw;
    margin-right: 20vw; */
  }
`

const ProjectSlider = ({setSelectedCase}) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    // centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  }

  const flickityOptions = {
    pageDots: false,
    prevNextButtons: false,
    wrapAround: true,
    initialIndex: 2,
    // percentPosition: false
  }

  const items = [1,2,3,4,5,6]

  useEffect(() => {
    flkty.on("change", index => {
      console.log(`current index is ${index} `)
      setSelectedCase(index)
    })
  }, [])


  
  // flkty.on( 'change', function( index ) {console.log('CHANGE', index)});

  return (
    <SliderWrapper>
      <Flickity
        flickityRef={c => (flkty = c)}
        className={"slider"} // default ''
        elementType={"div"} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        // reloadOnUpdate // default false
        // static // default false
      >
        <SliderItem />
        <SliderItem />
        <SliderItem />
        <SliderItem />
        <SliderItem />
      </Flickity>
    </SliderWrapper>
  )
}

export default ProjectSlider;