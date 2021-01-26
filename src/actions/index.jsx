import { setHistory, loadLogHistory } from './History'
import { loadDashBoard } from './DashBoard'

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

export function addActivityType(userID, token, activityTypeName, isEnable, isPrivate) {
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

export function removeActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) {
    return {
        type: "REMOVE_ACTIVITY_TYPE",
        userID: userID,
        token: token,
        targetActivityTypeName: targetActivityTypeName,
        activityTypeName: activityTypeName,
        isEnable: isEnable,
        isPrivate: isPrivate,
        loadActivityTypeList: (userID, token, dispatch) => dispatch(loadActivityTypeList(userID, token))
    }
}

export function editActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) {
    return {
        type: "EDIT_ACTIVITY_TYPE",
        userID: userID,
        token: token,
        targetActivityTypeName: targetActivityTypeName,
        activityTypeName: activityTypeName,
        isEnable: isEnable,
        isPrivate: isPrivate,
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
        setGroupList: (groupList, dispatch) => dispatch(setGroupList(groupList))
    }
}

export function setGroupList(groupList) {
    return {
        type: "SET_GROUP_LIST",
        groupList: groupList
    }
}

export function newLog(userID, token, title, activityTypeName, startTime, endTime, description) {
  return {
    type: "NEW_LOG",
    userID: userID,
    token: token,
    title: title,
    activityTypeName: activityTypeName,
    startTime: startTime,
    endTime: endTime,
    description: description,
    loadLogHistory: (userID, token, dispatch) => dispatch(loadLogHistory(userID, token)),
    loadDashBoard: (userID, token, dispatch) => dispatch(loadDashBoard(userID, token))
  }
}

export function removeLog(userID, token, logID) {
  return {
    type: "REMOVE_LOG",
    userID: userID,
    token: token,
    logID: logID,
    loadLogHistory: (userID, token, dispatch) => dispatch(loadLogHistory(userID, token)),
    loadDashBoard: (userID, token, dispatch) => dispatch(loadDashBoard(userID, token))
  }
}

export function editLog(userID, token, logID, title, activityTypeName, startTime, endTime, description) {
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
        loadLogHistory: (userID, token, dispatch) => dispatch(loadLogHistory(userID, token)),
        loadDashBoard: (userID, token, dispatch) => dispatch(loadDashBoard(userID, token))
    }
}
