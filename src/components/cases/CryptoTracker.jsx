import React, { Component } from 'react';
import { TextBlock, CaseImage, TextBlockHorizontal, CaseHeader } from '../common'
import MetadataContainer from '../containers/MetadataContainer'

import video from '../../images/cryptotracker/video.gif'
import mockup from '../../images/cryptotracker/mockup.png'
import hairChild from '../../images/Hair_ChildWithBG.gif'

import './case.scss';

class CryptoTracker extends Component {
    componentDidUpdate() {
        window.scrollTo(0,0);
      }

    render() {
        return (
            <div className="CaseContainer CaseContainer--CryptoTracker">
                <CaseHeader category='Front-end development / React Native' title="Let's write some splendid code." />

                <div className='CaseContainer-content'>
                    <MetadataContainer data={[{label:'Github', title:<a href='https://github.com/Marwil96/CryptoTracker'> Link to repo</a> }, {label:'Type', title:'Solo project' }]} />
                    
                    <TextBlockHorizontal label='Purpose' text='I started working on this project because I wanted to try out React Native and play around with native animation.'  />
                    <TextBlockHorizontal label='Personal Mission' text='The big thing that separates talented developers from the rest is their ability to write good looking code, which is easily read and comprehendible. Which is why It became my goal for this project to write good code. I used stylelinter as a guideline.'  />
                    <TextBlockHorizontal label='React Native' text='I created the app with Facebooks React Native, which is an easy way to create applications that is compatible on both android and ios.'  />
                    <TextBlockHorizontal label='Data' text='I used coinmarketcaps api to fetch the most up to date data.'  />
                    <CaseImage image={mockup} aspectRatio={'100%'} />
                    <CaseImage image={video} aspectRatio={'75%'} />
                </div>
            </div>
        );
    }
}

export default CryptoTracker;
