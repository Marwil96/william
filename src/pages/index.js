import React, {useEffect} from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../scss/main.scss"

const IndexPage = () => {
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

  const dataArray = data.allPrismicProject.edges;

  return (
    <Layout modifier='homepage'>
      <section className="introduction">
        <h1 className='introduction__title'>Hey!</h1>
        <span className='introduction__subtitle'>I'm an educated designer that primarily works with frontend development. Currently freelancing from my home in the middle of Sweden.</span>
      </section>

      <section>
        <h5 className="Label">Right now...</h5>
        <a href='mailto:marwil1996@gmail.com' className="homepage__alerttext">Available for freelance work and new opportunities.</a>
      </section>
      
      <section>
        <h5 className="Label">Handpicked cases.</h5>

        {dataArray.map((item) => {
          return (
            <Link to={`projects/${item.node.slugs[0]}`} rel="noopener noreferrer" target="_blank" className='projectlink'>
              <span className='projectlink__category'>{item.node.data.category.text}</span>
              <h3 className='projectlink__title'>{item.node.data.project_name.text}</h3>
            </Link>
          )
        })}
        {/* <Link className='link' to='/projects'>Want to see more projects? </Link> */}
      </section>
      <section className='biosection'>
        <h5 className="Label">A short text about me.</h5>
        <p>
        I was born in 1996 in a small town named <span> Skara </span>, we haven't had the best couple of centuries. The highlight of the town was in 998 A.D when Olof Skötkonung became the first baptized Swedish king in a church in my hometown. 
        <br/><br/>Some things have changed since then. The town has been burned down three times by the danish, we were the meeting place for "Thing of all Geats"(1100 A.D - 1300 A.D rock festival), and in 2010 we got famous for having a cannibal "accident". As you can understand people that grow up in places like that often try to escape it. My way of escaping was my computer and Pokemon Silver on my <span data-bio-target='http://i.imgur.com/h3JPeCc.jpg'>Gameboy color</span>. And that's where my interest in development started.
        <br/><br/>After spending my childhood in Skara I moved to <span> Gothenburg </span> to start my education in Digital Design at <span data-bio-target='./assets/images/yrgo.jpg'>YRGO.</span> During my time in Gothenburg, I learned about design on the days and development by the nights. After a while, I started to do freelance work for organizations such as Hallands Region & Devolve digital. When my time at YRGO started to run its course I started working with <span>Momkai</span> in Amsterdam where I have worked for clients such as <span>KNVB </span> and HVA.
        <br/><br/>Facts.

        <br/><br/>- I'm a football fan, so my weekly mood is way to often depended on the way <span>Arsenal</span> played during the weekend. 

        <br/><br/>- My hometown does not only house cannibals it also houses the northern hemispheres biggest waterpark where I worked as a mascot, a <span data-bio-target='http://1.bp.blogspot.com/-2jRUM_OO5Rc/ThQvcxlC1aI/AAAAAAAAAUg/ZACLnz8zb1o/s1600/Nellie+kramar+mamma+ekorre.jpg'>squirrel mascot</span> for two summers.

        <br/><br/>- I'm an avid science fiction and fantasy reader. My favorites books are Lord of the rings and God bless you, Mr. Rosewater by <span data-bio-target='https://snworksceo.imgix.net/ids/a2a06990-6e2c-478d-baeb-f086b90856bb.sized-1000x1000.jpg?w=1000'>Kurt Vonnegut</span>.
        </p>
      </section>
    </Layout>
  )
}

export default IndexPage
