import React, { Component } from 'react';
import { MDBDatePickerV5, MDBInput, MDBBtn } from 'mdbreact'
import './button.css';

class AddLog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      startDate: new Date(),
      startTime: null,
      endDate: new Date(),
      endTime: null,
      description: ""
    }

    this.startDateChanged = this.startDateChanged.bind(this)
    this.endDateChanged = this.endDateChanged.bind(this)
    this.submit = this.submit.bind(this)
  }

  startDateChanged(date) {
    this.setState({ startDate: date})
  }

  endDateChanged(date) {
    this.setState({ endDate: date})
  }

  submit() {
    // submit to server
  }

  render() {
    return (
      <div>
        {/* <Form>
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

          <Form.Group controlId="start date">
            <Form.Label>Start Date</Form.Label>
            <MDBDatePickerV5 inline autoOk={true} getValue={(e) => console.log(e)}/>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.startDateChanged}
              dateFormat="yyyy/MM/dd"
            />
            <Form.Control type="text"></Form.Control>
          </Form.Group>

          <Form.Group controlId="end date">
            <Form.Label>End Date</Form.Label>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.endDateChanged}
              dateFormat="yyyy/MM/dd"
            />
            <Form.Control type="text"></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="description"/>
          </Form.Group>
        </Form>
        <Button onClick={this.submit}>submit</Button> */}
        <form>
          <p className="h5 text-center mb-4">Add a log</p>
          <div className="grey-text">
            <MDBInput label="Title" icon="pencil-alt" group type="text" validate error="wrong"
              success="right" />
            <MDBDatePickerV5 autoOk={true} getValue={(e) => console.log(e)}/>
            <MDBDatePickerV5 autoOk={true} getValue={(e) => console.log(e)}/>
            
            <MDBInput label="Your password" icon="lock" group type="password" validate />
          </div>
          <div className="text-center">
            <MDBBtn color="primary">Register</MDBBtn>
          </div>
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