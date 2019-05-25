import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Header, ImagePreview } from './components/common'

import Homepage from './components/Homepage';
import Lab from './components/Lab';

import './App.scss';

class App extends Component {
    
  state = {
    pathname: ''
  }
    componentDidMount() {
      this.setState( {
       pathname: window.location.pathname,
       previewImage: '',
       previewImageActive: false
      })

      this.onLinkHover()
    }
    
    onLinkHover() {
      console.log(document.querySelector('[data-contactlink]'))
      const previewImage = document.querySelector('[data-previewImage]')

      const links = document.querySelectorAll('[data-contactlink]')

      links.forEach((link) => {
        const image = link.getAttribute('data-contactlink')

        link.addEventListener("mouseover", () => {
          // this.setState({ previewImage: image, previewImageActive: true })
          previewImage.classList.remove('unactive')
          previewImage.classList.add('active')
          previewImage.src = image;
        } );
  
        link.addEventListener("mouseleave", () => {
          previewImage.classList.remove('active')
          previewImage.classList.add('unactive')
        } );
      })
    }
  render() {
    return (
      <Router>
        <div className="App">
          <Header path={this.state.pathname} />
          <ImagePreview image={this.state.previewImage} state={this.state.previewImageActive} />
          <TransitionGroup>
            <CSSTransition
              classNames="my-node"
              timeout={300}
              id={this.state.pathname}
            >
              <Switch location={this.props.location}>
                <Route exact path="/" component={Homepage} />
                <Route path="/lab" component={Lab} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </Router>
    );
  }
}

export default App;
