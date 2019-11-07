import React, {useEffect} from "react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Projects = () => {

  useEffect(() => {
    document.querySelector('.homepage').classList.add('homepage__animated')
  }, []);

  const data = useStaticQuery(graphql`
    {
      allPrismicProject {
        edges {
          node {
            data {
              project_name {
                text
              }
              category {
                text
              }
            }
            slugs
          }
        }
      }
    }
  `)

  const clickHandler = (e) => {
    console.log(e.currentTarget.id)
    const route = e.currentTarget.id
    
    document.querySelector('.homepage').classList.add('homepage__animated-out');

    setTimeout(() => {
        navigate(route)
      },1000
    );
  }
  const dataArray = data.allPrismicProject.edges;

  return (
    <Layout modifier='homepage'>
    
      <SEO title='William Martinsson - Freelancing Digital Designer & Developer from Gothenburg.' description="Nice to meet you! I'm an educated designer with experience working as and frontend developer. Currently freelancing from my home in the middle of Sweden."/>
      <div className='homepage__animatedblock'></div>
      <h1 className='homepage__big-title'>Bookshelf full of random projects.</h1>
      <section className='projectSection'>
        <h5 className="Label">All projects.</h5>

        {dataArray.map((item) => {
          return (
            <button className='projectlink' onClick={clickHandler} id={`projects/${item.node.slugs[0]}`} >
              <span className='projectlink__category'>{item.node.data.category.text}</span>
              <h3 className='projectlink__title'>{item.node.data.project_name.text}</h3>
            </button>
          )
        })}
        <Link className='projectSection__link' to='/projects'>Want to see more projects? </Link>
      </section>
    </Layout>
  )
}

export default Projects
