import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Header, ImagePreview } from './components/common'

import Homepage from './components/Homepage';
import Lab from './components/Lab';
import CaseContainer from './components/cases/CaseContainer';
import BarberBooking from './components/cases/BarberBooking';
import errorPage from './components/errorPage';

import './App.scss';

class App extends Component {
    
  state = {
    pathname: '',
    redirect: false
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
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
        });

        link.addEventListener("touchstart", () => {
          // this.setState({ previewImage: image, previewImageActive: true })
          previewImage.classList.remove('unactive')
          previewImage.classList.add('active')
          link.classList.add('active')
          bio.classList.add('unactive')
          previewImage.src = image;
        } );
  
        link.addEventListener("mouseleave", () => {
          previewImage.classList.remove('active')
          previewImage.classList.add('unactive')
          link.classList.remove('active')
          bio.classList.remove('unactive')
        });

        link.addEventListener("touchend", () => {
          previewImage.classList.remove('active')
          previewImage.classList.add('unactive')
          link.classList.remove('active')
          bio.classList.remove('unactive')
        });
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

            links.forEach((link) => { 
                link.classList.remove('active')
            })
          } );

      

          link.addEventListener("click", (el) => {
            previewImage.classList.remove('active')
            previewImage.classList.add('unactive')
            link.classList.remove('active')

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
      <Route  render={({ location }) => (
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
                <Route exact path="/" component={() => <Homepage previewImageFunc={this.onLinkHover} bioTargetHover={this.onBioHover} />} />
                <Route path="/lab" component={Lab} />
                <Route path="/case/Akademiskahus" component={CaseContainer} />
                <Route path="/case/BarberBooking" component={BarberBooking} />
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
