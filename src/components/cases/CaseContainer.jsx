import React, { Component } from 'react';
import { Label, ProjectLink, MainTextBlock, ContactLink } from '../common'

import './case.scss';

class CaseContainer extends Component {
    render() {
        return (
            <div className="CaseContainer">
                <div className="CaseContainer-hero">  
                    <span>Website</span>
                    <h1>Devolve digital</h1>
                </div>
                <div className="description">
                    <span>Description</span>
                    <p>At Squarespace, our mission is to empower our users by offering accessible technology and high-quality design. Our Front Site team works on many of our digital touchpoints, and our goal is to provide guidance and inspiration to millions of visitors every year.</p>
                </div>
            </div>
        );
    }
}

export default CaseContainer;
