import React, { Component } from 'react';
import AllRoutes from './routes/allRoutes';
import Sidebar from './component_connect_redux/Sidebar';
import Appbar from './component_connect_redux/Appbar';
import './App.css';
import moment from 'moment';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { post } from './request/http'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      initConfig: {
        pkceMethod: 'S256',
        onLoad: 'login-required'
      },
      mobileOpen: false,
      startDate: moment().add(-6, 'days').toDate(),
      endDate: moment().toDate()
    }
    localStorage.setItem('startDate', this.state.startDate);
    localStorage.setItem('endDate', this.state.endDate);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.updateDates = this.updateDates.bind(this)
  }

  componentDidMount() {
      const searchParams = new URLSearchParams(this.props.location.search)
      if (searchParams.get('uid') !== null) {
        localStorage.setItem('uid', searchParams.get('uid'))
        localStorage.setItem('cn', searchParams.get('cn'))
        localStorage.setItem('sn', searchParams.get('sn'))
        localStorage.setItem('givenName', searchParams.get('givenName'))
        localStorage.setItem('displayName', searchParams.get('displayName'))
        localStorage.setItem('mail', searchParams.get('mail'))
      } else {
        if (!!!localStorage.getItem('uid')) {
          var amsURL = process.env.REACT_APP_AMS_LOGIN_URL
          amsURL += '?' + encodeURIComponent('redirect_url=' + window.location.href)
          window.location.replace(amsURL)
          return
        }
      }

      const headers = {}
      const body = {
        userID: localStorage.getItem('uid')
      }
      post('/login', body, headers, response => {
        alert("login Success.")
    }, err => {
      console.log(err)
      alert("Login to timelog failed")
    })
  }

  handleDrawerToggle () {
    this.setState({
      mobileOpen: !this.mobileOpen
    })
  }

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="container" style={{maxWidth: '100%'}}>
          <div className="view">
            <Appbar mobileOpen={this.mobileOpen} handleDrawerToggle={this.handleDrawerToggle} />
            <Sidebar mobileOpen={this.mobileOpen} handleDrawerToggle={this.handleDrawerToggle} startDate={this.state.startDate} endDate={this.state.endDate} updateDates={this.updateDates}/>
            <div className="main">
              <AllRoutes startDate={this.state.startDate} endDate={this.state.endDate} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
