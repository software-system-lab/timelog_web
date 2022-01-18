import React, { Component } from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
          <Activity className="Activity" isLeader={true} id={localStorage.getItem("uid")} teamList = {this.props.groupList} activityTypeList={this.props.activityTypeList} edit = {this.props.editActivityType} add = {this.props.addActivityType} delete = {this.props.removeActivityType} isTeam={false}/>
      </div>
      
    )
  }
}


function mapStateToProps(state) {
  return {
    activityTypeList: state.activityTypeList,
    groupList:state.groupList
  }
}
function mapDispatchToProps(dispatch) {
    return {
      editActivityType: (userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID, teamList) =>
        dispatch(editActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID, teamList)),
      addActivityType: (userID, token, activityTypeName, isEnable, isPrivate, teamList) =>
        dispatch(addActivityType(userID, token, activityTypeName, isEnable, isPrivate, teamList)),
      removeActivityType: (userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID, teamList) =>
        dispatch(removeActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID, teamList))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserActivity))
