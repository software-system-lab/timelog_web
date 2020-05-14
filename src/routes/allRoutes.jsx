import React, { Component } from "react";
import { Switch } from "react-router-dom";
import appRoutes from "./route";
import ProtectedRoute from "./protectedRoute";

class AllRoutes extends Component {

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
                                />
                            )
                    })}
                </Switch>
            </div>
        )
    }
}

export default AllRoutes
