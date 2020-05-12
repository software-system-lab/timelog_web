import React, { Component } from 'react';
import AllRoutes from './routes/allRoutes';
import Sidebar from './views/Sidebar';

class App extends Component {

  render() {
    return (
      <div className="container" style={{margin: 0, maxWidth: '100%'}}>
        <Sidebar/>
        <AllRoutes/>
      </div>
    );
  }
}
export default App;
