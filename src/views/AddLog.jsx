import React, { Component } from 'react';

import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem
} from '@material-ui/core';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withKeycloak } from '@react-keycloak/web'
import axios from 'axios'
import moment from 'moment'
import { connect } from 'react-redux'

class AddLog extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;

    this.state = {
      title: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
      activityTypeName: ""
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

    const dateFormat = 'YYYY/MM/DD HH:mm'

    const body = {
      userID: this.keycloak.subject,
      title: this.state.title,
      description: this.state.description,
      startTime: moment(this.state.startTime).format(dateFormat),
      endTime: moment(this.state.endTime).format(dateFormat),
      activityTypeName: this.state.activityTypeName
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
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input id="title" onChange={(e) => {this.setState({title: e.target.value})}} />
            </FormControl>
            <br/><br/>
            <FormControl fullWidth>
            <InputLabel id="activity-type-select-label">Activity Type</InputLabel>
              <Select
                labelId="activity-type-select-label"
                id="activity-type-select"
                value={this.state.activityTypeName}
                onChange={(event) => this.setState({activityTypeName: event.target.value})}
                input={<Input />}
              >
                {
                  this.props.activityTypeList.map((activityType, key) => {
                    return (
                      <MenuItem value={activityType.name}>{activityType.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            <br/><br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl className="">
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
                      //value={this.state.endTime}  // -
                      //defaultValue={this.state.endTime.setHours(this.state.startTime.getHours()+1)}
                      value={this.state.endTime}
                      onChange={(time) => {this.setState({endTime: time})}}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            <br/>
            <FormControl fullWidth={true}>
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

function mapStateToProps(state) {
  return {
    activityTypeList: state.activityTypeList
  }
}

export default connect(mapStateToProps, null)(withKeycloak(AddLog))
