import React from 'react';
import {styled} from '@/stitches.config';
import SectionLabel from './SectionLabel';
import { ArrowRightIcon } from '@modulz/radix-icons'


const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '$black',
  borderRadius: '1.2rem',
  padding: '$2',
  cursor: 'pointer',
  transition: 'ease 350ms transform, ease 350ms outline',
  willChange: 'transform',
  marginBottom: '$3',

  '&:hover': { 
    transform: 'scale(1.02)',
    outline: '1px solid white'
  },

  '&:last-child': {
    marginBottom: '0'
  }
})

const TextWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: '70%'
})

const Title = styled('h3', {
  fontSize: "$2",
  fontFamily: "Inter",
  fontWeight: "500",
  color: '#E4E4E4',
  marginBottom: "0.6rem",
})

const Desc = styled('span', {
  fontSize: "$2",
  fontFamily: "$text",
  fontWeight: "400",
  lineHeight: "2.5rem",
  color: '#9F9F9F',
})


const ProjectCard = ({title, desc} : {title: string, desc: string}) => { 
  return (
    <Wrapper>
      <TextWrapper>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </TextWrapper>
      <ArrowRightIcon />
    </Wrapper>
  )
}

export default ProjectCard;