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

class UserProfile extends Component {

  constructor(props) {
    super(props)
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
            <br/>
            <div className="profile-split"></div>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="displayName">Display Name</InputLabel>
              <Input id="displayName" value = {this.state.displayName} disabled/>
            </FormControl>
          </form>
        </DialogContent>
        <div className="profile-split"></div>
      </Dialog>
    )
  }

}

export default UserProfile
