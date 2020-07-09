import React, { Component } from 'react';
import AllRoutes from './routes/allRoutes';
import Sidebar from './views/Sidebar';
import Appbar from './views/Appbar';
import { KeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import './App.css';
import { enterTimelog } from 'actions';
import { connect } from 'react-redux';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keycloak: new Keycloak(process.env.REACT_APP_KEYCLOAK_FILE_PATH),
      initConfig: {
        pkceMethod: 'S256',
        onLoad: 'login-required'
      },
      mobileOpen: false,
      startDate: moment().add(-6, "days").toDate(),
      endDate: moment().toDate()
    }
    localStorage.setItem('startDate', this.state.startDate);
    localStorage.setItem('endDate', this.state.endDate);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.updateDates = this.updateDates.bind(this)
  }

  handleDrawerToggle () {
    this.setState({
      mobileOpen: !this.mobileOpen
    })
  };

  updateDates(startDate, endDate){
    this.setState({
      startDate: startDate,
      endDate: endDate
    })
    localStorage.setItem('startDate', startDate)
    localStorage.setItem('endDate', endDate)
  }

  render() {
    return (
      <div className="container" style={{maxWidth: '100%'}}>
        <KeycloakProvider
          keycloak={this.state.keycloak}
          initConfig={this.state.initConfig}
          onEvent={(event, error)=>{
            if(event==="onReady") {
              this.props.enterTimelog(this.state.keycloak.subject, this.state.keycloak.token)
            }}} >
          <div className="view">
            <Appbar mobileOpen={this.mobileOpen} handleDrawerToggle={this.handleDrawerToggle} />
            <Sidebar mobileOpen={this.mobileOpen} handleDrawerToggle={this.handleDrawerToggle} startDate={this.state.startDate} endDate={this.state.endDate} updateDates={this.updateDates}/>
            <div className="main">
              <AllRoutes startDate={this.state.startDate} endDate={this.state.endDate} />
            </div>
          </div>
        </KeycloakProvider>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    activityTypeList: state.activityTypeList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    enterTimelog: (userID, token) => dispatch(enterTimelog(userID, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
