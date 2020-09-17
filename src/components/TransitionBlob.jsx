import React,{useEffect} from 'react';
import styled from 'styled-components';

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
    let circle = document.querySelector(".circle")
    let left = e.pageX
    let top = e.pageY
    circle.style.left = left + "px"
    circle.style.top = top + "px"

  }

const TransitionBlob = ({ transition }) => {

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', changeBlob);
    }
}, [])

  transition ? document.removeEventListener('mousemove', changeBlob) : document.addEventListener("mousemove", changeBlob);

  return (
    <BlobWrapper className="circle">
      <div className={`blob-wrapper ${transition ? 'is-active' : ''}`} >
        <Blob />
      </div>
    </BlobWrapper>
  )
}

export default TransitionBlob;