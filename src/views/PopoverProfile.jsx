import React, { Component } from 'react';
import './UserProfile.css'
import {
  FormControl,
  InputLabel,
  Avatar,
} from '@material-ui/core';

class PopoverProfile extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;
    this.state = {
      name: localStorage.getItem("cn"),
      email: localStorage.getItem("mail"),
      displayName: localStorage.getItem("displayName")
    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    // send request to server
    this.props.handleClose()
  }

  render() {
    return (
        <div className="profile-box">
            <center>
            <form className="profile-form"> 
                <FormControl>
                    <Avatar alt={this.state.displayName} src="/broken-image.jpg"/>
                </FormControl>
                <br/>
                <FormControl className="profile-text" fullWidth={true}>
                    <InputLabel id="displayName">{this.state.displayName}</InputLabel>
                </FormControl>
                <br/>
                <FormControl fullWidth={true}>
                    <InputLabel id="name">{this.state.name}</InputLabel>
                </FormControl>
                <br/>
                <FormControl fullWidth={true}>
                    <InputLabel id="email">{this.state.email}</InputLabel>
                </FormControl>
                <br/>
            </form>
            </center>
        </div>
    )
  }
}

export default PopoverProfile
