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


const Products: NextPage = () => {
  return (
    <Layout>
      <BlogComponent 
        title="Products"
        subtitle="A collection of my products"
        posts={posts}
      />
    </Layout>
  )
}

export default Products
