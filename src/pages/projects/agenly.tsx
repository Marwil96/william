import React from 'react';
import Layout from 'src/components/Layout';
import ComposedImage from 'src/components/ComposedImage';
import ProjectComponent from 'src/components/ProjectComponent';
import HeroImage from '../../assets/agenly/hero.png';
import Image1 from '../../assets/agenly/image_1.png';
import Image2 from '../../assets/agenly/image_2.png';
import Image3 from '../../assets/agenly/image_3.png';
import Image4 from '../../assets/agenly/image_4.png';
import Image5 from '../../assets/agenly/image_5.png';
import Image6 from '../../assets/agenly/image_6.png';
import Image7 from '../../assets/agenly/image_7.png';
import SeoImage from '../../assets/agenly/seo.png';

const metadata = [{label: 'Role', value: 'Design & Development'}, {label: 'Type', value: 'SaaS'}, {label: 'Tech', value: 'React, Gatsby, Nodejs, Digital Ocean, Redux, Firebase, Stripe, Vercel.'}];
const subtitle = 'This case is about my side project Agenly, a website builder where you build your sites through having a dialogue with a decision tree(semi-AI).'


const Knodd = () => {
  return (
    <Layout project={true}>
      <ProjectComponent title='Agenly' metadata={metadata} subtitle={subtitle} heroImage={HeroImage}>
        <h5>The big why</h5>
        <p>This side project came from a sort of frustration with today's big website builders(Squarespace, WiX, etc). They are hard to use for people lacking digital experience which a lot of small business owners do. The website builders also produce websites with horrendous performance(Look at lighthouse test below). That's why I went out looking for a solution.</p>
        <ComposedImage image={SeoImage}/>
        <h5>Solution</h5>
        <p>What’s needed for small business owners is a tool that:<br/>
          <li>Works on both mobile and desktop. Plenty of business owners use their phones for everything in their business today. They should be able to edit their site from their phone too.</li>
          <li>Guides them through the entire setup process. Explains to them important web-fundamentals like what SEO is and how it can be adapted.</li>
          <li>Streamlines the setup process after their industry. The website needs to be able to adapt to the needs of its owner. The setup process for a restaurant and a law firm shouldn’t be alike.</li>
          <li>Updates over time. The web is constantly evolving. The website needs to change with it.</li>
          <li>Have a great performance. It should work great on old devices and for people with slow internet access.</li>
          <li>Works together with Google Analytics and displays user trends in an easily comprehendible way.</li>
        </p>
        <h5>Marketing Page</h5>
        <p>
          <li>React-Gatsby</li>
          <li>Styled Components</li>
          <li>Prismic CMS</li>
          <li>SimpleAnalytics</li>
        </p>
        <ComposedImage image={Image1}/>
        <ComposedImage image={Image2}/>
        <ComposedImage image={Image3}/>
        
        <h5>How I built it.</h5>
        <p>
          The interface is built with React and Sass. The way the dialogue-based interface works is that the user chooses a dialogue tree at the beginning that's concealed behind picking what the purpose of your site is(restaurant, sports team, store, etc). When the app knows your dialogue tree it starts to push in the different questions.<br/><br />

          The app is constantly keeping the Firestore backend up to date, so the user can leave the setup and start at the same point later. When you have finished the dialogue/setup the app sends the information to the NodeJs server running at DigitalOcean.<br/><br />

          The server takes the information and creates a Gatsby site out of it and deploys it to the web trough Vercel on the customer's domain. The Firestore and NodeJs server is constantly communicating which makes it possible for the user to know if the server is under heavy use which makes the website build time longer.<br/><br />

          Payments are done with the help of Stripe trough the server. The server is also helping with the upload of images and purchasing of domain.</p>

        <ComposedImage image={Image4}/>
        <ComposedImage image={Image5}/>
        <ComposedImage image={Image6}/>
        <ComposedImage image={Image7}/>
      </ProjectComponent>
    </Layout>
  )
}

export default Knodd;