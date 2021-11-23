import type { NextPage } from 'next'
import Layout from '../components/Layout';
import BlogComponent from 'src/components/BlogComponent';



const posts = [
  {
    title: 'How to use the grid',
    desc: 'How to use the CSS grid to implement a design on a website that uses Gatsby and styled-components.',
    action: 'Go to Article',
    leftText: '09/11/20',
    href: 'https://williammartinsson.medium.com/how-to-use-the-css-grid-to-implement-a-design-on-a-website-that-uses-gatsby-and-styled-components-ebccb77cade8',
    external: true
  },
  {
    title: 'Why should you use figma',
    desc: 'For a long time, the biggest players in the UI design market were Adobe(Photoshop, Illustrator) and Sketch. Both of these tools aren’t very collaborative',
    action: 'Go to Article',
    leftText: '10/10/19',
    href: 'https://williammartinsson.medium.com/why-figma-is-better-then-sketch-872b7bf8631a',
    external: true
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
