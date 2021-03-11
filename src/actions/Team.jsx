import { setActivityTypeList } from "./index"

export function getTeam(groupname, teamID, token) {
    return {
      type: "UPDATE_TEAM",
      groupname: groupname,
      token: token,
      teamID: teamID,
      setMemberList: (memberList, dispatch) => dispatch(setMemberList(memberList)),
      setLeader: (leader, dispatch) => dispatch(setLeader(leader)),
      loadTeamActivityTypeList: (teamID, token, dispatch) => dispatch(loadTeamActivityTypeList(teamID, token)),
    }   
}
  
export function setMemberList(memberList) {
    return {
        type: "SET_MEMBER_LIST",
        memberList: memberList
    }
}

export function setLeader(leader) {
    return {
        type: "SET_LEADER",
        leader: leader
    }
}

export function loadTeamActivityTypeList(teamID, token) {
    return {
        type: "LOAD_TEAM_ACTIVITY_TYPE_LIST",
        teamID: teamID,
        token: token,
        setTeamActivityTypeList: (teamActivityTypeList, dispatch) => dispatch(setTeamActivityTypeList(teamActivityTypeList))
    }
}

export function loadAllTeamActivityTypeList(teamList, token) {
    return {
        type: "LOAD_ALL_TEAM_ACTIVITY_TYPE_LIST",
        teamList: teamList,
        token: token,
        setAllTeamActivityTypeList: (allTeamActivityTypeList, dispatch) => dispatch(setAllTeamActivityTypeList(allTeamActivityTypeList))
    }
}

export function setAllTeamActivityTypeList(allTeamActivityTypeList) {
    return {
        type: "SET_ALL_TEAM_ACTIVITY_TYPE_LIST",
        allTeamActivityTypeList: allTeamActivityTypeList
    }
}

export function setTeamActivityTypeList(teamActivityTypeList) {
    return {
        type: "SET_TEAM_ACTIVITY_TYPE_LIST",
        teamActivityTypeList: teamActivityTypeList
    }
}

export function setOperatedTeam(teamID) {
    return {
        type: "SET_OPERATED_TEAM",
        teamID: teamID
    }
}


export function addTeamActivityType(teamID, token, activityTypeName, isEnable, isPrivate) {
    return {
        type: "ADD_TEAM_ACTIVITY_TYPE",
        teamID: teamID,
        token: token,
        activityTypeName: activityTypeName,
        isEnable: isEnable,
        isPrivate: isPrivate,
        loadTeamActivityTypeList: (teamID, token, dispatch) => dispatch(loadTeamActivityTypeList(teamID, token)),
        // loadAllTeamActivityTypeList: (teamList, dispatch) => dispatch(loadAllTeamActivityTypeList(teamList)),
    }
}

export function removeTeamActivityType(teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) {
    return {
        type: "REMOVE_TEAM_ACTIVITY_TYPE",
        teamID: teamID,
        activityTypeName: activityTypeName,
        isEnable: isEnable,
        isPrivate: isPrivate,
        loadTeamActivityTypeList: (teamID, token, dispatch) => dispatch(loadTeamActivityTypeList(teamID, token)),
        // loadAllTeamActivityTypeList: (teamList, dispatch) => dispatch(loadAllTeamActivityTypeList(teamList)),
    }
}

export function editTeamActivityType(teamID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) {
    return {
        type: "EDIT_TEAM_ACTIVITY_TYPE",
        teamID: teamID,
        token: token,
        targetActivityTypeName: targetActivityTypeName,
        activityTypeName: activityTypeName,
        isEnable: isEnable,
        isPrivate: isPrivate,
        loadTeamActivityTypeList: (teamID, token, dispatch) => dispatch(loadTeamActivityTypeList(teamID, token)),
        // loadAllTeamActivityTypeList: (teamList, dispatch) => dispatch(loadAllTeamActivityTypeList(teamList)),
    }
}



