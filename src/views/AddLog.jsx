import React, { Component } from 'react';
import './AddLog.css';
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withKeycloak } from '@react-keycloak/web'
import Cookies from 'js-cookie';

import axios from 'axios'
import moment from 'moment'
class AddLog extends Component {

  constructor(props) {
    super(props)
    const { window, keycloak } = props;
    this.keycloak = keycloak;

    this.state = {
      title: "",
      description: "",
      startTime: new Date(),
      endTime: new Date()
    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    // send request to server
    this.props.handleClose()
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.keycloak.token
    }

    const dateFormat = 'yyyy/MM/DD HH:mm'

    const body = {
      userID: this.keycloak.subject,
      title: this.state.title,
      description: this.state.description,
      startTime: moment(this.state.startTime).format(dateFormat),
      endTime: moment(this.state.endTime).format(dateFormat)
    }

    axios.post('http://localhost:9000/api/log/record', body, { headers: headers })
      .then( response => {
        alert('Add log success');
      })
      .catch( err => {
        console.log(err);
        alert('Add log failed');
      })
    }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="add-log-dialog-title">Add Log</DialogTitle>
        <DialogContent>
          <form>
            <FormControl>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input id="title" onChange={(e) => {this.setState({title: e.target.value})}} />
            </FormControl>
            <br/><br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl>
                    <DatePicker
                      autoOk
                      label="Start date"
                      value={this.state.startTime}
                      format="yyyy/MM/dd"
                      onChange={(date) => {this.setState({startTime: date})}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <TimePicker
                      autoOk
                      label="Start time"
                      value={this.state.startTime}
                      onChange={(date) => {this.setState({startTime: date})}}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl>
                    <DatePicker
                      autoOk
                      label="End date"
                      value={this.state.endTime}
                      format="yyyy/MM/dd"
                      onChange={(time) => {this.setState({endTime: time})}}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <TimePicker
                      autoOk
                      label="End time"
                      value={this.state.endTime}
                      onChange={(time) => {this.setState({endTime: time})}}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            <br/>
            <FormControl>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input id="description" onChange={(e) => {this.setState({description: e.target.value})}}/>
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

export default withKeycloak(AddLog)

/*
  title
  activity
  start time
  end time
  description
*/
