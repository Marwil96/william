import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { styled } from "@/stitches.config";
import LinkItem from 'src/components/LinkItem';
import Image from 'next/image';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginTop: '0',

  '@bp1': {
    marginTop: '$8'
  }
});

const ProjectTitle = styled('h1', {
  fontSize: '$6',
  fontFamily: '$title',
  fontWeight: '400',
  marginBottom: '$3',
  marginTop: '$6',

  '@bp1': {
    marginTop: '10rem',
    fontSize: '10rem',
    marginBottom: '5.4rem',
  }

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
  marginBottom: '$4',
  flexDirection: 'column',


  '@bp1': {
    marginBottom: '$7',
    flexDirection: 'row',
    maxWidth: '80%'
  }
})

const MetaDataItem = styled('div', { 
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '2.4rem',

  '@bp1': {
    marginRight: '$8',
    marginBottom: '0',
  },

  '&:last-child': {
    marginRight: '0'
  }
})

const MetaDataLabel = styled('span', {
  fontFamily: '$title',
  fontSize: '$2',
  marginBottom: '0.7rem',
  color: '#9F9F9F',

  '@bp1': {
    fontSize: '$2',
    marginBottom: '1rem',
  },

})

const MetaDataValue = styled('span', {
  fontFamily: '$text',
  fontSize: '$2',

  '@bp1': {
    fontSize: '$3',
  },
})

const HeroImageContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '30rem',
  marginBottom: '$4',

  'img': {
    borderRadius: '0.8rem'
  },

  '@bp1': {
    height: '76.2rem',
    marginBottom: '$8',
    
    'img': {
      borderRadius: '1.2rem'
    },
  },
})

const LinkBubble = styled('a', {
  width: '10rem',
  height: '10rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: '$text',
  fontWeight: '500',
  fontSize: '1.4rem',
  textAlign: 'center',
  position: 'absolute',
  background: '#E63A2E',
  color: '#EAEAEA',
  borderRadius: '100%',
  zIndex: '1000',
  right: '1.6rem',
  top: '-4.5rem',
  transition: 'transform 250ms ease',
  willChange: 'transform',
  cursor: 'pointer',

  '&:hover': {
    transform: 'scale(1.2)',
  },

  '@bp1': { 
    width: '14.8rem',
    height: '14.8rem',
    right: '10rem',
    top: '-7.4rem',
    fontSize: '$3',
  }
})

const Subtitle = styled('h3', {
  fontSize: '$4',
  fontFamily: '$title',
  fontWeight: '400',
  fontStyle: 'italic',
  maxWidth: '79.2rem',
  lineHeight: '3.9rem',
  color: '#F7F7F7',
  marginBottom: '$5',

  '@bp1': {
    fontSize: '$5',
    marginBottom: '10rem',
    lineHeight: '5.4rem',
  },
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
