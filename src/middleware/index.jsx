import axios from 'axios'

function getHeaders(token) {
    return ({
        'Content-Type': 'application/json',
        'Authorization': token
    })
}

function getBody(userID) {
    return ({
        userID: userID
    })
}

const myMiddleware = store => next => action => {
    if(action.type === "LOAD_ACTIVITY_TYPE_LIST") {
        const headers = getHeaders(action.token)
        const body = getBody(action.userID)
        axios.post('http://localhost:9000/api/activity/all', body, { headers: headers })
        .then( response => {
            action.setActivityTypeList(response.data.activityTypeList, store.dispatch)
        })
        .catch( err => {
            console.log(err)
            alert('Load activity type list failed')
        })
    } else if(action.type === "ENTER_TIMELOG") {
        const headers = getHeaders(action.token)
        const body = getBody(action.userID)
        axios.post('http://localhost:9000/login', body, { headers: headers})
        .then( response => {
            action.setActivityTypeList(response.data.activityTypeList, store.dispatch)
        })
        .catch( err => {
            console.log(err)
            alert("Login to timelog failed")
        })
    } else if(action.type === "EDIT_ACTIVITY_TYPE") {
        const headers = getHeaders(action.token)
        const body = {
            userID: action.userID,
            targetActivityTypeName: action.targetActivityTypeName,
            activityTypeName: action.activityTypeName,
            isEnable: action.isEnable,
            isPrivate: action.isPrivate
        }
        axios.post('http://localhost:9000/api/activity/edit', body, { headers: headers})
        .then(response => {
            action.loadActivityTypeList(action.userID, action.token, store.dispatch)
        })
        .catch(err => {
            console.log(err)
            alert("Edit failed")
        })
    } else if(action.type === "ADD_ACTIVITY_TYPE") {
        const headers = getHeaders(action.token)
        const body = {
            userID: action.userID,
            activityTypeName: action.activityTypeName,
            isEnable: action.isEnable,
            isPrivate: action.isPrivate
        }
        axios.post('http://localhost:9000/api/activity/add', body, { headers: headers})
        .then(response => {
            action.loadActivityTypeList(action.userID, action.token, store.dispatch)
        })
        .catch(err => {
            console.log(err)
            alert("Add activity type failed")
        })
    } else if (action.type === "REMOVE_ACTIVITY_TYPE") {
        const headers = getHeaders(action.token)
        const body = {
            userID: action.userID,
            activityTypeName: action.activityTypeName
        } 
        axios.post('http://localhost:9000/api/activity/remove', body, { headers: headers})
        .then(response => {
            action.loadActivityTypeList(action.userID, action.token, store.dispatch)
        })
        .catch(err => {
            console.log(err)
            alert("Remove activity type failed")
        })
    } else {
        return next(action)
    }
}

export default myMiddleware