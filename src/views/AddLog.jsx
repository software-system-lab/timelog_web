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
import moment from 'moment'
import { post } from '../request/http'
import {load_history, load_dash_board} from '../request/loadData'

class AddLog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      startTime: 0,
      endTime: 0,
      activityTypeName: props.testMode ? "default" : "",
      isEnable: true
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this._isMounted = true;

    this.setState({
      startTime: moment().subtract(1, "hours").toDate(),
      endTime: moment().toDate()
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.duration !== prevProps.duration) {
      if (this._isMounted) {
        this.setState({
          startTime: moment().subtract(1, "hours").toDate(),
          endTime: moment().toDate()
        })
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    this.props.handleClose()

    const body = {
        userID: localStorage.getItem("uid"),
        title: this.state.title,
        activityTypeName: this.state.activityTypeName,
        startTime: moment(this.state.startTime).format(dateFormat),
        endTime: moment(this.state.endTime).format(dateFormat),
        description: this.state.description
    }
    const route = '/log/record'
    const headers = {}
    post(route, body, headers, response => {
      load_history(localStorage.getItem("uid"), (historyResponse) => {this.props.updateHistory(historyResponse.data)}, (err) => {
        console.log(err)
        alert("Update History failed")
      })
      load_dash_board(localStorage.getItem("uid"), null, (boardResponse) => {this.props.updateBoard(boardResponse.data)}, (err) => {
        console.log(err)
        alert("Update Board failed")
      })
    }, err => {
      console.log(err)
      alert("Add log failed")
    })
    this.setState({
        title: "",
        activityTypeName: "",
        startTime: moment().subtract(1, "hours").toDate(),
        endTime: moment().toDate(),
        description: ""
    })
  }

  render() {
    return (
      <Dialog data-testid="add-log-pop-up" open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle data-testid="add-log-dialog-title" id="add-log-dialog-title">Add Log</DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth={true} required={true}>
              <InputLabel  htmlFor="title" required={true} >Title</InputLabel>
              <Input id="title" onChange={(e) => {this.setState({title: e.target.value})}} />
            </FormControl>
            <br/><br/>
            <FormControl fullWidth>
            <InputLabel id="activity-type-select-label" required={true} >Activity Type</InputLabel>
              <Select
              data-testid="activity_type_select" native={this.props.testMode ? true : false} labelId="activity-type-select-label"
                id="activity-type-select"
                value={this.state.activityTypeName}
                onChange={(event) => this.setState({activityTypeName: event.target.value})}
              >
                {
                  this.props.activityData.activityTypeList.filter(activityType => activityType.enable === true).map((activityType, key) => {
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
                    <DatePicker data-testid="start-date-pick" 
                      autoOk
                      label="Start Date"
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
                    <TimePicker data-testid="start-time-pick" 
                      autoOk
                      label="Start Time"
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
                    <DatePicker data-testid="end-date-pick" 
                      autoOk
                      label="End Date"
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
                    <TimePicker data-testid="end-time-pick" 
                      autoOk
                      label="End Time"
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
          <Button data-testid="cancel-button" onClick={this.props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button data-testid="submit-button" onClick={this.submit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddLog