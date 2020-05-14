import React from 'react'
import { Route } from 'react-router-dom'
import { withKeycloak } from '@react-keycloak/web'

function ProtectedRoute({ component: Component, ...rest}) {
    return rest.keycloakInitialized && <Route {...rest} render={props => (
        rest.keycloak.authenticated ? <Component {...props} /> : rest.keycloak.login()
    )} />
}

export default withKeycloak(ProtectedRoute)