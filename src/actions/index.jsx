import { act } from "react-dom/test-utils"
import { is } from "date-fns/locale"

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

export function removeActivityType(userID, token, activityTypeName) {
    return {
        type: "REMOVE_ACTIVITY_TYPE",
        userID: userID,
        token: token,
        activityTypeName: activityTypeName,
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
        setActivityTypeList: (activityTypeList, dispatch) => dispatch(setActivityTypeList(activityTypeList))
    }
}
