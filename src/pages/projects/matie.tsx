import React from 'react';
import Layout from 'src/components/Layout';
import ComposedImage from 'src/components/ComposedImage';
import ProjectComponent from 'src/components/ProjectComponent';
import HeroImage from '../../assets/matie/hero.png'
import Image1 from '../../assets/matie/image_1.png';
import Image2 from '../../assets/matie/image_2.png';
import Image3 from '../../assets/matie/image_3.png';
import Image4 from '../../assets/matie/image_4.png';
import Image5 from '../../assets/matie/image_5.png';
import Image6 from '../../assets/matie/image_6.png';

const metadata = [ {label: 'Tech', value: 'React Native, NodeJS, Express, Linux Server'}, {label: 'State', value: 'Beta'}];
const subtitle = "Matie is a recipe app, built around the feature to create cookbooks, which you can work on together with your friends and family."


const Superchicane = () => {
  return (
    <Layout project={true}>
      <ProjectComponent title='Matie' metadata={metadata} subtitle={subtitle} heroImage={HeroImage}>
        <h5>Thoughts about the Techstack</h5>
        <p>React Native was my choice this time, mostly because that's what I'm used to. It has improved plenty the last couple of years so the development experience is quite good and you don't feel too hindered by it. it still got some bad parts like It's quite hard to get it to perform well on old devices and the size of the app becomes quite big.</p>
        <h5>Making it easy to create and share recipes</h5>
        <p>It's fun to create recipes, but most of us find our recipes on the internet. So I created a web crawler where you could send in the link to the recipe you want to add and the crawler will translate that recipe to the app so you can add it to your cookbook or use it as a foundation for a new recipe.</p>
        <h5>Making cooking more social</h5>
        <p>The social aspect of the app is one of the core features. Everything from being able to follow other chefs, creating cookbooks together, creating a food schedule with your roommate or someone else to commenting and giving feedback on others' recipes.</p>

        <ComposedImage image={Image1}/>
        <ComposedImage image={Image2}/>
        <ComposedImage image={Image3}/>
        <ComposedImage image={Image4}/>
        <ComposedImage image={Image5}/>
        <ComposedImage image={Image6}/>

      </ProjectComponent>
    </Layout>
  )
}

export default Superchicane;