import React, { Component } from 'react';
import { CaseImage, TextBlockHorizontal, CaseHeader, HelmetWrapper } from '../common'
import MetadataContainer from '../containers/MetadataContainer'

import mobile from '../../images/masterDigitalDesign/mobile.png'
import laptop from '../../images/masterDigitalDesign/laptop.png'
import desktop from '../../images/masterDigitalDesign/desktop.png'

import './case.scss';

class MasterDigitalDesign extends Component {
    componentDidUpdate() {
        window.scrollTo(0,0);
      }

    render() {
        return (
            <div className="CaseContainer CaseContainer--MasterDigitalDesign">
                <HelmetWrapper title='Master Digital Design - case by William Martinsson' description='Alumnipage for Amsterdams university education Master Digital Design' />
                <CaseHeader category='Front-end development' title="An alumnipage good enough for design students." />

                <div className='CaseContainer-content'>
                    <MetadataContainer data={[{label:'Link', title:<a href='https://www.masterdigitaldesign.com/alumni'> Link to website</a> }, {label:'Type', title:'Client work' }, {label:'Role', title:'Frontend developer' }, {label:'Team', title:<a href='https://www.momkai.com/cases/masterdigitaldesign'>Momkai</a> }]} />
                    
                    <TextBlockHorizontal label='Introduction' text={<span>People study for two reasons. Firstly for learning and getting knowledge about an subject that they are passionate about. The second reason and maybe the primary one is to get an career in something you like. That's also the reason why MDD thought it was an good idea to create an new alumnipage for their graduates. An alumnipage can work as an great advertisement for the education and the educations graduates. <br/><br/> This was my first project at Momkai, It was a special thing to work on a alumnipage for Digital Design students when I myself were one. I still had my last couple of months left of my studies when I started working on this project. It gave me a personal connection to the project.</span>}  />
                    <TextBlockHorizontal label='Client' text="Master Digital Design is an course at the the Amsterdam university. It's an master program about Digital Design. So everything from Development, UI Design, UX Design and animation."  />
                    <CaseImage image={mobile} aspectRatio={'67%'} />
                    <TextBlockHorizontal label='Brief' text={ 
                        <span>1. Create an alumnipage where students can easily share their profiles in an attractive way. The alumni profiles should be able to have an image, bio, contact information, quote, video and links to the articles the students have written.  
                        <br/><br/>2. Their alumni profiles should be connected to the articles they have written on the original Master Digital Design website. 
                        <br/><br/>3. The university should be able to highlight students. </span> 
                    }/>
                    <TextBlockHorizontal label='My role' text='My role in the project were primarily frontend development with some backend. I received help from my mentor Chris. He helped me write code that stylewise were more aligned to  how the other developers on Momkai writes code.'  />
                    <CaseImage image={laptop} aspectRatio={'63%'} />
                    <TextBlockHorizontal label='Techstack' text='We inherited the tech stack from the original site which used an combination between Twig and Craft. This project were the first real project I made with Twig(I rarely use PHP and when I do I often use blade for templating) so that was an interesting challenge.'  />
                    <CaseImage image={desktop} aspectRatio={'75%'} />
                    <TextBlockHorizontal label='Main takeaways' text={ 
                        <span>1. Triangles are hard to make responsive. Don't over do it.  
                        <br/><br/>2. You can't explain an CMS good enough for your client. If they can break the website they will do that, so write a long description and guide for the CMS.
                        <br/><br/>3. I had a lot of prejudice about Twig before I started to work with it, but now afterwards I must say that I got positively surprised. It can be really smooth to work with.  </span> 
                    }/>
                </div>
            </div>
        );
    }
}

export default MasterDigitalDesign;
