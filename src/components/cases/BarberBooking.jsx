import React, { Component } from 'react';
import { TextBlock, CaseImage, TextBlockHorizontal, CaseHeader } from '../common'
import MetadataContainer from '../containers/MetadataContainer'

import componentBuilding from '../../images/ComponentBuilding.png'
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
                <CaseHeader category='Rapid Prototyping' title='Ideate, Assess, Develop, Improve, Repeat.' />

                <div className='CaseContainer-content'>
                    <MetadataContainer data={[{label:'Link', title:<a href='https://marwil96.github.io/barberBooking/'> Barberboking (Only developed for phone)</a> }, {label:'Type', title:'Solo project' }]} />
                    
                    <TextBlockHorizontal label='Purpose' text='Building an product from scratch with an agile approach.'  />
                    <TextBlockHorizontal label='Background' text='Being a barber is an creative job, their shops often try to communicate a certain feeling/experience but their digital bookingsystems are seriously lacking beauty and ease of use.'  />
                    
                    <h3> Research </h3>
                    <TextBlock label='Problem Research' text='I started the process by researching about the barber/hairdresser profession. My way of doing that were interviewing barbers and finding reports about the buisness on the internet.' />
                    <TextBlock label='General Information' text="In Sweden, 8500 hairdressing salons exist and they have an average of 3.8 employees. Which means that hairdressing salons are usually small businesses. 700kr is the average payment. 62% of Sweden's women dye their hair. Customers have great loyalty to their hairdresser, 54% of all men surveyed by L´oreal have been with the same hairdresser for over two years. According to a British survey, the Brittish people trust their hairdresser more than their priest or police." />
                    <TextBlock label='Market Research' text='The biggest booking system that exists today is ItsPerfect. I made some test on the system both by clicking through it myself but also by letting three users do it in front of me.' />
                    <TextBlock label='Tech Research' text='I choosed to work in React because it is an componentbased framework and I have previous experience with it.' />
                    <TextBlock label='Testing Research' text='My mentor recommended me to use HotJar for digital testing as an complement to ordinary usertesting because it is easier to share and get an bigger testing group.' />
                    <CaseImage image='https://images.unsplash.com/photo-1496181832051-69dcf27fc27d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80' />

                    <h3> Prototyping </h3>
                    <TextBlock label='Userflow' text='I started sketching out which functions and views that were neccecery to make the product work. When that were done I wrote down the views on Post-Its and started creating userflows by moving the Post-Its around. By doing it this way I could easily get a feel of different userflows, example should the user pick barber or time first?' />
                    <div className='CaseContainer-TextWithImage'> 
                        <TextBlock label='Component Making' text='Now I had a sense of what kind of components were needed so I started sketching out the components in my notebook then I redid them in figma and then I translated them to code.' />
                        <CaseImage image={componentBuilding} aspectRatio={'120%'}/>
                    </div>
                    <TextBlock label='Development Thinking' text='The starting points were that the components were supposed to be multifunctional and have so little logic in them as possible. Because they needed to be as reusible as possible.' />
                    <TextBlock label='Iteration' text='With the help of the constant flow of feedback, I couldmake small changes quickly that I could later show again and get new feedback on. Because I both devloped and did the design I hadthe possibility of being able to design / change things directly in the code instead of taking the step to Sketch or Figma between which made the whole iteration process from feedback to updated prototype happen faster and more hands-on for me and the user.' />
                    
                    <h3> Iteration example </h3>
                    <TextBlock label='Feedback' text='"I do not think the prototype is serious, you only have 6 different treatments while the hairdressing salon I go to has 25."' />
                    <TextBlock label='Analysis' text='The hairdressing salons booking system has a treatment for 30min, 45min and 60min based on hair length and sometimes even a male or female option. This means that there are alot of different treatments to choose from.' />
                    <TextBlock label='Solution Proposal' text={ 
                        <span>- Interactive illustration.
                        <br/>- Visually choose between short hair, long hair, shoulder long hair and long hair.
                        <br/>- Adjusts the price of treatments that cost more if you have longer hair.</span> 
                    }/>
                    <TextBlock label='User Test' text='Time to test the solution. One of the tests I did were sending out one A version(the new prototype) and a B version(old version) and then comparing the completion rate and completion time on the protypes.' />
                    <CaseImage image={hairChild} />
                </div>
            </div>
        );
    }
}

export default BarberBooking;
