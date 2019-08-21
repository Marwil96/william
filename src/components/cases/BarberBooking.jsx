import React, { Component } from 'react';
import { TextBlock, CaseImage, TextBlockHorizontal, CaseHeader, HelmetWrapper } from '../common'
import MetadataContainer from '../containers/MetadataContainer'

import componentBuilding from '../../images/barberbooking/ComponentBuilding.png'
import mockup from '../../images/barberbooking/mockupblue.png'
import hairChild from '../../images/Hair_ChildWithBG.gif'

import './case.scss';

// const CaseImage = React.lazy(() => import('../common/CaseImage.jsx'));

class BarberBooking extends Component {
    componentDidUpdate() {
        window.scrollTo(0,0);
      }

    render() {
        return (
            <div className="CaseContainer CaseContainer--BarberBooking">
                <HelmetWrapper title='Bookingsystem - case by William Martinsson' description='Bookingsystem - case by William Martinsson' />
                <CaseHeader category='Rapid Prototyping' title='Ideate, Assess, Develop, Improve, Repeat.' />

                <div className='CaseContainer-content'>
                    <MetadataContainer data={[{label:'Link', title:<a href='https://marwil96.github.io/barberBooking/'> Barberboking (Only developed for phone)</a> }, {label:'Type', title:'Solo project' }]} />
                    
                    <TextBlockHorizontal label='Purpose' text='Building a product from scratch with an agile approach.'  />
                    <TextBlockHorizontal label='Background' text='Being a barber is a creative job, their shops often try to communicate a certain feeling/experience but their digital booking systems are seriously lacking beauty and ease of use.'  />
                    <CaseImage image={mockup} aspectRatio={'100%'} />
                    <h3> Research </h3>
                    <TextBlock label='Problem Research' text='I started the process by researching the barber/hairdresser profession. My way of doing that was interviewing barbers and finding reports about the business on the internet.' />
                    <TextBlock label='General Information' text="In Sweden, 8500 hairdressing salons exist and they have an average of 3.8 employees. Which means that hairdressing salons are usually small businesses. 700kr is the average payment. 62% of Sweden's women dye their hair. Customers have great loyalty to their hairdresser, 54% of all men surveyed by L´oreal have been with the same hairdresser for over two years. According to a British survey, the Brittish people trust their hairdresser more than their priest or police." />
                    <TextBlock label='Market Research' text='The biggest booking system that exists today is ItsPerfect. I made some test on the system both by clicking through it myself but also by letting three users do it in front of me.' />
                    <TextBlock label='Tech Research' text='I chose to work in React because it is a component-based framework and I have previous experience with it.' />
                    <TextBlock label='Testing Research' text='My mentor recommended me to use HotJar for digital testing as a complement to ordinary user testing because it is easier to share and get a bigger testing group.' />
                    <CaseImage image='https://images.unsplash.com/photo-1496181832051-69dcf27fc27d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80' />

                    <h3> Prototyping </h3>
                    <TextBlock label='Userflow' text='I started sketching out which functions and views that were necessary to make the product work. When that was done I wrote down the views on Post-Its and started creating user flows by moving the Post-Its around. By doing it this way I could easily get a feel of different userflows.' />
                    <div className='CaseContainer-TextWithImage'> 
                        <TextBlock label='Component Making' text='Now I had a sense of what kind of components were needed so I started sketching out the components in my notebook then I redid them in Figma and then I translated them to code.' />
                        <CaseImage image={componentBuilding} aspectRatio={'120%'}/>
                    </div>
                    <TextBlock label='Development Thinking' text='The starting points were that the components were supposed to be multifunctional and have so little logic in them as possible. Because they needed to be as reusable as possible.' />
                    <TextBlock label='Iteration' text='With the help of the constant flow of feedback, I could make small changes quickly that I could later show again and get new feedback on. Because I both developed and did the design I had the possibility of being able to design/change things directly in the code instead of taking the step to Sketch or Figma between which made the whole iteration process from feedback to updated prototype happen faster and more hands-on for me and the user.' />
                    
                    <h3> Iteration example </h3>
                    <TextBlock label='Feedback' text='"I do not think the prototype is serious, you only have 6 different treatments while the hairdressing salon I go to has 25."' />
                    <TextBlock label='Analysis' text='The hairdressing salons booking system has a treatment for 30min, 45min, and 60min based on hair length and sometimes even a male or female option. This means that there are a lot of different treatments to choose from.' />
                    <TextBlock label='Solution Proposal' text={ 
                        <span>- Interactive illustration.
                        <br/>- Visually choose between short hair, long hair, shoulder-length hair, and long hair.
                        <br/>- Adjusts the price of treatments that cost more if you have long hair.</span> 
                    }/>
                    <TextBlock label='User Test' text='Time to test the solution. One of the tests I did were sending out one A version(the new prototype) and a B version(old version) and then comparing the completion rate and completion time on the prototypes.' />
                    <CaseImage image={hairChild} />
                </div>
            </div>
        );
    }
}

export default BarberBooking;
