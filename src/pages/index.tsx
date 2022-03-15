import type { NextPage } from 'next'
import Layout from '../components/Layout'
import { styled } from "../../stitches.config";
import SeactionHeader from 'src/components/SectioHeader';
import ProjectCard from 'src/components/ProjectCard';
import SectionLabel from 'src/components/SectionLabel';
import TextBlock from 'src/components/TextBlock';
import Parser from 'rss-parser';


const NameTag = styled('h1', {
  fontSize: '$2',
  fontFamily: '$serif',
  fontStyle: 'italic',
  fontWeight: '400',
  marginTop: '$5',
  lineHeight: '2rem',
  marginBottom: '$3',

  '@bp1': {
    marginTop: '25rem',
  }
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

const Home = ({ currentlyReading, readRecently }: any) => {
  return (
    <Layout
      title='William Martinsson - Designer & Developer'
      desc='Crafting digital products. Building performant software and web experiences. Dreaming about design systems, new ways of creating components, and JavaScript. Currently designing and developing the new wave of internet art at Artscape. Helping businesses succeed under the name Oh, Hi.'
    >
      <NameTag>William Martinsson -<br/>Based in Stockholm</NameTag>
      <MainTextBlock>
        <strong>Designer & Developer.</strong>  Builder of performant software and web experiences. Musing about design systems, the dev & designer relationship, and JavaScript. Currently designing and developing the new wave of internet art at <a href='https://artscape.se/' target='__blank'>Artscape</a> & building a great communication tool with <a href='https://www.levelshealth.com/' target='__blank'>Levels Health</a>.
      </MainTextBlock>
      <SeactionHeader title='Selected Products' href='/projects' />
      <CardWrapper>
        <ProjectCard title='Superchicane' desc="A Formula One news platform made to tell stories with the help of data, everything from character portraits to the sport's technical aspects." href='/projects/superchicane' />
        <ProjectCard title='Radionight' desc='A podcasting platform designed to generate hype around new episodes. Taking advantage of live streaming to imitate the movie premiere feel and producing a sense of community.' href='/projects/radionight' />
      </CardWrapper>

      <SeactionHeader title='Selected Client Work' href='/projects' />
      <CardWrapper>
        <ProjectCard title='Knodd' desc='An entirely new part of the website with articles about different child diseases and a rewrite to server rendering.' href='/projects/knodd' />
        <ProjectCard title='Master Digital Design' desc='We were tasked to create an alumni page for Amsterdam University design students.' href='/projects/master-digital-design' />
      </CardWrapper>

       <SeactionHeader title='Writings' href='/writings' />
      <CardWrapper>
        <ProjectCard title='Fuck WCAG! [New Hot Design Trend] Here I come.' desc='What’s the most important? Making the web accessible for all or letting the user make the website black?' href='https://williammartinsson.medium.com/fuck-screenreaders-darkmode-here-i-come-2d7eebe463ab' external={true} />
        <ProjectCard title='CSS Grid' desc='How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.' href='https://williammartinsson.medium.com/how-to-use-the-css-grid-to-implement-a-design-on-a-website-that-uses-gatsby-and-styled-components-ebccb77cade8' external={true} />
      </CardWrapper>
      <SectionLabel>Now.</SectionLabel>
      <TextBlock>
        I learn new things by<strong> playing, reading, and building. </strong> Aspiring to be thoughtful, open-minded, and organized when I approach a new obstacle to get a feel and ownership over it. <br/><br/>Next.js is my go-to tool for<strong> building </strong>things on the web. It makes JavaScript more enjoyable and easier to create performant websites. For styling I’m using styled-components. I’ve been trying out Stitches and been gladly surprised. A change might be on its way. <br/><br/>When I need a database, I like to go with NoSQL. Often MongoDB but sometimes Firebase. Usually, I connect it to the frontend with GraphQL. Planning to learn more about SQL databases and PlanetScale. <br/><br/>When paper and pen aren’t enough I use <strong>Figma</strong> to visualize the website, product or, software. I'm a big believer in going fast to the real deal, so I try to code up small prototypes as quickly as possible. <br/><br/>Outside of work. I'm venturing outside to discover <strong>Stockholm</strong> for the first time. I'm giving my all to learn an instrument. And trying to get a better grip on web3. Rooting for<strong> Änglarna </strong> in Allsvenskan and <strong> McLaren </strong> in Formula One. Currently reading {currentlyReading.length > 0 && currentlyReading.map((book, index) =><><strong><a href={book.link}>{book.title}</a> by {book.creator}{currentlyReading.length - 1 !== index && '&'}</strong></>)}, and recently read {readRecently.length > 0 && readRecently.map((book, index) => <><strong><a href={book.link}>{book.title}</a> by {book.creator}</strong>{readRecently.length - 1 !== index ? ' and ' : '.'}</>)}
      </TextBlock>
      <SectionLabel>Reach Out</SectionLabel>
      <TextBlock>Looking for a chat, a freelance proposal or to exchange some puppy pictures? Say <a target='__blank' href='mailto:hi@williammartinsson.com'>hi@williammartinsson.com</a></TextBlock>
    </Layout>
  )
}

export async function getServerSideProps() {
  let parser = new Parser();

  const currentlyReading = await parser.parseURL('https://oku.club/rss/collection/b4aUW');
  const readRecently = await parser.parseURL('https://oku.club/rss/collection/8OVTk');

  return {
    props: {
      currentlyReading: currentlyReading.items,
      readRecently: readRecently.items
    }
  }
}

export default Home
