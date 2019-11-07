import React,{useEffect} from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
const Project = ({ data: { prismicProject } }) => {
  const { data } = prismicProject;
  
  useEffect(() => {
    document.querySelector('.pageheader').classList.add('pageheader__animated')
  }, []);

  return (
    <Layout modifier='project'>
      <section className='pageheader'>
        <h3 className='pageheader__category'>{data.category.text}</h3>
        <h1 className='pageheader__title'>{data.title.text}</h1>
      </section>
      <main className='content'>
        <div className='content__container'>
          <section className='summary'>
            <div className='summary__item'>
              <h6 className='summary__title'>Goal</h6>
              <span className='summary__value'>Create a new interface.</span>
            </div>
            {data.summary.map((item) => {
              return (
                <div className='summary__item'>
                  <h6 className='summary__title'>{item.summary_title.text}</h6>
                  <span className='summary__value'>{item.summary_value.text}</span>
                </div>
              )
            })}
          </section>
          <div dangerouslySetInnerHTML={{ __html: data.project_content.html }} />
        </div>
      </main>
    </Layout>
  )
}
export default Project

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicProject(uid: { eq: $uid }) {
      data {
        project_content {
          html
        }
        title {
          text
        }
        project_name {
          html
          text
        }
        summary {
          summary_title {
            text
          }
          summary_value {
            text
          }
        }
        category {
          text
        }
      }
    }
  }`