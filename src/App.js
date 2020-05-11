import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import Welcome from './views/Welcome';
import Secured from './views/Secured';
import AllRoutes from './routes/allRoutes';
import { Row, Col } from 'react-bootstrap';
import Sidebar from './views/Sidebar';

class App extends Component {

  render() {
    return (
      <div className="container" style={{margin: 0, maxWidth: '100%'}}>
        <Row>
          <Col md={2} >
            <Sidebar/>
          </Col>
          <Col md={10}>
            <AllRoutes/>
          </Col>
        </Row>
      </div>
    );
  }
}
export default App;
