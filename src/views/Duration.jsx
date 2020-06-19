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

import { withKeycloak } from '@react-keycloak/web'

class Duration extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;

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
    this.props.updateDates(this.state.startDate, this.state.endDate);

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
        <DialogTitle id="edit-user-profile">Duration</DialogTitle>
        <DialogContent>
          <form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl className="">
                    <DatePicker
                      autoOk
                      label="Start date"
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
                    <DatePicker
                      autoOk
                      label="End date"
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

export default withKeycloak(Duration)

