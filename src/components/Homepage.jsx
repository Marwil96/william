import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Label, ProjectLink, MainTextBlock, ContactLink, BioBlock } from './common'
import hairAnimation from '../images/Hair_Child2.gif';


import '../App.scss';

class Homepage extends Component {

  state = {
    dreamString: ''
  }

  
  componentDidMount() {
    let introState = this.props.runIntroAnimation(1);
    
    this.props.previewImageFunc()
    this.props.bioTargetHover()

    // this.randomDreamString()

    this.startIntroAnimation(introState)
  }

  startIntroAnimation(introState) {
    if(introState === 2) {  
      document.querySelector('.container').classList.add('unactive')
      setTimeout( () => {
      document.querySelector('.container').classList.remove('unactive')
      document.querySelector('.container').classList.add('active')
      }, 300)
    } else {
      document.querySelector('.container').classList.remove('unactive')
      document.querySelector('.container').classList.remove('active')
    }
  }

  randomDreamString() {
    const dreamStrings = ['Dreaming about flying pferds.', 'Dreaming about a world where everyone uses chrome.', 'Dreaming about a world where notches does not exist.', 'Dreaming about a world made by falafelballs']

    this.setState({
      dreamString: dreamStrings[Math.floor(Math.random() * dreamStrings.length)]
    })

    let intervall = 4000;
    window.setInterval(() => {
      if(intervall < 7001) {
        intervall = intervall + 1000;
      }

      let arrayNumber = Math.floor(Math.random() * dreamStrings.length);
      
      if (dreamStrings.length > 1) {
        this.setState({
          dreamString: dreamStrings[arrayNumber]
        })

        dreamStrings.splice(arrayNumber, 1);
      }
    }, intervall);
  }

  render() {
    return (
      <div className="container">
        <canvas></canvas>
        <MainTextBlock 
            title={<span>Design driven developer.<br/> <span className='MainTextBlock-desktop'>Who works in the border between <br/> Design & Development.</span></span>}
            subtitle={<span>Currently working with the lovely design studio Momkai in central Amsterdam. <span className='MainTextBlock-animation'>Dreaming about a world where everyone uses chrome.</span></span> }
        />
        <Label label='Right now...' />
        <a href='mailto:marwil1996@gmail.com' className="alertText">Available for freelance work and new opportunities.</a>
        <Label label='Handpicked cases' />
        <div className="blockContainer">
          <ProjectLink link='barberbooking' label='Product development & Fullstack' title='Bookingsystem' imageUrl={hairAnimation} />
          <ProjectLink link='Akademiskahus' label='UI & UX Design' title='Akademiska hus' imageUrl='https://www.liveinlab.kth.se/polopoly_fs/1.691639.1550148607!/image/AH_ppt.png' />
          <ProjectLink link='CryptoTracker' label='Frontend development' title='Cryptotracker' imageUrl='http://pngimg.com/uploads/bitcoin/bitcoin_PNG47.png' />
          <Link className='link' to='/case'>Want to see more projects? </Link>
        </div>
        <Label label='A SHORT TEXT ABOUT ME' />
        <BioBlock />
        <span> </span>
        {/* <div className="linkText">
          <Link to='/lab'>WOW DID YOU RELinkAD THAT ENTIRE THING??  YOU SHOULD ALSO CHECK OF MY LAB. THIS ENTIRE BLOCK OF TEXT IS AN LINK TO THAT.</Link>
          <span className="nudgeText">Is this nudging?</span>
        </div> */}
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

export default Homepage;
