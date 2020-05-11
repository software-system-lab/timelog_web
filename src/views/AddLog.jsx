import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


class AddLog extends Component {

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
            <Form.Control type="text"></Form.Control>
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