import React from 'react';
import styled from 'styled-components'
import Footer from './Footer';
import Header from './Header';
import SEO from './SEO';

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
      <SEO
        title="William Martinsson - Freelancing developer from Göteborg. - Digital Designer - Utvecklare"
        description="Hey, I'm William Martinsson. I'm a creator of websites, apps, and digital products. Sometimes I develop them other times I design them but usually, I do both. Currently freelancing from my home in the middle of Sweden."
      />
      {/* <TransitionBlob transition={transition} /> */}
      <Header />
      {children}
      <Footer />
    </PageWrapperStyle>
  )
}

export default PageWrapper;