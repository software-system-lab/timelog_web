import React, { Component } from 'react';
import AllRoutes from './routes/allRoutes';
import Sidebar from './views/Sidebar';
import { KeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keycloak: new Keycloak('keycloak.json'),
      initConfig: {
        pkceMethod: 'S256',
        onLoad: 'login-required'
      }
    }
  }

  render() {
    return (
      <div className="container" style={{maxWidth: '100%'}}>
        <KeycloakProvider
          keycloak={this.state.keycloak}
          initConfig={this.state.initConfig} >
          <div class='view'>
            <Sidebar />
            <main class='main'>
              <AllRoutes />
            </main>
          </div>
        </KeycloakProvider>
      </div>
    );
  }
}
export default App;
