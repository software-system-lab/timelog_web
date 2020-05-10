import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import appRoutes from "./route";
import ProtectedRoute from "./protectedRoute";

class AllRoutes extends Component {
    
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
                            <ProtectedRoute path={prop.path} component={prop.component} key={prop.path}/>
                        )
                    }
                })}
            </Switch>
        )
    }
}

export default AllRoutes