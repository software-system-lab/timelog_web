import React, { Component } from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import activityTypeList from "../reducers/activityTypeList";
import  Activity  from './Activity';
import { editActivityType, addActivityType, removeActivityType } from 'actions';

class UserActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
          <Activity className="Activity" id={localStorage.getItem("uid")} activityTypeList={this.props.activityTypeList} edit = {this.props.editActivityType} add = {this.props.addActivityType} delete = {this.props.removeActivityType}/>
      </div>
      
    )
  }
}


function mapStateToProps(state) {
  return {
    activityTypeList: state.activityTypeList
  }
}
function mapDispatchToProps(dispatch) {
    return {
      editActivityType: (userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) =>
        dispatch(editActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate)),
      addActivityType: (userID, token, activityTypeName, isEnable, isPrivate) =>
        dispatch(addActivityType(userID, token, activityTypeName, isEnable, isPrivate)),
      removeActivityType: (userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) =>
        dispatch(removeActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserActivity))
