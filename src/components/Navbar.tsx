import React from 'react';
import { styled } from "@/stitches.config";
import Link from 'next/link';


const Wrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '$5',
})

const NavItems = styled('div', { 
  display: 'flex',
})

const NavItem = styled('span', {
  fontSize: '$2',
  fontFamily: '$serif',
  marginRight: '$4',
  fontStyle: 'italic',
  cursor: 'pointer',

  '&:last-child': {
    marginRight: '0'
  },

  '&:hover': {
    opacity: '0.5'
  }
})

const Navbar = () => {
  return (
    <Wrapper> 
      <NavItems>
        <Link href='/' passHref><NavItem>Home</NavItem></Link>
        <Link href='/writings' passHref><NavItem>Writings</NavItem></Link>
        <Link href='/projects' passHref><NavItem>Projects & Products</NavItem></Link>
        <Link href='/contact' passHref><NavItem>Contact Me</NavItem></Link>
      </NavItems>
      <a target='__blank' href='mailto:hi@williammartinsson.com'><NavItem>hi@williammartinsson.com</NavItem></a>
    </Wrapper>
  )
}

export default Navbar;

