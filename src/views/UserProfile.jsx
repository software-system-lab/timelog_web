import React, { Component } from 'react';
import './UserProfile.css'

import {
  FormControl,
  InputLabel,
  Input,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core';

import { withKeycloak } from '@react-keycloak/web'

class UserProfile extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;
    this.state = {
      name: "",
      email: "",
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    setInterval(()=> {
      if (this.keycloak.idTokenParsed) {
        this.setState({
          name: this.keycloak.idTokenParsed.given_name,
          email: this.keycloak.idTokenParsed.email,
        })
      }
    }, 100);
  }

  submit() {
    // send request to server
    this.props.handleClose()
    }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="edit-user-profile">My Profile</DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" value = {this.state.name} disabled/>
            </FormControl>
            <br/>
            <div className="profile-split"></div>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" value = {this.state.email} disabled/>
            </FormControl>
          </form>
        </DialogContent>
        <div className="profile-split"></div>
      </Dialog>
    )
  }

}

export default withKeycloak(UserProfile)
