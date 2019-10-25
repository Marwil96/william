import React, { Component } from 'react';
import 'babel-polyfill'
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ReactGA from 'react-ga';

import { Header, ImagePreview } from './components/common'

import Homepage from './components/Homepage';
import CaseIndex from './components/CaseIndex';
import Lab from './components/Lab';
import CaseContainer from './components/cases/CaseContainer';
import MasterDigitalDesign from './components/cases/MasterDigitalDesign';
import BarberBooking from './components/cases/BarberBooking';
import CryptoTracker from './components/cases/CryptoTracker';
import designCompetition from './components/cases/48H';
import errorPage from './components/errorPage';

import './App.scss';

const createHistory = require("history").createBrowserHistory;

let introState = 0;

ReactGA.initialize('UA-37970043-2'); //Unique Google Analytics tracking number

const history = createHistory();

history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {
    
  state = {
    pathname: '',
    redirect: false,
    intro: 0
  }
  

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  runIntroAnimation(intro) {
    introState = intro + introState ;

    return introState
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }
    componentDidMount() {
      this.setState( {
       pathname: window.location.pathname,
       previewImage: '',
       previewImageActive: false
      })
    }
    
    onBioHover() {
      const previewImage = document.querySelector('[data-preview-image]')
      const bio = document.querySelector('p')

      const links = document.querySelectorAll('[data-bio-target]')

      links.forEach((link) => {
        const image = link.getAttribute('data-bio-target')
        
        link.addEventListener("mouseover", () => {
          // this.setState({ previewImage: image, previewImageActive: true })
          previewImage.classList.remove('unactive')
          previewImage.classList.add('active')
          link.classList.add('active')
          bio.classList.add('unactive')
          previewImage.src = image;
        },{passive: true});

        link.addEventListener("touchstart", () => {
          // this.setState({ previewImage: image, previewImageActive: true })
          previewImage.classList.remove('unactive')
          previewImage.classList.add('active')
          link.classList.add('active')
          bio.classList.add('unactive')
          previewImage.src = image;
        },{passive: true} );
  
        link.addEventListener("mouseleave", () => {
          previewImage.classList.remove('active')
          previewImage.classList.add('unactive')
          link.classList.remove('active')
          bio.classList.remove('unactive')
        },{passive: true});

        link.addEventListener("touchend", () => {
          previewImage.classList.remove('active')
          previewImage.classList.add('unactive')
          link.classList.remove('active')
          bio.classList.remove('unactive')
        },{passive: true});
      })
    }

    onLinkHover() {
      const previewImage = document.querySelector('[data-preview-image]')

      const links = document.querySelectorAll('[data-contactlink]')

      if(window.matchMedia("(max-width: 700px)").matches === false) {
        links.forEach((link) => {
          const image = link.getAttribute('data-contactlink')

          link.addEventListener("mouseenter", (el) => {
            // this.setState({ previewImage: image, previewImageActive: true })
            previewImage.classList.remove('unactive')
            previewImage.classList.add('active')
            link.classList.add('active')
            previewImage.src = image;
            
            links.forEach((link) => {
              link.classList.add('active')

              if(link === el.target ) {
                link.classList.remove('active')
              }
            })
          } );
    
          link.addEventListener("mouseleave", (el) => {
            previewImage.classList.remove('active')
            previewImage.classList.add('unactive')
            link.classList.remove('active')
            previewImage.src = '';

            links.forEach((link) => { 
                link.classList.remove('active')
            })
          } );

      

          link.addEventListener("click", (el) => {
            previewImage.classList.remove('active')
            previewImage.classList.add('unactive')
            link.classList.remove('active')
            previewImage.src = '';

            links.forEach((link) => { 
                link.classList.remove('active')
            })
          } );
        })
      }
    }

  render() {
    return (
      <Router>
      <Route render={({ location }) => (
        <div className="App">
          <Header path={this.state.pathname} />
          <ImagePreview image={this.state.previewImage} state={this.state.previewImageActive} />
          <TransitionGroup>
            <CSSTransition
              classNames="my-node"
              timeout={550}
              key={location.key}
            >
              <Switch location={location}>
                <Route exact path="/" component={() => <Homepage previewImageFunc={this.onLinkHover} bioTargetHover={this.onBioHover} runIntroAnimation={this.runIntroAnimation} />} />
                <Route path="/lab" component={Lab} />
                <Route exact path="/case" component={() => <CaseIndex previewImageFunc={this.onLinkHover} />} />
                <Route path="/case/Akademiskahus" component={CaseContainer} />
                <Route path="/case/BarberBooking" component={BarberBooking} />
                <Route path="/case/MasterDigitalDesign" component={MasterDigitalDesign} />
                <Route path="/case/CryptoTracker" component={CryptoTracker} />
                <Route path="/case/48H" component={designCompetition} />
                <Route component={errorPage} />
                {this.renderRedirect()}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        )}/>
      </Router>
    );
  }
}

export default App;
