import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import appRoutes from "./route";

class AllRoutes extends Component {

    render() {
        return (
            <div >
                <Switch>
                    {appRoutes.map((prop, key) => {
                        return (
                                <Route
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
