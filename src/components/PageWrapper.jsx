import React from 'react';
import styled from 'styled-components'
import Footer from './Footer';
import Header from './Header';

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

const PageWrapper = ({children, className}) => {

  return (
    <PageWrapperStyle className={className}>
      {/* <TransitionBlob transition={transition} /> */}
      <Header />
        {children}
      <Footer />
    </PageWrapperStyle>
  )
}

export default PageWrapper;