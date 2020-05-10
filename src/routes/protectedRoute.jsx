import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Keycloak from 'keycloak-js'

class ProtectedRoute extends Component {

    render() {
        const { 
            component: Component,
            authenticated: authenticated,
            login: login,
            ...props } = this.props

        return (
            <Route
                {...props}
                render={props => {
                    if (!this.authenticated) {
                        this.props.login()
                    }
                    return (<Component {...props}/>)
                }}
            />
        )
    }
}

export default ProtectedRoute