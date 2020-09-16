import { Link } from 'gatsby';
import React from 'react';
import Button from '../components/Button';
import PageWrapper from '../components/PageWrapper';

const ErrorPage = () => {
  return (
    <PageWrapper>
      <h3>Sadness... Page is missing.</h3>
      <Link to='/'><Button>Take me back</Button></Link>
    </PageWrapper>
  )
}

export default ErrorPage;