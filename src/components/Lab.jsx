import React, { Component } from 'react';
import { Label, ProjectLink, MainTextBlock, ContactLink } from './common'
import '../App.scss';

class Lab extends Component {
  render() {
    return (
      <div className="container">
        <MainTextBlock 
            title='Finding the why’s and when’s instead of the how’s.'
            subtitle='Alot of the new technlogies are easier then ever to access and use. They advertise about performance and code experience but loften forgets about the reason to use them. On this page Im trying to find the reasoning behind different technlogies and in which usecases you should use them.'
        />

        <Label label='Experiments' />
        <div className="blockContainer">
          <ProjectLink label='Product development & Fullstack' title='Bookingsystem' />
          <ProjectLink label='UI & UX Design' title='Akademiska hus' />
          <ProjectLink label='Frontend development' title='Cryptotracker' />
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

export default Lab;
