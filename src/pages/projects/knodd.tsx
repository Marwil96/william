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

const metadata = [{label: 'Type', value: 'Freelance'}, {label: 'Tech', value: 'Gatsby, Prismic, SASS, GraphQL.'}];
const subtitle = 'Knodd is a medicare startup from Gothenburg, they allow you to consult a qualified health professional about your child via your smartphone or tablet. '


const Knodd = () => {
  return (
    <Layout 
      title='Knodd'
      desc={subtitle} 
      project={true}
    >
      <ProjectComponent title='Knodd' metadata={metadata} subtitle={subtitle} heroImage={HeroImage} linkToWebsite='https://www.knodd.se/fakta-och-rad/'>
        <h5>Brief</h5>
        <p>Knodd needed help to make their website more attractive to potential customers. So we made a plan to remake the website in Gatsby to improve loading speeds, add a CMS to the existing site, and create an entirely new part of the website with articles about different child diseases.</p>
        <h5>Thoughts about the tech stack.</h5>
        <p>Gatsby has quickly grown to become a favorite of mine for building static websites. It makes it super easy to build superb performing sites. For this project, my CMS of choice was Prismic because it works great with Gatsby and has an awesome backend/interface. That makes it really easy for the client to keep the website up to date.</p>
        <ComposedImage image={Image1}/>
        <ComposedImage image={Image2}/>
        <ComposedImage image={Image3}/>
        <ComposedImage image={Image4}/>
        <ComposedImage image={Image5}/>
      </ProjectComponent>
    </Layout>
  )
}

export default Knodd;