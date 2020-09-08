import React from 'react'
import { Link } from 'gatsby';
import styled from 'styled-components';
import Button from './Button';

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 119rem;
  padding-top: 4.6rem;
  align-items: center;
  position: absolute;
`

const LinkItem = styled.span`
 font-size: 2rem;
 font-weight: 500;
 padding-bottom: 0.2rem;
 border-bottom: 1px solid #333;
 display:inline-table;
 cursor: pointer;
`

const Header = () => {
  return (
    <HeaderWrapper>
      <Link to='/'><LinkItem>William Martinsson</LinkItem></Link>
      <LinkItem>About</LinkItem>
      <Link to='/contact'><Button>Let’s work together</Button></Link>
    </HeaderWrapper>
  )
}

export default Header;