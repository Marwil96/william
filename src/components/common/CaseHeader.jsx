import React, { Component } from "react";

import ImageLoader from './ImageLoader'
import './common.scss'

class CaseHeader extends Component {
    
    componentDidMount() {
        const img = new Image();
        img.src = this.props.image;

        setTimeout( () => {
            document.querySelector('.CaseHeader').classList.add('active')
        }, 100
        )
    }

    render () {
        return (
            <div className="CaseHeader">  
                <div className='CaseHeader-heroTextContainer'>
                    <span>{this.props.category}</span>
                    <h1>{this.props.title}</h1>
                        {/* <div className="description">
                        <span>Description</span>
                        <p>At Squarespace, our mission is to empower our users by offering accessible technology and high-quality design. Our Front Site team works on many of our digital touchpoints, and our goal is to provide guidance and inspiration to millions of visitors every year.</p>
                        </div> */}
                </div>
                {this.props.image && (
                    <ImageLoader  alt='HeroImage' src={this.props.image} className="CaseHeader-heroImage" />
                )}
            </div>
        )
    }
}

export default CaseHeader;