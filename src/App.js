import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import Welcome from './views/Welcome';
import Secured from './views/Secured';
import AllRoutes from './routes/allRoutes';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <ul>
          <li><Link to="/welcome">public component</Link></li>
          <li><Link to="/secured">Login</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        <h3>main page</h3>
        <AllRoutes/>
      </div>
    );
  }
}
export default App;
