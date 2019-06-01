import React, { Component } from 'react';
import { Label, ProjectLink, MainTextBlock, ContactLink, MetadataSubSection } from '../common'

import caseImage from '../../images/skara.png'

import './case.scss';

class CaseContainer extends Component {
    render() {
        return (
            <div className="CaseContainer">
                <div className="CaseContainer-hero">  
                    <div className='CaseContainer-heroTextContainer'>
                        <span>Website</span>
                        <h1>Devolve digital</h1>

                        <div className="description">
                            <span>Description</span>
                            <p>At Squarespace, our mission is to empower our users by offering accessible technology and high-quality design. Our Front Site team works on many of our digital touchpoints, and our goal is to provide guidance and inspiration to millions of visitors every year.</p>
                        </div>
                    </div>

                    <img className='CaseContainer-heroImage' src={caseImage} />
                </div>

                <div className='CaseContainer-content'>
                    <MetadataSubSection label='Client' title='Devolve digital'  />
                    <MetadataSubSection label='Goal' title='Increase revenue with 20% over a one year period. Attract new customers.'  />
                    <MetadataSubSection label='Role' title='Front-end developer'  />
                </div>
            </div>
        );
    }
}

export default CaseContainer;
