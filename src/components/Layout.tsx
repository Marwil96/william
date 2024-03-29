import React from 'react';
import { styled } from "../../stitches.config";
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

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
const Content = styled(motion.div, {
  maxWidth: '100%',
  // maxWidth: '61.5rem',
  paddingBottom: '6.4rem',
  minHeight: 'calc(100vh - 11.5rem)',

  '@bp1': {
    paddingBottom: '20rem',
  },

  variants: {
    project: {
      true: {
        // maxWidth: 'none',
      },
    },
  },
});

const ChildrenWrapper = styled(motion.div, {
   
})

const Layout = ({ children, project, title, desc } : {children: any, project?: boolean, title: string, desc: string}) => {
  return (
    <>
    <NextSeo
      title={title}
      description={desc}
    />
    <Wrapper>
      <Content layout initial={{ width: '61.5rem' }}
        animate={{ width: !project ? '61.5rem' : '100%' }}
        exit={{ width: '61.5rem' }} project={project}
        transition={{duration: project ? 1.35 : 0.2}}
        >
        <Navbar />
        <ChildrenWrapper layout initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0  }} project={project}
        transition={{duration: project ? 0.5 : 0.2}}>
          {children}
        </ChildrenWrapper>
      </Content>
      <Footer />
    </Wrapper>
    </>
  );
}

export default Layout;