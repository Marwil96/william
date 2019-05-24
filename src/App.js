import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from './components/common'

import Homepage from './components/Homepage';
import Lab from './components/Lab';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Homepage} />
          <Route path="/lab" component={Lab} />
        </div>
      </Router>
    );
  }
}

export default App;
