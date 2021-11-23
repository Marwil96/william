import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { styled } from "@/stitches.config";
import SeactionHeader from 'src/components/SectioHeader';
import ProjectCard from 'src/components/ProjectCard';
import SectionLabel from 'src/components/SectionLabel';
import TextBlock from 'src/components/TextBlock';

const NameTag = styled('h1', {
  fontSize: '$2',
  fontFamily: '$serif',
  fontStyle: 'italic',
  fontWeight: '400',
  marginTop: '25rem',
  lineHeight: '2rem',
  marginBottom: '$3'
})

const MainTextBlock = styled('span', {
  fontSize: '$2',
  fontFamily: '$text',
  fontWeight: '505',
  lineHeight: '2.6rem',
  display: 'block',
  marginBottom: '$7',

  'strong': {
    fontFamily: 'Newsreader',
    fontStyle: 'italic',
    fontWeight: '500',
  },

  'a': {
    fontFamily: 'Newsreader',
    fontStyle: 'italic',
    fontWeight: '500',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
})

const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '$7'
})

const Home: NextPage = () => {
  return (
    <Layout>
      <NameTag>William Martinsson -<br/>Designer & Developer</NameTag>
      <MainTextBlock>
        <strong>Crafting digital products.</strong>  Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at <a>Artscape</a>. Helping businesses succeed under the name <a>Oh, Hi</a>.
      </MainTextBlock>
      <SeactionHeader title='Building' />
      <CardWrapper>
        <ProjectCard title='Radionight' desc='Livestream podcasts, create awesome communites.' href='/projects/radionight' />
        <ProjectCard title='Lyssna' desc='Livestream podcasts, create awesome communites.' href='/projects/lyssna' />
      </CardWrapper>

      <SeactionHeader title='Projects' />
      <CardWrapper>
        <ProjectCard title='Knodd' desc='Livestream podcasts, create awesome communites.' href='/projects/knodd' />
        <ProjectCard title='KNVB' desc='Livestream podcasts, create awesome communites.' href='/projects/knodd' />
      </CardWrapper>

       <SeactionHeader title='Writings' />
      <CardWrapper>
        <ProjectCard title='CSS Grid' desc='How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.' href='/writings/css-grid' />
      </CardWrapper>
      <SectionLabel>Right now...</SectionLabel>
      <TextBlock>
        Trying to learn new things by<strong> reading, and building. </strong> Trying to be thoughtful and organized when I approach new obstacles. Feeling ownership over everything <br/>I do. <br/><br/>Next.js is my go-to tool for<strong> building </strong>things on the web. It makes JavaScript more enjoyable and easier to create performant websites. For styling I’m using styled-components, I’ve been trying out Stitches and been gladly suprised so a change might be on it’s way. <br/><br/>When I need a database, I like to go with noSQL. Often MongoDB sometimes Firebase. Usually I connect it to the frontend with GraphQL. Planning to learn more about SQL databases and PlanetScale. <br/><br/>When paper and pen isn’t enough I use Figma to visualize how the website, product or software will look like. The best testing is done in the real deal, so I try to code up small prototypes as fast as possible. <br/><br/>Learning piano after a couple of years away from it. Very hard, more keys on a piano compared to a keyboard. But it feels good to learn something musical again. Rooting for<strong> Änglarna </strong> in Allsvenskan, and <strong> McLaren </strong> in Formula One.
      </TextBlock>
      <SectionLabel>Reach Out</SectionLabel>
      <TextBlock>Looking for a chat, a freelance proposal or to exchange some puppy pictures? Say <a target='__blank' href='mailto:hi@williammartinsson.com'>hi@williammartinsson.com</a></TextBlock>
    </Layout>
  )
}

export default Home
