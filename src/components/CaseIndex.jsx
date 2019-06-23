import React, { Component } from 'react';
import { Label, ProjectLink, MainTextBlock, ContactLink } from './common'

import '../App.scss';

class CaseIndex extends Component {
    componentDidMount() {
        this.props.previewImageFunc()
    }

    componentDidUpdate() {
        window.scrollTo(0,0);
    }

    render() {
        return (
        <div className="container">
            <MainTextBlock 
                title={<h1 style={{'margin': 0, 'marginBottom': -16}}>Bookshelf full of random projects.</h1>}
            />

            <Label label='CASES & Experiments' />
            <div className="blockContainer">
                <ProjectLink link='barberbooking' label='Product development & Fullstack' title='Bookingsystem' imageUrl='' />
                <ProjectLink link='Akademiskahus' label='UI & UX Design' title='Akademiska hus' imageUrl='' />
                <ProjectLink link='CryptoTracker' label='Frontend development' title='Cryptotracker' imageUrl='' />
                <ProjectLink link='48H' label='Print & Communication' title='Second place at 48H' imageUrl='' />
                <ProjectLink link='https://marwil96.github.io/portfolio/#/projectKnowel#1' label='Fullstack development' title='Knowel' type='external' imageUrl='' />
                <ProjectLink link='https://marwil96.github.io/Lyricdisplay/' label='Frontend development' title='Lyricplatform' type='external' imageUrl='' />
                <ProjectLink link='https://marwil96.github.io/Dronelist/' label='Frontend development & Design' title='Dronelist' type='external' imageUrl='' />
                <ProjectLink link='https://marwil96.github.io/portfolio/#/projectThrive' label='Design' title='Thrive' type='external' imageUrl='' />
            </div>
            <div className="blockContainer">
                <Label label='How to find me' />
                <ContactLink link='mailto:marwil1996@gmail.com' label='Talk to me or exchange doggopics both works great.' title='Electronic mail' />
                <ContactLink link='https://www.github.com/marwil96' label='If you want to see my code.' title='Github' />
                <ContactLink link='https://linkedin.com/in/william-martinsson-a24a3b111' label='So professional.' title='Linkedin' />
                {/* <ContactLink link='william' label='If you want to see cool design stuff.' title='Behance' /> */}
                {/* <ContactLink link='www.medium.com' label='If you want to see my unpublished articles.' title='Medium' /> */}
            </div>
        </div>
        );
    }
}

export default CaseIndex;
