import { setActivityTypeList } from "./index"

export function getTeam(groupname, teamID, token) {
    return {
      type: "UPDATE_TEAM",
      groupname: groupname,
      token: token,
      teamID: teamID,
      setMemberList: (memberList, dispatch) => dispatch(setMemberList(memberList)),
      setLeader: (leader, dispatch) => dispatch(setLeader(leader)),
      loadTeamActivityTypeList: (teamID, token, dispatch) => dispatch(loadTeamActivityTypeList(teamID, token))
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

export function setTeamActivityTypeList(teamActivityTypeList) {
    return {
        type: "SET_TEAM_ACTIVITY_TYPE_LIST",
        teamActivityTypeList: teamActivityTypeList
    }
}



