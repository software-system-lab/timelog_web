import React, { Component } from 'react';
import './button.css';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

class AddLog extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: "",
      description: "",
      startDate: new Date()
    }

    // this.startDateChanged = this.startDateChanged.bind(this)
    // this.endDateChanged = this.endDateChanged.bind(this)
    this.submit = this.submit.bind(this)
  }

  // startDateChanged(date) {
  //   this.setState({ startDate: date})
  // }

  // endDateChanged(date) {
  //   this.setState({ endDate: date})
  // }

  submit() {
    // submit to server
  }

  render() {
    return (
      <div>
        <form>
          <FormControl>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" onChange={(e) => {console.log(e.target.value)}} />
          </FormControl>
          <DatePicker
            label="Start date"
            autoOk={true}
            value={this.state.startDate}
            onChange={(date) => {this.setState({startDate: date})}}
          />


        </form>
      </div>
    )
  }

}

export default AddLog

/*
  title
  activity
  start time
  end time
  description
*/