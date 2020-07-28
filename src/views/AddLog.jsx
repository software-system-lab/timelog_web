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
import moment from 'moment'
import { connect } from 'react-redux'
import { newLog } from 'actions'

class AddLog extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;

    const currentTime = moment();
    const endTime = currentTime.toDate()
    const startTime = currentTime.add(-1, "hours").toDate()

    this.state = {
      title: "",
      description: "",
      startTime: startTime,
      endTime: endTime,
      activityTypeName: ""
    }
    this.submit = this.submit.bind(this)
  }

  submit() {

    if (!this.state.title || this.state.title === ''){
      alert("Title should not be empty.")
      return
    }

    if (!this.state.activityTypeName || this.state.activityTypeName === ''){
      alert("Activity Type is not selected.")
      return
    }

    if (moment(this.state.endTime) <= moment(this.state.startTime)){
      alert("Start Time should be eariler than End Time.")
      return
    }

    const dateFormat = 'YYYY/MM/DD HH:mm'
    // send request to server
    this.props.handleClose()

    this.props.newLog(
      this.keycloak.subject,
      this.keycloak.token,
      this.state.title,
      this.state.activityTypeName,
      moment(this.state.startTime).format(dateFormat),
      moment(this.state.endTime).format(dateFormat),
      this.state.description
    )

    this.setState({
        title: "",
        activityTypeName: "",
        startTime: moment().add(-1, "hours").toDate(),
        endTime: moment().toDate(),
        description: ""
    })
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="add-log-dialog-title">Add Log</DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth={true} required={true}>
              <InputLabel htmlFor="title" required={true} >Title</InputLabel>
              <Input id="title" onChange={(e) => {this.setState({title: e.target.value})}} />
            </FormControl>
            <br/><br/>
            <FormControl fullWidth>
            <InputLabel id="activity-type-select-label" required={true} >Activity Type</InputLabel>
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
                      <MenuItem value={activityType.name} key={key}>{activityType.name}</MenuItem>
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
                      required={true}
                      maxDate={moment().toDate()}
                      value={this.state.startTime}
                      format="yyyy/MM/dd"
                      onChange={ date => {
                        const startTime = moment(date)
                        const endTime = moment(this.state.endTime)
                        endTime.year(startTime.year())
                          .month(startTime.month())
                          .date(startTime.date())
                        this.setState({
                          startTime: startTime,
                          endTime: endTime
                        })
                      } }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <TimePicker
                      autoOk
                      label="Start time"
                      required={true}
                      minutesStep={5}
                      value={this.state.startTime}
                      onChange={ time => {
                        const startTime = moment(time)
                        let endTime = moment(this.state.endTime)
                        const dateFormat = "yyyy/MM/DD"
                        const startDate = moment(startTime.format(dateFormat))
                        const endDate = moment(endTime.format(dateFormat))
                        if (startDate.isSame(endDate)) {
                          endTime = moment(time).add(1, "hours")
                          this.setState({ endTime: endTime.toDate() })
                        }
                        this.setState({ startTime: time })
                      } }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl>
                    <DatePicker
                      autoOk
                      label="End date"
                      required={true}
                      value={this.state.endTime}
                      format="yyyy/MM/dd"
                      onChange={ date => {
                        const startTime = moment(this.state.startTime)
                        const endTime = moment(date)
                        const dateFormat = "yyyy/MM/dd"
                        const startDate = moment(startTime.format(dateFormat))
                        const endDate = moment(endTime.format(dateFormat))

                        if (startDate < endDate) {
                          startTime.year(endTime.year())
                            .month(endTime.month())
                            .date(endTime.date())
                          this.setState({
                            startTime: startTime
                          })
                        }
                        this.setState({
                          endTime: endTime
                        })
                      } }
                      maxDate={moment().toDate()}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <TimePicker
                      autoOk
                      label="End time"
                      required={true}
                      minutesStep={5}
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

function mapDispatchToProps(dispatch) {
  return {
    newLog: (userID, token, title, activityTypeName, startTime, endTime, description) => dispatch(newLog(userID, token, title, activityTypeName, startTime, endTime, description))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLog)
