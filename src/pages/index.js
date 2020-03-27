import React, {useEffect, useState} from "react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StaticImageBlock from '../components/staticImageBlock';

import "../scss/main.scss"

const IndexPage = () => {

  const [imageBlockActive, setImageBlockActive] = useState(false)
  const [imageBlockId, setImageBlockId] = useState('')

  useEffect(() => {
    document.querySelector('.homepage').classList.add('homepage__animated')
  }, []);

 const data = useStaticQuery(graphql`
   {
     prismic {
       allProjects(tags: "featured", sortBy: meta_lastPublicationDate_DESC) {
         edges {
           node {
             category
             _meta {
               uid
             }
             project_name
           }
         }
       }
     }
   }
 `)

  const dataArray = data.prismic.allProjects.edges

  const clickHandler = (e) => {
    console.log(e.currentTarget.id)
    const route = e.currentTarget.id
    
    document.querySelector('.homepage').classList.add('homepage__animated-out');
  
    setTimeout(() => {
        navigate(route)
      },1000
    );
  }

  const hoverEventHandlerEnter = (e) => {
    const text = document.querySelector('.biosection')


    // img.src = e.currentTarget.id
    text.classList.add('faded')
    // img.classList.add('active')
    setImageBlockActive(true)
    setImageBlockId(e.currentTarget.id)
    
  }

  const hoverEventHandlerLeave = (e) => {
    const text = document.querySelector('.biosection')

    // img.classList.remove('active')
    text.classList.remove('faded')
    setImageBlockActive(false)

  //   setTimeout(() => {
  //     img.src = ''
  //   },450
  // );
    
  }

  return (
    <Layout modifier='homepage'>
      <SEO title='William Martinsson - Freelancing developer from Göteborg. - Digital Designer - Utvecklare' description="Hey, I'm William Martinsson. I'm a creator of websites, apps, and digital products. Sometimes I develop them other times I design them but usually, I do both. Currently freelancing from my home in the middle of Sweden."/>
      <div className='homepage__animatedblock'></div>
      <StaticImageBlock active={imageBlockActive} id={imageBlockId}/>
      <section className="introduction">
        <h1 className='introduction__title'>Nice to meet you!</h1>
        <span className='introduction__subtitle'>I'm a creator of websites, apps, and digital products. Sometimes I  develop them other times I design them but usually, I do both. Currently freelancing from my home in the middle of Sweden.</span>
      </section>

      <section>
        <h5 className="Label">Right now...</h5>
        <a href='mailto:marwil1996@gmail.com' className="homepage__alerttext">Available for freelance work and new opportunities.</a>
      </section>
      
      <section className='projectSection'>
        <h5 className="Label">Selected projects.</h5>

        {dataArray.map((item) => {
          return (
            <button className='projectlink' onClick={clickHandler} id={`projects/${item.node._meta.uid}`} >
              <span className='projectlink__category'>{item.node.category[0].text}</span>
              <h3 className='projectlink__title'>{item.node.project_name[0].text}</h3>
            </button>
          )
        })}
        <Link className='projectSection__link' to='/projects'>Want to see more projects? </Link>
      </section>
      <section className='biosection'>
        <h5 className="Label">A short text about me.</h5>
        <p>
        I was born in 1996 in a small town named <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='skara.jpeg'> Skara</span>, a town that is over one thousand years old which is quite astounding because it has been burned down three times by the danish. 
        <br/><br/>After spending my childhood in Skara I moved to <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='gothenburg.png'> Gothenburg </span> to start my education in Digital Design at <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='yrgo.jpg'>YRGO.</span> During my time in Gothenburg, I learned about design on the days and development by the evenings. After a while, I started to do freelance work for organizations such as Hallands Region & Devolve digital. When my time at YRGO started to run its course I started working with <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='momkai.png'>Momkai</span> in Amsterdam where I had the chance to work for clients such as <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='knvb.jpg'>KNVB </span> and HVA. After 8 months in Amsterdam, I moved back home to Sweden and started freelancing.    
        <br/><br/>  I like to think about myself as a designer with a close connection to development. Being able to code(Javascript, React, React-native, Node, Firebase, Redux, SASS, Gatsby, Graphql) has been of great service to me, it enabled me to work fast, iterative and give me bigger ownership in projects.
        <br/><br/>Facts.

        <br/><br/>- I'm a football fan, so my weekly mood is way to often depended on the way <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='arsenal.jpg'>Arsenal</span> played during the weekend. 

        <br/><br/>- My hometown houses the northern hemispheres biggest waterpark where I worked as a mascot, a <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='sommarland.jpg'>squirrel mascot</span> for two summers.

        <br/><br/>- I'm an avid science fiction and fantasy reader. My favorites books are Lord of the rings and God bless you, Mr. Rosewater by <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='vonnegut.jpg'>Kurt Vonnegut</span>.
        </p>
      </section>
    </Layout>
  )
}

export default IndexPage
