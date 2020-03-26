import React,{useEffect} from "react"
import { graphql, useStaticQuery } from "gatsby"
import { RichText } from 'prismic-reactjs';

import SEO from "../components/seo"
import Layout from "../components/layout"

const Project = ({ data, pageContext }) => {

  const dataQuery = data.prismic.allProjects.edges[0].node
  console.log(pageContext.uid, dataQuery)
  

  let options = {
    rootMargin: '0px',
    threshold: 0.5
  }

  function callback (entries, observer){ 

    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {

        // Stop watching and load the image
        observer.unobserve(entry.target);
        entry.target.classList.add('in-view')
        console.log(entry.target)
      }
    });
  };
  
  useEffect(() => {
    document.querySelector('.pageheader').classList.add('pageheader__animated')
    const targetArray = document.querySelectorAll('.block-img');

    let observer = new IntersectionObserver(callback, options); 
    
    Array.from(targetArray).map((element) => {
      observer.observe(element);
    })
  }, []);

  return (
    <Layout modifier="project">
      <SEO
        title={`${dataQuery.project_name[0].text} - William Martinsson - Freelancing Digital Designer & Developer from Gothenburg.`}
        description={`${dataQuery.category[0].text} - ${dataQuery.title[0].text} - Freelancing Digital Designer & Developer from Gothenburg.`}
      />
      <section className="pageheader">
        <h3 className="pageheader__category">{dataQuery.category[0].text}</h3>
        <h1 className="pageheader__title">{dataQuery.title[0].text}</h1>
      </section>
      <main className="content">
        <div className="content__container">
          <section className="summary">
            {dataQuery.summary.map(item => {
              return (
                <div className="summary__item">
                  <h6 className="summary__title">
                    {item.summary_title[0].text}
                  </h6>
                  <span className="summary__value">
                    {/* {item.summary_value.map(text => text.text)} */}
                    <RichText render={item.summary_value} />
                  </span>
                </div>
              )
            })}
          </section>
          <div>
            <RichText render={dataQuery.project_content} />
          </div>
        </div>
      </main>
    </Layout>
  )
}
export default Project

export const query = graphql`
  query PostBySlug($uid: String!) {
    prismic {
      allProjects(uid: $uid) {
        edges {
          node {
            project_content
            project_name
            title
            summary {
              summary_title
              summary_value
            }
            category
            _meta {
              uid
            }
          }
        }
      }
    }
  }
`