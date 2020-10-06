import React from 'react';
import { Button } from '@material-ui/core';
import './Welcome.css';
import './Animation.css';
import Tutorial from './Tutorial'

export default function Welcome() {
  const [tutorialOpen, setTutorialOpen] = React.useState(false);

  const handleTutorialOpen = () => {
    setTutorialOpen(true);
  };

  const handleTutorialClose = () => {
    setTutorialOpen(false);
  };

  return (
  <div>
    <div className="welcome">
      <div className="dropwater-container">
        <div className="dropwater" ></div>
      </div>
      <div className="drop-container">
        <div className="drop" >
          <img className="welcome-logo" alt="welcome" src="WelcomeLOGO.png"></img>
        </div>
      </div>
      <div className="get-started-button fade-in">   
          <Button variant="outlined" color="primary" onClick={handleTutorialOpen}>
            Get Started
          </Button>
      </div>
    </div>
    <Tutorial className="Tutorial" open={tutorialOpen} handleClose={handleTutorialClose}/>
  </div>
  );
}
