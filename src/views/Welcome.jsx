import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './Welcome.css';
import './Animation.css';


class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        {/* <h1 className="dropWord">Time Log</h1> */}
        <div className="drop-container">
          <div className="drop" >
            <img className="welcomeLogo" src="tl_logo3.png"></img>
          </div>
        </div>
        {/* <img alt="Welcome to timelog!" src="timelog.png" className="welcome-bg"/> */}
        <div className="getStarted fadeIn">
          <Button variant="outlined" style={{color:"#00C6CF", borderColor:"#00C6CF"}}>
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}
export default Welcome;
