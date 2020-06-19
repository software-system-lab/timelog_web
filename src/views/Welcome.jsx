import React, { Component } from 'react';

import './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <img alt="Welcome to timelog!" src="timelog.png" className="welcome-bg"/>
      </div>
    );
  }

  
}
export default Welcome;
