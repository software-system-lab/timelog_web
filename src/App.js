import React, { Component } from 'react';
import AllRoutes from './routes/allRoutes';
import Sidebar from './views/Sidebar';
import Appbar from './views/Appbar';
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
      },
      mobileOpen: false
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle () {
    this.setState({
      mobileOpen: !this.mobileOpen
    })
    console.log(this.state.mobileOpen + "rrr")
  };

  render() {

    return (
      <div className="container" style={{maxWidth: '100%'}}>
        <KeycloakProvider
          keycloak={this.state.keycloak}
          initConfig={this.state.initConfig} >
          <div className="view">
            <Appbar mobileOpen={this.mobileOpen} handleDrawerToggle={this.handleDrawerToggle}/>
            <Sidebar mobileOpen={this.mobileOpen} handleDrawerToggle={this.handleDrawerToggle}/>
            <div className="main">
              <AllRoutes />
            </div>
          </div>
        </KeycloakProvider>
      </div>
    );
  }
}
export default App;
