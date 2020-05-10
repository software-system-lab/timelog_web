import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Keycloak from 'keycloak-js'

class ProtectedRoute extends Component {

    render() {
        const { component: Component, authenticated: authenticated, ...props } = this.props
        return (
            <Route
                {...props}
                render={props => (
                this.authenticated ?
                    <Component {...props} /> :
                    <Redirect to="/login" />
                )}
            />
        )
    }
}

export default ProtectedRoute