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

const ArticleTitle = styled('h1', {
  fontSize: '$4',
  fontFamily: '$title',
  fontWeight: '600',
  marginBottom: '$1',
  lineHeight: '3.4rem',
  marginTop: '6.4rem'
})


const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  "h5": {
    fontSize: '$2',
    fontFamily: '$title',
    marginBottom: '$1',
    width: '100%',
    fontWeight: '500'
  },

  "span": {
    fontSize: '$2',
    fontFamily: '$title',
    fontStyle: 'italic',
    color: '#F7F7F7',
    marginBottom: '$3',
    lineHeight: '2.6rem',
    width: '100%',
  },

  "p": {
    fontSize: '$2',
    fontFamily: '$text',
    lineHeight: '2.6rem',
    marginBottom: '$3',
    color: '#979797',
    // marginBottom: '$4',
    width: '100%'
  },

  "li": {
    width: '100%'
  }
})


const ArticleComponent = ({title, children}: {title: string, children: any}) => {
  return (
    <Container>

      <ArticleTitle>{title}</ArticleTitle>
      <Content>
        {children}
      </Content>

    </Container>
  )
}

export default ArticleComponent
