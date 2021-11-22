import React from 'react';
import Layout from 'src/components/Layout';
import ComposedImage from 'src/components/ComposedImage';
import ProjectComponent from 'src/components/ProjectComponent';
import HeroImage from '../../assets/masterdigitaldesign/hero.png'
import Image2 from '../../assets/masterdigitaldesign/image_2.png'
import Image3 from '../../assets/masterdigitaldesign/image_3.png'
import Image4 from '../../assets/masterdigitaldesign/image_4.png'
import Image5 from '../../assets/masterdigitaldesign/image_5.png'

const metadata = [{label: 'Client', value: 'Master Digital Design'}, {label: 'Role', value: 'Frontend developer'}, {label: 'Team', value: 'Momkai'}];
const subtitle = 'We were tasked to create an alumni page for Amsterdam University of Applied Sciences design students, where each student can have their page showing off their expertise, personality and skills.'


const MasterDigitalDesign = () => {
  return (
    <Layout project={true}>
      <ProjectComponent title='Master Digital Design' metadata={metadata} subtitle={subtitle} heroImage={HeroImage}>
        <h5>About the project</h5>
        <p>My role in the project was to implement the frontend and connect it to the CraftCMS. The most important aspects of this project were that the students should be able to have their profile where they could have a small text about themself, portrait image, a quote, video, contact information, and links to the articles the students have authored.<br/> <br/>All the students needed to exist on a collection page where you could filter all the students based on their different skills. Also on top of the collection page, the university needed to be able to highlight a student. Also on the collection page, we needed to combine quotes from the students with all the different students on the collection page.</p>
        <ComposedImage image={Image2}/>
        <ComposedImage image={Image3}/>
        <ComposedImage image={Image4}/>
        <ComposedImage image={Image5}/>
      </ProjectComponent>
    </Layout>
  )
}

export default MasterDigitalDesign;