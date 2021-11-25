import type { NextPage } from 'next'
import Layout from '../components/Layout';
import BlogComponent from 'src/components/BlogComponent';
import { styled } from '../../stitches.config';
import SectionLabel from 'src/components/SectionLabel';
import TextBlock from 'src/components/TextBlock';


const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginTop: '$5',
  marginBottom: '$8',

  '@bp1': {
    marginTop: '$8',
  }
});

const PageTitle = styled('h1', {
  fontSize: '$4',
  fontFamily: '$title',
  lineHeight: '2.6rem',
  marginBottom: '0.5rem'
})

const PageSubtitle= styled('span', {
  fontSize: '$2',
  fontFamily: '$text',
  color: '#979797',
  fontWeight: '500',
  lineHeight: '2.6rem',
  paddingBottom: '$4',
  borderBottom: '1px dashed #A0A0A0'
})

const ContactRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$2 0',
  justifyContent: 'center',
  borderBottom: '1px dashed #A0A0A0',

  "h5": {
    fontSize: '1.4rem',
    fontFamily: '$title',
    marginBottom: '0.7rem',
    fontWeight: '400',
    // color: '#979797'
  },
  
  "a": {
    fontSize: '$2',
    fontFamily: '$text',
    fontWeight: '400',
    color: '#F2F2F2',
    textDecoration: 'underline',
    cursor: 'pointer',

    '&:hover': {
      opacity: '0.8'
    }
  },

  '&:last-child': {
    marginBottom: '0'
  },

  variants: {
    row: {
      true:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        "a": {
          marginRight: '$5',
          fontFamily: '$title',
        }
      }
    }
  }
})

const Contact: NextPage = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>Contact</PageTitle>
        <PageSubtitle>Say hi, send proposals or ask me out for a walk.</PageSubtitle>
        <ContactRow>
          <h5>Email</h5>
          <a href='mailto:hi@williammartinsson.com'>hi@williammartinsson.com</a>
        </ContactRow>

        <ContactRow row>
          <a href='https://www.linkedin.com/in/william-martinsson-a24a3b111/'>LinkedIn</a>
          <a href='https://williammartinsson.medium.com/'>Medium</a>
          <a href='https://github.com/Marwil96'>Github</a>
        </ContactRow>
      </Container>
      
      <SectionLabel>Right now...</SectionLabel>
      <TextBlock>
        Trying to learn new things by<strong> reading, and building. </strong> Trying to be thoughtful and organized when I approach new obstacles. Feeling ownership over everything <br/>I do. <br/><br/>Next.js is my go-to tool for<strong> building </strong>things on the web. It makes JavaScript more enjoyable and easier to create performant websites. For styling I’m using styled-components, I’ve been trying out Stitches and been gladly suprised so a change might be on it’s way. <br/><br/>When I need a database, I like to go with noSQL. Often MongoDB sometimes Firebase. Usually I connect it to the frontend with GraphQL. Planning to learn more about SQL databases and PlanetScale. <br/><br/>When paper and pen isn’t enough I use Figma to visualize how the website, product or software will look like. The best testing is done in the real deal, so I try to code up small prototypes as fast as possible. <br/><br/>Learning piano after a couple of years away from it. Very hard, more keys on a piano compared to a keyboard. But it feels good to learn something musical again. Rooting for<strong> Änglarna </strong> in Allsvenskan, and <strong> McLaren </strong> in Formula One.
      </TextBlock>
    </Layout>
  )
}

export default Contact
