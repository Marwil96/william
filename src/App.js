import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Header } from './components/common'

import Homepage from './components/Homepage';
import Lab from './components/Lab';

import './App.scss';

class App extends Component {
    
  state = {
    pathname: ''
  }
    componentDidMount() {
      console.log(this.state.pathname, window.location.pathname)
      this.setState( {
       pathname: window.location.pathname
      })
    }
    changeHeader() {
      console.log(window.location.pathname)
    } 
  render() {
    return (
      <Router>
        <div className="App">
          <Header path={this.state.pathname} />
          <TransitionGroup>
            <CSSTransition
              classNames="my-node"
              timeout={300}
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
