import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { breakpoint, variables } from "../mixins/breakpoint"
import Button from '../components/Button';
import PageWrapper from '../components/PageWrapper';

const ErrorPageWrapper = styled.section`
  max-width: ${variables.maxWidth};
  display: flex;
  flex-direction: column;
  flex-direction: column;
  padding: 20rem 0;
  padding-bottom: 30rem;
  width: 100%;

  ${breakpoint.laptop`
    max-width: ${variables.maxWidthLaptop};
  `}
  
  ${breakpoint.phone` 
    padding: 15rem 1.6rem;
    width: auto;
  `}

  h3 {
    font-size: 6.4rem;
    font-weight: 300;
    margin-bottom: 3.2rem;
  }
`
const ErrorPage = () => {
  return (
    <PageWrapper>
      <ErrorPageWrapper>
        <h3>Sadness... Page is missing.</h3>
        <Link to="/">
          <Button>Take me back</Button>
        </Link>
      </ErrorPageWrapper>
    </PageWrapper>
  )
}

export default ErrorPage;