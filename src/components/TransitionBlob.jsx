import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';

const Blob = styled.div`
  border-radius: 100%;
  /* position: absolute; */
  width: 20px;
  height: 20px;
  background: #ece7da;
`

const BlobWrapper = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  transform: translate3d(50%, 50%, 0);
  z-index: 10000;
  border-radius: 100%;

  .blob-wrapper {
    transform: scale(0);
    transition: ease 3000ms all;

    &.is-active {
      animation: blobGrowth ease 2s;
    }
    @keyframes blobGrowth {
      0% {
        transform: scale(0);
      }
      60% {
        transform: scale(200);
      }
      100% {
        transform: scale(0)
      }
    }
  }
`

  const changeBlob = e => {
    let body = document.querySelector("body")
    let circle = document.querySelector(".circle")
    let left = e.pageX
    let top = e.pageY
    circle.style.left = left + "px"
    circle.style.top = top + "px"

    // setMousePosition({clientX: e.pageX, clientY: e.pageY})
  }

const TransitionBlob = ({ transition }) => {

  useEffect(() => {
    console.log('Hello World');
    return () => {
      document.removeEventListener('mousemove', changeBlob);
    }
}, [])
  console.log("START TRANS", transition)

  transition ? document.removeEventListener('mousemove', changeBlob) : document.addEventListener("mousemove", changeBlob);
  const [mousePosition, setMousePosition] = useState({ clientY: 0, clientX: 0 })

  // onmousemove =  (e) => {
  //   setMousePosition({clientX: e.clientX, clientY: e.clientY })
  // }

  return (
    <BlobWrapper className="circle">
      <div className={`blob-wrapper ${transition ? 'is-active' : ''}`} >
        <Blob />
      </div>
    </BlobWrapper>
  )
}

export default TransitionBlob;