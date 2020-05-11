import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'

class Sidebar extends Component {

  render() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/welcome">Homepage</Nav.Link>
        <Nav.Link href="/addLog">Add a log</Nav.Link>
      </Nav>
    )
  }

}

export default Sidebar