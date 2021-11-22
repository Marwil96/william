import type { NextPage } from 'next'
import Layout from '../components/Layout';
import BlogComponent from 'src/components/BlogComponent';



const posts = [
  {
    title: 'How to use the grid',
    desc: 'How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.',
    action: 'Go to Article',
    leftText: 'November 19th',
  },
  {
    title: 'Why should you use figma',
    desc: 'How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.',
    action: 'Go to Article',
    leftText: 'November 15th',
  }
]


const Writings: NextPage = () => {
  return (
    <Layout>
      <BlogComponent 
        title="Writings"
        subtitle="A collection of my writings"
        posts={posts}
      />
    </Layout>
  )
}

export default Writings
