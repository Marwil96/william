import React from 'react';
import Layout from 'src/components/Layout';
import ComposedImage from 'src/components/ComposedImage';
import ProjectComponent from 'src/components/ProjectComponent';
import HeroImage from '../../assets/superchicane/hero.png'
import Image1 from '../../assets/superchicane/image_1.png';
import Image2 from '../../assets/superchicane/image_2.png';
import Image3 from '../../assets/superchicane/image_3.png';
import Image4 from '../../assets/superchicane/image_4.png';
import Image5 from '../../assets/superchicane/image_5.png';
import Image6 from '../../assets/superchicane/image_6.png';
import Image7 from '../../assets/superchicane/image_7.png';

const metadata = [ {label: 'Tech', value: 'React, Gatsby, NodeJS, WikiAPI, Python, Styled-components'}, {label: 'State', value: 'Beta'}];
const subtitle = "Superchicane is a Formula One news platform made to tell stories with the help of data, everything from character portraits to the sport's technical aspects."


const Superchicane = () => {
  return (
    <Layout project={true}>
      <ProjectComponent title='Superchicane' metadata={metadata} subtitle={subtitle} heroImage={HeroImage} linkToWebsite='https://superchicane.com/'>
        <h5>Making data understandable</h5>
        <p>The website contains information about 851 drivers, 74 circuits, 115 teams, and thousands of races so it was fundamental to make the huge amount of data understandable, and the relationship between it clear. My way of trying to succeed was to map out the data as clear as possible before I started working, work with images when I could, and presenting the data on the website with as many graphs as possible instead of tables where it made sense.</p>
        <h5>Thoughts about the Design</h5>
        <p>I used a deep orange as my primary color to get a more sporty feel. The orange color is great because you use both black and white color upon it and it really pops. The website uses a 12 column grid that works great with all the tables, often it's good to use an 8 column table and a 4 column text block explaining the table but other variations work great too, the possibilities are endless really.</p>
        <h5>Gathering the Data and Building the Website</h5>
        <p>I built the database by crawling Wikipedia for Formula 1 information and later combining that with a Formula 1 API. Gatsby(frontend framework for building static websites) was perfect for this use-case, I could just insert all the data and Gatsby put out optimized pages. As almost always nowadays I used styled-components for styling, it works great because I make my designs built around the concept of design-systems and component-based design.</p>
        <h5>Reception</h5>
        <p>The beta launch was great, the website was visited by over 2.5k people over the first two days. With it trending on a South Korean social media platform. So we were generally happy about the launch and it feels like a solid start for the website.</p>
        <q>As someone who's a huuuuge geek for racing statistics and data, this website is amazing!!!! thank you so much for your work 🙏</q>
        <q>This is really cool.It’s so easy to access stats instead of rooting through individual websites.Thanks 👍🏻</q>
        <q>This is genuinely amazing and hats off to you for making such a professional looking website!</q>
        <q>Awesome. Great work</q>

        <ComposedImage image={Image1}/>
        <ComposedImage image={Image2}/>
        <ComposedImage image={Image3}/>
        <ComposedImage image={Image4}/>
        <ComposedImage image={Image5}/>
        <ComposedImage image={Image6}/>
        <ComposedImage image={Image7}/>

      </ProjectComponent>
    </Layout>
  )
}

export default Superchicane;