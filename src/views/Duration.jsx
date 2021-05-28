import React, { Component } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@material-ui/core';

class Duration extends Component {

  constructor(props) {
    super(props)

    this.state = {
      startDate: props.startDate,
      endDate: props.endDate,
      minimumDate: props.startDate,
      maximumDate: props.endDate,
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    // send request to server
    this.props.handleClose()
    this.props.updateDates(this.state.startDate, this.state.endDate)
    this.props.updateHistory(localStorage.getItem("uid"), null)
    this.props.updateDashBoard(localStorage.getItem("uid"), null)
    }

  render() {
    return (
      <Dialog data-testid="duration-pop-up" open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="edit-user-profile" data-testid="duration-title">Duration</DialogTitle>
        <DialogContent>
          <form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl className="">
                    <DatePicker data-testid="start-date-pick" 
                      autoOk
                      label="Start Date"
                      value={this.state.startDate}
                      format="yyyy/MM/dd"
                      onChange={(date) => {
                        this.setState({startDate: date, minimumDate: date})}}
                      maxDate={this.state.maximumDate}    // +
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <DatePicker data-testid="end-date-pick" 
                      autoOk
                      label="End Date"
                      value={this.state.endDate}
                      format="yyyy/MM/dd"
                      onChange={(date) => {
                        this.setState({endDate: date, maximumDate: date})}}
                      minDate={this.state.minimumDate}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="secondary" data-testid='duration-close'>
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary" data-testid='submit-button'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

}

export default Duration
