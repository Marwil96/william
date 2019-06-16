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
            <ProjectLink link='https://marwil96.github.io/portfolio/#/project48H' label='Print' title='Second place at 48H' type='external' imageUrl='' />
            <ProjectLink link='https://marwil96.github.io/portfolio/#/projectKnowel#1' label='Fullstack development' title='Knowel' type='external' imageUrl='' />
            <ProjectLink link='https://marwil96.github.io/Lyricdisplay/' label='Frontend development' title='Lyricplatform' type='external' imageUrl='' />
            <ProjectLink link='https://marwil96.github.io/Dronelist/' label='Frontend development & Design' title='Dronelist' type='external' imageUrl='' />
            <ProjectLink link='https://marwil96.github.io/portfolio/#/projectThrive' label='Design' title='Thrive' type='external' imageUrl='' />
            </div>
        </div>
        );
    }
}

export default CaseIndex;
