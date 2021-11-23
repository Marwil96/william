import type { NextPage } from 'next'
import Layout from '../components/Layout';
import BlogComponent from 'src/components/BlogComponent';



const posts = [
  {
    title: 'Knodd',
    desc: 'An entirely new part of the website with articles about different child diseases and a rewrite to server rendering.',
    action: 'Go to case',
    leftText: 'Freelance',
    href: '/projects/knodd',
  },
  {
    title: 'Superchicane',
    desc: "Superchicane is a Formula One news platform made to tell stories with the help of data, everything from character portraits to the sport's technical aspects.",
    action: 'Go to Project',
    leftText: 'Project',
    href: '/projects/superchicane',
  },
  {
    title: 'Master Digital Design',
    desc: "We were tasked to create an alumni page for Amsterdam University of Applied Sciences design students.",
    action: 'Go to Case',
    leftText: 'Intern',
    href: '/projects/master-digital-design',
  },
  {
    title: 'Agenly',
    desc: "a website builder where you build your sites through having a dialogue with a decision tree(semi-AI).",
    action: 'Go to Project',
    leftText: 'SaaS',
    href: '/projects/agenly',
  },
  {
    title: 'Matie',
    desc: "Matie is a recipe app, built around the feature to create cookbooks, which you can work on together with your friends and family.",
    action: 'Go to Project',
    leftText: 'App',
    href: '/projects/matie',
  },
  {
    title: 'KNVB Rinus',
    desc: "We were tasked to build the new version of KNVBs Rinus, a training platform for football teams. Where they can plan their exercises and get inspiration and advice from other football coaches.",
    action: 'Go to Case',
    leftText: 'Agency',
    href: '/projects/knvb-rinus',
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
