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

  componentDidMount(){
    console.log(this.props.operatedTeam)
  }

  render() {
    return (
      <div>
          <Activity className="Activity" id={this.props.operatedTeam} activityTypeList={this.props.teamActivityTypeList} edit = {this.props.editTeamActivityType} add = {this.props.addTeamActivityType} delete = {this.props.removeTeamActivityType}/>
      </div> 
    )
  }
}


function mapStateToProps(state) {
  return {
    teamActivityTypeList: state.teamActivityTypeList,
    operatedTeam: state.operatedTeam

  }
}
function mapDispatchToProps(dispatch) {
  return {
    editTeamActivityType: (teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) =>
      dispatch(editTeamActivityType(teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate)),
    addTeamActivityType: (teamID, token, activityTypeName, isEnable, isPrivate) =>
      dispatch(addTeamActivityType(teamID, token, activityTypeName, isEnable, isPrivate)),
    removeTeamActivityType: (teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) =>
      dispatch(removeTeamActivityType(teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TeamActivity))
