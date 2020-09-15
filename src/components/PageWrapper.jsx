import React,{useState} from 'react';
import styled from 'styled-components'
import Footer from './Footer';
import Header from './Header';
import TransitionBlob from './TransitionBlob';

const PageWrapperStyle = styled.section`
  width: 100%;
  border: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .anime0 {
    justify-content: center;
    display: flex;
    width: 100%;
  }
`

const PageWrapper = (props) => {
  const [transition, startTransition] = useState(false)
  console.log(props)

  return (
    <PageWrapperStyle className={props.className}>
      {/* <TransitionBlob transition={transition} /> */}
      <Header startTransition={startTransition} />
        {props.children}
      <Footer />
    </PageWrapperStyle>
  )
}

export default PageWrapper;