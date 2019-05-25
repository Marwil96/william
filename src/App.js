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
       pathname: window.location.pathname
      })

      this.onLinkHover()
    }
    
    onLinkHover() {
      console.log(document.querySelector('[data-contactlink]'))
    }
  render() {
    return (
      <Router>
        <div className="App">
          <Header path={this.state.pathname} />
          <ImagePreview image='https://www.thebalance.com/thmb/UZS2curMfBJpwbb8LrvpxttXhA0=/2103x1428/filters:fill(auto,1)/Stock-Market-Charts-Are-Useless-56a093595f9b58eba4b1ae5b.jpg' />
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
