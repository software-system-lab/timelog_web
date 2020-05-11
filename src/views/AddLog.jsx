import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class AddLog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    }

    this.startDateChanged = this.startDateChanged.bind(this)
    this.endDateChanged = this.endDateChanged.bind(this)
  }

  startDateChanged(date) {
    this.setState({ startDate: date})
  }

  endDateChanged(date) {
    this.setState({ endDate: date})
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="title"/>
          </Form.Group>

          <Form.Group controlId="activity">
            <Form.Label>Activity</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="start time">
            <Form.Label>Start Time</Form.Label>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.startDateChanged}
              dateFormat="yyyy/MM/dd"
            />
            {/* <Form.Control type="text"></Form.Control> */}
          </Form.Group>

          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <Form.Control type="text"></Form.Control>
          </Form.Group>

          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control as="textarea" placeholder="title"/>
          </Form.Group>
        </Form>
        Add a log
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