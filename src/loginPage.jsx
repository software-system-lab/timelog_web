import { useKeycloak } from '@react-keycloak/web'
import React from 'react'

export default () => {
  // Using array destructuring
  // const [keycloak, initialized] = useKeycloak()
  // or Object destructuring
  const { keycloak, initialized } = useKeycloak()

  // Here you can access all of keycloak methods and variables.
  // See https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference

  return (
    <div>
      <div>{`User is ${
        !keycloak.authenticated ? 'NOT ' : ''
      }authenticated`}</div>

      {!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.login()}>
          Login
        </button>
      )}

      {!!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}
    </div>
  )
}
