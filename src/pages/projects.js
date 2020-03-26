import React, {useEffect} from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Projects = () => {
  
  useEffect(() => {
    document.querySelector('.homepage').classList.add('homepage__animated')
  }, []);
  

  const data = useStaticQuery(graphql`
    {
      prismic {
        allProjects {
          edges {
            node {
              project_name
              _meta {
                uid
              }
              category
            }
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
  const dataArray = data.prismic.allProjects.edges

  return (
    <Layout modifier='homepage'>
    
      <SEO title='William Martinsson - Freelancing Digital Designer & Developer from Gothenburg.' description="Nice to meet you! I'm an educated designer with experience working as and frontend developer. Currently freelancing from my home in the middle of Sweden."/>
      <div className='homepage__animatedblock'></div>
      <h1 className='homepage__big-title'>Bookshelf full of random projects.</h1>
      <section className='projectSection'>
        <h5 className="Label">All projects.</h5>

        {dataArray.map((item) => {
          return (
            <button
              className="projectlink"
              onClick={clickHandler}
              id={`projects/${item.node._meta.uid}`}
            >
              <span className="projectlink__category">
                {item.node.category[0].text}
              </span>
              
              <h3 className="projectlink__title">
                {item.node.project_name[0].text}
              </h3>
            </button>
          )
        })}
      </section>
    </Layout>
  )
}

export default Projects
