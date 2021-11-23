import React from 'react';
import Layout from 'src/components/Layout';
import ComposedImage from 'src/components/ComposedImage';
import ProjectComponent from 'src/components/ProjectComponent';
import HeroImage from '../../assets/knodd/hero.png';
import Image1 from '../../assets/knodd/image_1.png';
import Image2 from '../../assets/knodd/image_2.png';
import Image3 from '../../assets/knodd/image_3.png';
import Image4 from '../../assets/knodd/image_4.png';
import Image5 from '../../assets/knodd/image_5.png';
import ArticleComponent from 'src/components/ArticleComponent';


const HowToUseTheGrid = () => {
  return (
    <Layout>
      <ArticleComponent title="How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components. And why it's useful.">
        <p>I'm gonna show you how to implement a CSS grid on one of the most trendy/popular tech stacks out there for front-end development. Gatsby, and styled-components. We are going to implement a design that’s perfect for a CSS grid, where you would have needed to write plenty more code if you wanted to implement it with flex-box or in other ways.</p>
        <p>The CSS grid is a neat tool for us developers if we want to implement a tricky design but it's also essential if we want the designers to be able to work more systematically since the grid reduces the design possibilities.</p>
        <span><q>The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style. But one must learn how to use the grid; it is an art that respanuires practice.</q> -Josef Müller-Brockmann</span>
        
        <ComposedImage image={Image1}/>
        <ComposedImage image={Image2}/>
        <ComposedImage image={Image3}/>
        <ComposedImage image={Image4}/>
        <ComposedImage image={Image5}/>
      </ArticleComponent>
    </Layout>
  )
}

export default HowToUseTheGrid;