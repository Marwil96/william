import React from 'react';
import {styled} from '@/stitches.config';
import SectionLabel from './SectionLabel';
import { ArrowRightIcon } from '@modulz/radix-icons'


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

  'svg': {
    marginLeft: '0.6rem',

    'path': {
      fill: '#9F9F9F'
    }
  }
})


const SeactionHeader = ({title} : {title: string}) => { 
  return (
    <Wrapper>
      <SectionLabel>{title}</SectionLabel>
      <SeeMore>See All <ArrowRightIcon /></SeeMore>
    </Wrapper>
  )
}

export default SeactionHeader;