import React, { Component } from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import activityTypeList from "../reducers/activityTypeList";
import  Activity  from './Activity';

class UserActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
          <Activity className="Activity" id={localStorage.getItem("uid")} activityTypeList={this.props.activityTypeList}/>
      </div>
      
    )
  }
}


function mapStateToProps(state) {
  return {
    activityTypeList: state.activityTypeList
  }
}

export default connect(mapStateToProps)(withRouter(UserActivity))
