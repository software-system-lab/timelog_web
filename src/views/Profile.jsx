import React, { Component } from 'react'
import Keycloak from 'keycloak-js'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = { username: "" };
      }

      render() {
        return (
          <div>
            <h3>user name is {this.state.username}</h3>
          </div>
        )
      }
}

export default Profile
