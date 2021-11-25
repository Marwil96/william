import React from 'react';
import {styled} from '@/stitches.config';
import SectionLabel from './SectionLabel';
import { ArrowRightIcon } from '@modulz/radix-icons'
import Link from 'next/link';


const Wrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const SeeMore = styled('span', {
  fontSize: "1.4rem",
  fontFamily: "Inter",
  fontWeight: "500",
  color: '#9F9F9F',
  marginBottom: "$4",
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #9F9F9F',
  paddingBottom: '0.3rem',
  cursor: 'pointer',

  '&:hover': {
    opacity: '0.8',
  },

  'svg': {
    marginLeft: '0.6rem',

    'path': {
      fill: '#9F9F9F'
    }
  }
})


const SeactionHeader = ({title, href} : {title: string, href: string}) => { 
  return (
    <Wrapper>
      <SectionLabel>{title}</SectionLabel>
      <Link href={href} passHref><SeeMore>See All <ArrowRightIcon /></SeeMore></Link>
    </Wrapper>
  )
}

export default SeactionHeader;