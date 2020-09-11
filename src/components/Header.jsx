import React from 'react'
import { Link } from 'gatsby';
import { breakpoint } from "../mixins/breakpoint"
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

  ${breakpoint.phone`
    width: 100%;
    
    a {
      display: none;
    }

    .name { 
      display: block;
      margin-left: 1.6rem;
    }
  `}
  }
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
      <Link to='/' className='name'><LinkItem>William Martinsson</LinkItem></Link>
      <Link to='/work'><LinkItem>Work</LinkItem></Link>
      <Link to='/contact'><Button>Let’s work together</Button></Link>
    </HeaderWrapper>
  )
}

export default Header;