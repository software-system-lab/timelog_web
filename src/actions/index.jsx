import { setHistory, loadLogHistory } from './History'
import { updateTeamDashBoard, loadDashBoard, setIsUpdatingTeamDashboard } from './DashBoard'
import { getTeam, setOperatedTeam, loadAllTeamActivityTypeList, setBelongingTeams } from './Team'

export function loadActivityTypeList(userID, token) {
  return {
    type: "LOAD_ACTIVITY_TYPE_LIST",
    userID: userID,
    token: token,
    setActivityTypeList: (activityTypeList, dispatch) => dispatch(setActivityTypeList(activityTypeList))
  }
}

export function setActivityTypeList(activityTypeList) {
  return {
    type: "SET_ACTIVITY_TYPE_LIST",
    activityTypeList: activityTypeList
  }
}

export function addActivityType(userID, token, activityTypeName, isEnable, isPrivate, teamList) {
  return {
    type: "ADD_ACTIVITY_TYPE",
    userID: userID,
    token: token,
    activityTypeName: activityTypeName,
    isEnable: isEnable,
    isPrivate: isPrivate,
    loadActivityTypeList: (userID, token, dispatch) => dispatch(loadActivityTypeList(userID, token))
  }
}

export function removeActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID, teamList) {
  return {
    type: "REMOVE_ACTIVITY_TYPE",
    userID: userID,
    activityTypeName: activityTypeName,
    isEnable: isEnable,
    isPrivate: isPrivate,
    unitID: unitID,
    loadActivityTypeList: (userID, token, dispatch) => dispatch(loadActivityTypeList(userID, token))
  }
}

export function editActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate, unitID, teamList) {
  return {
    type: "EDIT_ACTIVITY_TYPE",
    userID: userID,
    token: token,
    targetActivityTypeName: targetActivityTypeName,
    activityTypeName: activityTypeName,
    isEnable: isEnable,
    isPrivate: isPrivate,
    unitID: unitID,
    loadActivityTypeList: (userID, token, dispatch) => dispatch(loadActivityTypeList(userID, token))
  }
}

export function enterTimelog(userID, token) {
  return {
    type: "ENTER_TIMELOG",
    userID: userID,
    token: token,
    setActivityTypeList: (activityTypeList, dispatch) => dispatch(setActivityTypeList(activityTypeList)),
    setHistory: (logHistory, dispatch) => dispatch(setHistory(logHistory)),
    loadDashBoard: (userID, token, dispatch) => dispatch(loadDashBoard(userID, token)),
    setGroupList: (groupList, dispatch) => dispatch(setGroupList(groupList)),
    getTeam: (groupname, teamID, userID, dispatch) => dispatch(getTeam(groupname, teamID, userID)),
    setOperatedTeam: (team, dispatch) => dispatch(setOperatedTeam(team)),
    loadAllTeamActivityTypeList: (teamList, dispatch) => dispatch(loadAllTeamActivityTypeList(teamList)),
    setBelongingTeams: (teams, dispatch) => dispatch(setBelongingTeams(teams)),
  }
}

export function setGroupList(groupList) {
  return {
    type: "SET_GROUP_LIST",
    groupList: groupList
  }
}

export function newLog(userID, token, title, activityTypeName, startTime, endTime, description, unitID, memberList, operatedTeam) {
  return {
    type: "NEW_LOG",
    userID: userID,
    token: token,
    title: title,
    activityTypeName: activityTypeName,
    startTime: startTime,
    endTime: endTime,
    description: description,
    unitID: unitID,
    memberList: memberList,
    operatedTeam: operatedTeam,
    loadLogHistory: (userID, token, dispatch) => dispatch(loadLogHistory(userID, token)),
    loadDashBoard: (userID, token, dispatch) => dispatch(loadDashBoard(userID, token)),
    setIsUpdatingTeamDashboard: (status, dispatch) => dispatch(setIsUpdatingTeamDashboard(status)),
    updateTeamDashBoard: (teamID, memberList, teamName, dispatch) => dispatch(updateTeamDashBoard(teamID, memberList, null, true, teamName)),
  }
}

export function removeLog(userID, token, logID, unitID, memberList, operatedTeam) {
  return {
    type: "REMOVE_LOG",
    userID: userID,
    token: token,
    logID: logID,
    unitID: unitID,
    memberList: memberList,
    operatedTeam: operatedTeam,
    loadLogHistory: (userID, token, dispatch) => dispatch(loadLogHistory(userID, token)),
    loadDashBoard: (userID, token, dispatch) => dispatch(loadDashBoard(userID, token)),
    setIsUpdatingTeamDashboard: (status, dispatch) => dispatch(setIsUpdatingTeamDashboard(status)),
    updateTeamDashBoard: (teamID, memberList, dispatch) => dispatch(updateTeamDashBoard(teamID, memberList)),
  }
}

export function editLog(userID, token, logID, title, activityTypeName, startTime, endTime, description, unitID, memberList, operatedTeam) {
  return {
    type: "EDIT_LOG",
    userID: userID,
    token: token,
    logID: logID,
    title: title,
    activityTypeName: activityTypeName,
    startTime: startTime,
    endTime: endTime,
    description: description,
    unitID: unitID,
    memberList: memberList,
    operatedTeam: operatedTeam,
    loadLogHistory: (userID, token, dispatch) => dispatch(loadLogHistory(userID, token)),
    loadDashBoard: (userID, token, dispatch) => dispatch(loadDashBoard(userID, token)),
    setIsUpdatingTeamDashboard: (status, dispatch) => dispatch(setIsUpdatingTeamDashboard(status)),
    updateTeamDashBoard: (teamID, memberList, dispatch) => dispatch(updateTeamDashBoard(teamID, memberList)),
  }
}

