import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './Welcome.css';
import './Animation.css';


class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="drop-container">
          <div className="drop" >
            <img className="welcome-logo" src="WelcomeLOGO.png"></img>
          </div>
        </div>
        <div className="get-started-button fade-in">
          <Button variant="outlined" style={{color:"#00C6CF", borderColor:"#00C6CF"}}>
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}
export default Welcome;
