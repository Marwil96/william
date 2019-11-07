import React, {useEffect} from "react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../scss/main.scss"

const IndexPage = () => {
  useEffect(() => {
    document.querySelector('.homepage').classList.add('homepage__animated')
  }, []);

  const data = useStaticQuery(graphql`
    {
      allPrismicProject(filter: {tags: {eq: "featured"}}) {
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
    const img = document.querySelector('.homepage__imageblock')
    const text = document.querySelector('.biosection')


    img.src = e.currentTarget.id
    text.classList.add('faded')
    img.classList.add('active')
    
  }

  const hoverEventHandlerLeave = (e) => {
    const img = document.querySelector('.homepage__imageblock')
    const text = document.querySelector('.biosection')

    img.classList.remove('active')
    text.classList.remove('faded')

    setTimeout(() => {
      img.src = ''
    },150
  );
    
  }

  return (
    <Layout modifier='homepage'>
      <SEO title='William Martinsson - Freelancing Digital Designer & Developer from Gothenburg.' description="Nice to meet you! I'm an educated designer with experience working as and frontend developer. Currently freelancing from my home in the middle of Sweden."/>
      <div className='homepage__animatedblock'></div>
      <img className='homepage__imageblock' src='' alt='displays images when hovering over text'/>
      <section className="introduction">
        <h1 className='introduction__title'>Nice to meet you!</h1>
        <span className='introduction__subtitle'>I'm an educated designer that primarily works with frontend development. Currently freelancing from my home in the middle of Sweden.</span>
      </section>

      <section>
        <h5 className="Label">Right now...</h5>
        <a href='mailto:marwil1996@gmail.com' className="homepage__alerttext">Available for freelance work and new opportunities.</a>
      </section>
      
      <section className='projectSection'>
        <h5 className="Label">Handpicked cases.</h5>

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
      <section className='biosection'>
        <h5 className="Label">A short text about me.</h5>
        <p>
        I was born in 1996 in a small town named <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='https://images.prismic.io/williammartinsson/099f586a-f830-4d14-9c37-efb604cfa73d_skara.jpeg?auto=compress,format'> Skara</span>, we haven't had the best couple of centuries. The highlight of the town was in 998 A.D when Olof Skötkonung became the first baptized Swedish king in a church in my hometown. 
        <br/><br/>Some things have changed since then. The town has been burned down three times by the danish, we were the meeting place for "Thing of all Geats"(1100 A.D - 1300 A.D rock festival), and in 2010 we got famous for having a cannibal "accident". As you can understand people that grow up in places like that often try to escape it. My way of escaping was my computer and Pokemon Silver on my Gameboy color. And that's where my interest in development started.
        <br/><br/>After spending my childhood in Skara I moved to <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='https://images.prismic.io/williammartinsson/e9a0825d-6d7b-4e01-a314-f162165a8057_gothenburg.png?auto=compress,format'> Gothenburg </span> to start my education in Digital Design at <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='https://images.prismic.io/williammartinsson/d1f38991-a662-4aa5-9691-d754b6bf883f_yrgo.jpg?auto=compress,format'>YRGO.</span> During my time in Gothenburg, I learned about design on the days and development by the nights. After a while, I started to do freelance work for organizations such as Hallands Region & Devolve digital. When my time at YRGO started to run its course I started working with <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='https://images.prismic.io/williammartinsson/fe8d6065-b20c-4544-abd7-729c761d7b2d_momkai.png?auto=compress,format'>Momkai</span> in Amsterdam where I have worked for clients such as <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='https://images.prismic.io/williammartinsson/c34aa057-978e-4241-b4d4-8d5e87e3e5d1_knvb.png?auto=compress,format'>KNVB </span> and HVA.
        <br/><br/>Facts.

        <br/><br/>- I'm a football fan, so my weekly mood is way to often depended on the way <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='https://images.prismic.io/williammartinsson/d5932932-df5b-4427-9370-d40f06b7bae0_arsenal.jpg?auto=compress,format'>Arsenal</span> played during the weekend. 

        <br/><br/>- My hometown does not only house cannibals it also houses the northern hemispheres biggest waterpark where I worked as a mascot, a <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='https://images.prismic.io/williammartinsson/1b8a4e5e-4d84-4c71-9289-b0f6bcb4a7a3_sommarland.jpg?auto=compress,format'>squirrel mascot</span> for two summers.

        <br/><br/>- I'm an avid science fiction and fantasy reader. My favorites books are Lord of the rings and God bless you, Mr. Rosewater by <span onMouseOver={hoverEventHandlerEnter} onMouseLeave={hoverEventHandlerLeave} className='biosection__hover-item' id='https://images.prismic.io/williammartinsson/08e09fa4-c8b3-4a9b-ba6f-76c48112758e_vonnegut.jpg?auto=compress,format'>Kurt Vonnegut</span>.
        </p>
      </section>
    </Layout>
  )
}

export default IndexPage
