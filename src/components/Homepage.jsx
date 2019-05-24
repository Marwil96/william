import React, { Component } from 'react';
import { Label, ProjectLink, MainTextBlock, ContactLink } from './common'
import '../App.scss';

class Homepage extends Component {
  render() {
    return (
      <div className="container">
        <MainTextBlock 
            title='Design driven developer. Who believes in a world where developers and designers can live together.'
            subtitle='A digital designer who loves to develop unique interactive experiences. Currently doing my internship at Momkai in Amsterdam.'
        />
        <Label label='Right now...' />
        <a href='#' className="alertText">Available for freelance work and new opportunities.</a>
        <Label label='Handpicked cases like a bottle of wine' />
        <div className="blockContainer">
          <ProjectLink label='Product development & Fullstack' title='Bookingsystem' />
          <ProjectLink label='UI & UX Design' title='Akademiska hus' />
          <ProjectLink label='Frontend development' title='Cryptotracker' />
        </div>
        <Label label='A SHORT TEXT ABOUT ME' />
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
