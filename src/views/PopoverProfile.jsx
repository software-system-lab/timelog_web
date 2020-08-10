import React, { Component } from 'react';
import './UserProfile.css'
import {
  Avatar,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

class PopoverProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: localStorage.getItem("cn"),
      email: localStorage.getItem("mail"),
      displayName: localStorage.getItem("displayName")
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
      localStorage.clear();
      window.location.href = '/';
  }

  render() {
    return (
      <center>
        <div className="profile-box">
          <div className="profile-split"></div>
          <Avatar className="avatar-name" alt={this.state.displayName} src="/broken-image.jpg"/>
          <div className="profile-split"></div>
          <div>
            <p>{this.state.displayName}</p>
            <p>{this.state.name}</p>
            <p>{this.state.email}</p>
          </div>
          <div className="profile-split"></div>
          <Button 
            className = "logout-btn" 
            variant="contained" 
            color="primary" 
            style = {{minWidth : "6vw"}}
            onClick = {this.logout}
            >
              LOGOUT
          </Button>
        </div>
      </center>
    )
  }
}

export default PopoverProfile
