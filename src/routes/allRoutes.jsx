import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import appRoutes from "./route";
import ProtectedRoute from "./protectedRoute";
import Keycloak from 'keycloak-js'

class AllRoutes extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
        this.loginWithKeycloak = this.loginWithKeycloak.bind(this)
    }

    loginWithKeycloak() {
        if (!this.state.authenticated) {
            const keycloak = Keycloak('./keycloak.json')
            keycloak.init({onLoad: 'login-required'}).then(authenticated => {
                this.setState({ keycloak: keycloak, authenticated: authenticated })
            })
        }
    }

    render() {
        return (
            <Switch>
                {appRoutes.map((prop, key) => {
                    if (prop.public) {
                        return(
                            <Route path={prop.path} component={prop.component} key={prop.path}/>
                        )
                    } else {
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
                    }
                })}
            </Switch>
        )
    }
}

export default AllRoutes