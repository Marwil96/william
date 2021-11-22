import type { NextPage } from 'next'
import Layout from '../components/Layout';
import BlogComponent from 'src/components/BlogComponent';



const posts = [
  {
    title: 'Knodd',
    desc: 'An entirely new part of the website with articles about different child diseases and a rewrite to server rendering.',
    action: 'Go to case',
    leftText: 'November 19th',
    href: '/projects/knodd',
  },
  {
    title: 'Superchicane',
    desc: "Superchicane is a Formula One news platform made to tell stories with the help of data, everything from character portraits to the sport's technical aspects.",
    action: 'Go to Case',
    leftText: 'November 15th',
    href: '/projects/superchicane',
  },
  {
    title: 'Master Digital Design',
    desc: "We were tasked to create an alumni page for Amsterdam University of Applied Sciences design students.",
    action: 'Go to Case',
    leftText: 'November 15th',
    href: '/projects/master-digital-design',
  },
  {
    title: 'Matie',
    desc: "Matie is a recipe app, built around the feature to create cookbooks, which you can work on together with your friends and family.",
    action: 'Go to Case',
    leftText: 'November 15th',
    href: '/projects/matie',
  }
]


const Projects: NextPage = () => {
  return (
    <Layout>
      <BlogComponent 
        title="Projects & Products"
        subtitle="A collection of my projects"
        posts={posts}
      />
    </Layout>
  )
}

export default Projects
