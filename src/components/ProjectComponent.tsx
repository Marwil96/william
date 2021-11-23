import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { styled } from "@/stitches.config";
import LinkItem from 'src/components/LinkItem';
import Image from 'next/image';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginTop: '$8'
});

const ProjectTitle = styled('h1', {
  fontSize: '10rem',
  fontFamily: '$title',
  fontWeight: '400',
  marginBottom: '5.4rem',
  marginTop: '10rem'
})

const ProjectSubtitle= styled('span', {
  fontSize: '$2',
  fontFamily: '$text',
  color: '#979797',
  fontWeight: '500',
  lineHeight: '2.6rem',
  paddingBottom: '$4',
  borderBottom: '1px dashed #A0A0A0'
})

const MetaDataContainer = styled('div', {
  display: 'flex',
  marginBottom: '$7',
})

const MetaDataItem = styled('div', { 
  display: 'flex',
  flexDirection: 'column',
  marginRight: '$8',

  '&:last-child': {
    marginRight: '0'
  }
})

const MetaDataLabel = styled('span', {
  fontFamily: '$title',
  fontSize: '$2',
  marginBottom: '1rem',
  color: '#9F9F9F'
})

const MetaDataValue = styled('span', {
  fontFamily: '$text',
  fontSize: '$3',
})

const HeroImageContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '76.2rem',
  marginBottom: '$8',

  'img': {
    borderRadius: '1.2rem'
  }
})

const LinkBubble = styled('a', {
  width: '14.8rem',
  height: '14.8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: '$text',
  fontWeight: '500',
  fontSize: '$3',
  position: 'absolute',
  background: '#E63A2E',
  color: '#EAEAEA',
  borderRadius: '100%',
  zIndex: '1000',
  right: '10rem',
  top: '-7.4rem',
  transition: 'transform 250ms ease',
  willChange: 'transform',
  cursor: 'pointer',

  '&:hover': {
    transform: 'scale(1.2)',
  }
})

const Subtitle = styled('h3', {
  fontSize: '$5',
  fontFamily: '$title',
  fontWeight: '400',
  fontStyle: 'italic',
  maxWidth: '79.2rem',
  lineHeight: '5.4rem',
  color: '#F7F7F7',
  marginBottom: '10rem',
})

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  "h5": {
    fontSize: '$2',
    fontFamily: '$title',
    marginBottom: '$2',
    width: '100%',
    maxWidth: '79.2rem',
  },

  "q": {
    fontSize: '$4',
    fontFamily: '$title',
    fontStyle: 'italic',
    color: '#F7F7F7',
    marginBottom: '$5',
    lineHeight: '3.7rem',
    width: '100%',
    maxWidth: '79.2rem',
  },

  "p": {
    fontSize: '$3',
    fontFamily: '$text',
    lineHeight: '3.3rem',
    marginBottom: '$6',
    // marginBottom: '$4',
    maxWidth: '79.2rem',
    width: '100%'
  },

  "li": {
    width: '100%'
  }
})


const ProjectComponent = ({title, subtitle, metadata, children, heroImage, linkToWebsite}: {title: string, subtitle: string, children: any, metadata: any, heroImage: any, linkToWebsite?: string}) => {
  return (
    <Container>

      <ProjectTitle>{title}</ProjectTitle>
      <MetaDataContainer>
      {metadata.map(({label, value}: {label: string, value: string}, index: any) => (
        <MetaDataItem key={index}>
          <MetaDataLabel>{label}</MetaDataLabel>
          <MetaDataValue>{value}</MetaDataValue>
        </MetaDataItem>
      ))}
      </MetaDataContainer>
      <HeroImageContainer>
        {linkToWebsite && <LinkBubble target='__blank' href={linkToWebsite}>Visit Website</LinkBubble>}
        <Image src={heroImage} alt={`${title} hero image`} layout='fill' objectFit='cover' />
      </HeroImageContainer>
      <Content>
        <Subtitle>{subtitle}</Subtitle>
        {children}
      </Content>

    </Container>
  )
}

export default ProjectComponent
