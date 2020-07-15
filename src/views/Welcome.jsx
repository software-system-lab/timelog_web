import React, { Component } from 'react';

import './Welcome.css';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <h1 class="dropWord">Time Log</h1>
        <div class="drop-container">
          <div class="drop"></div>
        </div>
        {/* <img alt="Welcome to timelog!" src="timelog.png" className="welcome-bg"/> */}
      </div>
      
    );
  }

  
}
export default Welcome;
