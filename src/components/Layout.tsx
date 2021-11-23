import React from 'react';
import { styled } from "@/stitches.config";
import Navbar from './Navbar';
import Footer from './Footer';

const Wrapper = styled('section', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  /* justify-content: center, */
  overflow: 'hidden',
  padding: '0 1.6rem',

  '@bp1': {
    padding: '0 10rem',
  }
});
const Content = styled('div', {
  width: '100%',
  maxWidth: '61.5rem',
  paddingBottom: '20rem',
  minHeight: 'calc(100vh - 11.5rem)',

  variants: {
    project: {
      true: {
        maxWidth: 'none',
      },
    },
  },
});

const Layout = ({ children, project } : {children: any, project?: boolean}) => {
  return (
    <>
    <Wrapper>
      <Content project={project}>
        <Navbar />
        {children}
      </Content>
      <Footer />
    </Wrapper>
    </>
  );
}

export default Layout;