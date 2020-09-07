import React from 'react'
import styled from 'styled-components';
import Button from './Button';

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 119rem;
  padding-top: 4.6rem;
  position: absolute;
`

const Link = styled.a`
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
      <Link>William Martinsson</Link>
      <Link>About</Link>
      <Button>Let’s work together</Button>
    </HeaderWrapper>
  )
}

export default Header;