import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { MainTextBlock } from './common'


import '../App.scss';

class errorPage extends Component {
  render() {
    return (
      <div className="container">
        <MainTextBlock 
            title={<h1 style={{'margin': 0}}>Det ligger en hund begraven...</h1>}
        />
        <Link to='/' className="alertText">LINK BACK TO HOMEPAGE</Link>
      </div>
    );
  }
}

export default errorPage;
