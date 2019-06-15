import React, { Component } from 'react';
import { TextBlock, CaseImage, TextBlockHorizontal, CaseHeader } from '../common'
import MetadataContainer from '../containers/MetadataContainer'

import caseImage from '../../images/skara.png'
import caseImageExample from '../../images/caseImageExample.png'
import margins from '../../images/akademiskahus/margins.png'
import wireframe from '../../images/akademiskahus/wireframe.png'
import onBoarding from '../../images/akademiskahus/Introduction.png'
import users from '../../images/akademiskahus/userswide.png'

import './case.scss';

// const CaseImage = React.lazy(() => import('../common/CaseImage.jsx'));

class CaseContainer extends Component {
    state = {
        renderIframeState: false
      }

    componentDidUpdate() {
        window.scrollTo(0,0);
    }
    renderIframe(state) {
       const handleClick = (e) => {
            e.preventDefault();
            this.setState( {
                renderIframeState: true
               })
          }

        if(state === true ) {
            return (<iframe title='prototype' className="CaseContainer-Iframe" width="438" height="930" src="//invis.io/4QMRL5AMBZH" frameBorder="0" allowFullScreen=""></iframe>)
        } else {
            return <button className='button' onClick={handleClick}>Render Iframe</button>
        }
    }

    render() {
        return (
            <div className="CaseContainer">
                <CaseHeader category='UX-Research' title='Finding a balance between simplicity and versatility.' image={caseImage} />

                <div className='CaseContainer-content'>
                    <MetadataContainer data={[{label:'Role', title:'UX & UI Design' }, {label:'Client', title:'Akademiska Hus' }, {label:'Type', title:'Student work' }]} />
                    
                    <TextBlockHorizontal label='Our Mission' text='Me and Sarah Bengtsson were assigned the mission to inspire Akademiska Hus on how they could build a mobile interface for their customers.'  />
                    <TextBlockHorizontal label='The client' text='Akademiska hus is a state owned property owner, who mostly owns property’s located on different university campuses. In size, it is Swedens second largest property owner.'  />
                    <TextBlockHorizontal label='My Role' text='My role in the project was to do the UI/UX work so everything from interviewing to the finishing details on the design.'  />
                    
                    <h3> Discover </h3>
                    <TextBlock label='Market research' text='We started our entire process by doing market research to investigate if there were any other similar solutions on the market today. We noticed that many of Akademiska hus competitors had applications where their customers could easily report propety faults.' />
                    <TextBlock label='Problem' text='During our interviews we noticed that it is hard for Akademiska hus customers service staff to report property faults. Which lower the value of the service that Akademiska hus provides (Property’s for campuses) for both the customer and the customers customer (students, teachers etc.)' />
                    <TextBlock label='Interviewing Result' text={ 
                        <span>- You can not report faults easy on your phone.
                        <br/>- The report system on Akademiska hus website is difficult and annoying to use.
                        <br/>- You can not send an image with the report.
                        <br/>- You need to write in your personal information every time you report.
                        <br/>- Long response time between akademiska hus operating technicians and customers service staff.
                        <br/>- There is also no easy way to communicate your information to customers.</span> 
                    }/>
                    <TextBlock label='Users' text='We discussed about which users we would prioritize to target this new service to and who would need it. We found that we would primarily need to solve the communication between Akademiska hus – Customer/Tenants – Users/the people who use academic house properties.' />
                    <CaseImage image={users} />

                    <h3> Exploration </h3>
                    <TextBlock label='Wireframing' text='When we made the first wireframes we took into account that the users of the product would largely be non-technical. And that the product should feel just as natural for them as a hammer or a notebook.' />
                    <CaseImage image={wireframe} aspectRatio={'120%'} />
                    <TextBlock label='User Testing' text='During the usertests we noticed that the users had problems reading the serif fontface so we switched to the recognizable roboto instead. We also understood that the users wanted it to be possible to open the faults you had reported without switching view so they quickly could read the faults.' />
                    <TextBlock label='Solution' text={
                        <span>
                            To make it easier to report faults, we came up with a web app which you can use as a tool to report faults on the go. After discussion with both Akademiska hus and their users we selected these five functions to be developed: 
                            <br/>- Sending picture with the faults form.
                            <br/>- Being able to quickly see your reported faults and their status (inactive, active, archived).
                            <br/>- Information about property interference and other information, which should be easily relayed if needed.
                            <br/>- It should be easy to find the contact information for the person who is responsible for the school you take care of.
                        </span>} 
                    />

                    <h3> Design </h3>
                    <div className='CaseContainer-TextWithImage'> 
                        <TextBlock label='Interface' text='The application were created with 32px margins and 4 column layout. We used google material design 2.0 because we felt that it was a waste of time to create new elements.' />
                        <CaseImage image={margins} aspectRatio={'120%'} />
                    </div>
                    <TextBlock label='Onboarding' text='We made a short tutorial for first-time users, to help them understand the meaning of the application.' />
                    <CaseImage image={onBoarding} aspectRatio={'42.3%'} />
                    <h3>iframe prototype</h3>
                    {this.renderIframe(this.state.renderIframeState)}
                </div>
            </div>
        );
    }
}

export default CaseContainer;
