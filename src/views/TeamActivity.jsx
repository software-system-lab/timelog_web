import React, { Component } from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import  Activity  from './Activity';
import { editTeamActivityType, addTeamActivityType, removeTeamActivityType } from 'actions/Team';

class TeamActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
          <Activity className="Activity" isLeader={this.props.isLeader} id={this.props.operatedTeam.teamID} activityTypeList={this.props.teamActivityTypeList} edit = {this.props.editTeamActivityType} add = {this.props.addTeamActivityType} delete = {this.props.removeTeamActivityType}/>
      </div> 
    )
  }
}


function mapStateToProps(state) {
  return {
    teamActivityTypeList: state.teamActivityTypeList,
    operatedTeam: state.operatedTeam,
    isLeader:state.isLeader

  }
}
function mapDispatchToProps(dispatch) {
  return {
    editTeamActivityType: (teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID) =>
      dispatch(editTeamActivityType(teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID)),
    addTeamActivityType: (teamID, token, activityTypeName, isEnable, isPrivate) =>
      dispatch(addTeamActivityType(teamID, token, activityTypeName, isEnable, isPrivate)),
    removeTeamActivityType: (teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID) =>
      dispatch(removeTeamActivityType(teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TeamActivity))
