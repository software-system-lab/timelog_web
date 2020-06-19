import React, { Component } from 'react';

import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

import { withKeycloak } from '@react-keycloak/web'

class UserProfile extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;

    this.state = {
      userId: "",
      name: "",
      address: "",
    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    // send request to server
    this.props.handleClose()
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': this.keycloak.token
    // }

    // const dateFormat = 'YYYY/MM/DD HH:mm'

    // const body = {
    //   userID: this.keycloak.subject,
    //   title: this.state.title,
    //   description: this.state.description,
    //   birthday: moment(this.state.startTime).format(dateFormat)
    // }

    // axios.post('http://localhost:9000/api/log/record', body, { headers: headers })
    //   .then( response => {
    //     alert('Add log success');
    //   })
    //   .catch( err => {
    //     console.log(err);
    //     alert('Add log failed');
    //   })
    }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="edit-user-profile">My Profile</DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="userId">ID</InputLabel>
              <Input id="userId" onChange={(e) => {this.setState({userId: e.target.value})}} />
            </FormControl>
            <br/>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" onChange={(e) => {this.setState({name: e.target.value})}} />
            </FormControl>
            <br/>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input id="address" onChange={(e) => {this.setState({address: e.target.value})}}/>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

}

export default withKeycloak(UserProfile)

