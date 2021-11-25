import React from 'react';
import { styled } from "../../stitches.config";
import Link from 'next/link';


const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$4 0',
  cursor: 'pointer',
  transition: 'ease 350ms transform, ease 350ms outline',
  willChange: 'transform',
  position: 'relative',
  justifyContent: 'center',
  // borderTop: '1px dashed #A0A0A0',
  borderBottom: '1px dashed #A0A0A0',

  '&:hover': { 
    // transform: 'scale(1.02)',
    // outline: '1px solid white'

    'span': {
      color: '#fff'
    },
    'h3': {
      textDecoration: 'underline'
    }
  },

  '&:last-child': {
    marginBottom: '0'
  }
})


const Title = styled('h3', {
  fontSize: "2.2rem",
  fontFamily: "$title",
  fontWeight: "500",
  fontStyle: "italic",
  lineHeight: "2.6rem",
  color: '#F2F2F2',
  marginBottom: "0.6rem",
})

const Desc = styled('span', {
  fontSize: "$2",
  fontFamily: "$text",
  fontWeight: "500",
  lineHeight: "2.5rem",
  marginBottom: "1rem",
  color: '#979797',
})

const ReadMore = styled('span', {
  fontSize: "$2",
  fontFamily: "$text",
  color: '#F2F2F2',
  fontWeight: "500",
  lineHeight: "2.5rem",
  textDecoration: 'underline',
})

const LeftText = styled('span', {
  fontFamily: "$title",
  fontSize: "1.4rem",
  position: 'absolute',
  marginLeft: '-8.6rem',
  transform: 'rotate(90deg)',
  willChange: 'transform',
})


const LinkItem = ({title, desc, action, leftText, key, subtitle, href, external} : {title: string, href: string, desc: string, action: string, subtitle?: string, leftText?: string, key: any, external?: boolean}) => { 
  return external ? (
    <a href={href} target='__blank'>
      <Wrapper>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <ReadMore>{action}</ReadMore>
        {leftText && <LeftText>{leftText}</LeftText>}
      </Wrapper>
    </a>) : (
    <Link href={href} passHref>
      <Wrapper>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <ReadMore>{action}</ReadMore>
        {leftText && <LeftText>{leftText}</LeftText>}
      </Wrapper>
    </Link>
  )
}

export default LinkItem;