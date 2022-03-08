import React, { Component } from 'react';
import AllRoutes from './routes/allRoutes';
import Sidebar from './views/Sidebar';
import Appbar from './views/Appbar';
import './App.css';
import { enterTimelog } from 'actions';
import { connect } from 'react-redux';
import moment from 'moment';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import axios from 'axios'
import { parseJWT } from './utils'
import { CircularProgress, Dialog } from '@material-ui/core';

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

  async componentDidMount() {
      // const searchParams = new URLSearchParams(this.props.location.search)
      // if (searchParams.get('uid') !== null) {
      //   localStorage.setItem('uid', searchParams.get('uid'))
      //   localStorage.setItem('cn', searchParams.get('cn'))
      //   localStorage.setItem('sn', searchParams.get('sn'))
      //   localStorage.setItem('givenName', searchParams.get('givenName'))
      //   localStorage.setItem('displayName', searchParams.get('displayName'))
      //   localStorage.setItem('mail', searchParams.get('mail'))
      // } else {
      //   if (!!!localStorage.getItem('uid')) {
      //     var amsURL = process.env.REACT_APP_AMS_LOGIN_URL
      //     amsURL += '?' + encodeURIComponent('redirect_url=' + window.location.href)
      //     window.location.replace(amsURL)
      //     return
      //   }
      // }
      // this.props.enterTimelog(localStorage.getItem('uid'), null)


    const query = new URLSearchParams(decodeURIComponent(window.location.search))
    const accessToken =
      query.get('access_token') || localStorage.getItem('access_token')
  
    const amsWebUrl = process.env.REACT_APP_AMS_WEB
    const amsApiUrl = process.env.REACT_APP_AMS_HOST
    const amsUrl = `${amsWebUrl}/login?${encodeURIComponent('redirect_url=' + window.location.href)}`

    // check if access token valid
    if (!accessToken || !parseJWT(accessToken)) {
      window.location.replace(amsUrl)
      return
    }
  
    localStorage.setItem('access_token', accessToken)

    try {
      const res = await axios.get(`${amsApiUrl}/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      localStorage.setItem('uid', res.data.userId)
      localStorage.setItem('cn', res.data.username)
      localStorage.setItem('displayName', res.data.displayName)
      localStorage.setItem('givenName', res.data.displayName.split(' ')[0])
      localStorage.setItem('mail', res.data.email)
    } catch (err) {
      alert('failed to get user profile')
      // window.location.replace(amsUrl)
      return
    }
    this.props.enterTimelog(localStorage.getItem('uid'), null)
  }

  handleDrawerToggle () {
    this.setState({
      mobileOpen: !this.state.mobileOpen
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dialog
          open={this.props.isUpdatingTeamDashboard}
          aria-labelledby="loading-team-dashboard-mask"
        >
          <div style={{'display': 'flex', 'alignItems': 'center', 'flexDirection': 'column', 'color': 'white'}}>
            <CircularProgress size={60} />
            <h2 style={{'background': 'rgba(0, 0, 0, 0.4)'}}>Fetching Data.....</h2>
          </div>
        </Dialog>
        <div className="container" style={{maxWidth: '100%'}}>
          <div className="view">
            <Appbar mobileOpen={this.mobileOpen} handleDrawerToggle={this.handleDrawerToggle} />
            <Sidebar mobileOpen={this.state.mobileOpen} handleDrawerToggle={this.handleDrawerToggle} startDate={this.state.startDate} endDate={this.state.endDate} updateDates={this.updateDates}/>
            <div className="main">
              <AllRoutes startDate={this.state.startDate} endDate={this.state.endDate} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {

  console.log(state)
  return {
    activityTypeList: state.activityTypeList,
    isUpdatingTeamDashboard: state.isUpdatingTeamDashboard,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    enterTimelog: (userID, token) => dispatch(enterTimelog(userID, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
