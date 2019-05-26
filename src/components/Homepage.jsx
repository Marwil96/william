import React, { Component } from 'react';
import { Label, ProjectLink, MainTextBlock, ContactLink, BioBlock } from './common'

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
            title={<h1>Design driven developer.<br/> Who believes in a world where developers and designers can live together.</h1>}
            subtitle='A digital designer who loves to develop unique interactive experiences. Currently doing my internship at Momkai in Amsterdam.'
        />
        <Label label='Right now...' />
        <a href='#1' className="alertText">Available for freelance work and new opportunities.</a>
        <Label label='Handpicked cases like a bottle of wine' />
        <div className="blockContainer">
          <ProjectLink label='Product development & Fullstack' title='Bookingsystem' imageUrl='https://www.thebalance.com/thmb/UZS2curMfBJpwbb8LrvpxttXhA0=/2103x1428/filters:fill(auto,1)/Stock-Market-Charts-Are-Useless-56a093595f9b58eba4b1ae5b.jpg' />
          <ProjectLink label='UI & UX Design' title='Akademiska hus' imageUrl='https://fbcd.co/product-lg/de44e88fe1e18671a127f2136c0f72f9_resize.jpg' />
          <ProjectLink label='Frontend development' title='Cryptotracker' imageUrl='https://www.pinclipart.com/picdir/middle/36-360232_samsung-mobile-phone-clipart-transparent-background-smartphone-png.png' />
        </div>
        <Label label='A SHORT TEXT ABOUT ME' />
        <BioBlock />
        <span> </span>
        <div className="linkText">
          <a>WOW DID YOU READ THAT ENTIRE THING??  YOU SHOULD ALSO CHECK OF MY LAB. THIS ENTIRE BLOCK OF TEXT IS AN LINK TO THAT.</a>
          <span className="nudgeText">Is this nudging?</span>
        </div>
        <div className="blockContainer">
          <ContactLink label='Talk to me or exchange doggopics both works great.' title='Electronic mail' />
          <ContactLink label='If you want to see my code.' title='Github' />
          <ContactLink label='If you want to see cool design stuff.' title='Behance' />
          <ContactLink label='If you want to see my unpublished articles.' title='Medium' />
        </div>
      </div>
    );
  }
}

export default Homepage;
