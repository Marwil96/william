import React from 'react';
import PageWrapper from '../components/PageWrapper';

const About = ({transitionStatus, location, entry, exit }) => {
  return (
    <PageWrapper transitionActive={transitionStatus}>
      About
    </PageWrapper>
  )
}

export default About;