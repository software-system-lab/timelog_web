import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import appRoutes from "./route";
import ProtectedRoute from "./protectedRoute";
import Keycloak from 'keycloak-js'
import Sidebar from 'views/Sidebar'
import { Row, Col } from "react-bootstrap";

class AllRoutes extends Component {

    constructor(props) {
        super(props);

        this.state = { keycloak: null, authenticated: false };
        this.loginWithKeycloak = this.loginWithKeycloak.bind(this)
        this.logout = this.logout.bind(this)
    }

    loginWithKeycloak() {
        if (!this.state.authenticated) {
            const keycloak = Keycloak('./keycloak.json')
            keycloak.init({onLoad: 'login-required'}).then(authenticated => {
                this.setState({ keycloak: keycloak, authenticated: authenticated })
            })
        }
    }

    logout() {
        this.state.keycloak.logout()
        this.setState({ authenticated: false })
    }

    render() {
        return (
            <div >
                <Switch>
                    {appRoutes.map((prop, key) => {
                        return (
                                <ProtectedRoute 
                                    path={prop.path}
                                    component={prop.component}
                                    key={prop.path}
                                    authenticated={this.state.authenticated}
                                    login={this.loginWithKeycloak}
                                    keycloak={this.state.keycloak}
                                />
                            )
                    })}
                </Switch>
                {this.state.authenticated && (
                    <button type="button" onClick={this.logout}>
                        Logout
                    </button>
                )}
            </div>
        )
    }
}

export default AllRoutes