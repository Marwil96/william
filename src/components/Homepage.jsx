import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Label, ProjectLink, MainTextBlock, ContactLink, BioBlock } from './common'
import hairAnimation from '../images/Hair_Child2.gif';


import '../App.scss';

class Homepage extends Component {
  componentDidMount() {
    this.props.previewImageFunc()
    this.props.bioTargetHover()
  }
  render() {
    return (
      <div className="container">
        <MainTextBlock 
            title={<h1>Design driven developer.<br/> <h1 className='MainTextBlock-desktop'>Who works in the border between <br/> Design & Development.</h1></h1>}
            subtitle="Currently doing my internship at the design studio Momkai in central Amsterdam."
        />
        <Label label='Right now...' />
        <a href='mailto:marwil1996@gmail.com' className="alertText">Available for freelance work and new opportunities.</a>
        <Label label='Handpicked cases' />
        <div className="blockContainer">
          <ProjectLink link='barberbooking' label='Product development & Fullstack' title='Bookingsystem' imageUrl={hairAnimation} />
          <ProjectLink link='Akademiskahus' label='UI & UX Design' title='Akademiska hus' imageUrl='https://www.liveinlab.kth.se/polopoly_fs/1.691639.1550148607!/image/AH_ppt.png' />
          {/* <ProjectLink link='case' label='Frontend development' title='Cryptotracker' imageUrl='https://www.liveinlab.kth.se/polopoly_fs/1.691639.1550148607!/image/AH_ppt.png' /> */}
        </div>
        <Label label='A SHORT TEXT ABOUT ME' />
        <BioBlock />
        <span> </span>
        {/* <div className="linkText">
          <Link to='/lab'>WOW DID YOU RELinkAD THAT ENTIRE THING??  YOU SHOULD ALSO CHECK OF MY LAB. THIS ENTIRE BLOCK OF TEXT IS AN LINK TO THAT.</Link>
          <span className="nudgeText">Is this nudging?</span>
        </div> */}
        <div className="blockContainer">
          <ContactLink link='mailto:marwil1996@gmail.com' label='Talk to me or exchange doggopics both works great.' title='Electronic mail' />
          <ContactLink link='www.github.com/marwil96' label='If you want to see my code.' title='Github' />
          {/* <ContactLink link='william' label='If you want to see cool design stuff.' title='Behance' /> */}
          {/* <ContactLink link='www.medium.com' label='If you want to see my unpublished articles.' title='Medium' /> */}
        </div>
      </div>
    );
  }
}

export default Homepage;
