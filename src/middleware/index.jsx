import axios from 'axios'
import moment from 'moment'

const API_HOST = process.env.REACT_APP_HOST;

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
        axios.post(API_HOST + '/activity/all', body, { headers: headers })
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
        axios.post(API_HOST + '/login', body, { headers: headers})
        .then( response => {
            action.setActivityTypeList(response.data.activityTypeList, store.dispatch)

            body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
            body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")

            axios.post(API_HOST + '/log/history', body, {headers: headers})
            .then( response => {
              action.setHistory(response.data.logItemList, store.dispatch);
            })
            .catch ( err => {
              console.log(err)
              alert("Get histroy logs failed");
            })

            action.loadDashBoard(action.userID, action.token, store.dispatch)
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
        axios.post(API_HOST + '/activity/edit', body, { headers: headers})
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
        axios.post(API_HOST + '/activity/add', body, { headers: headers})
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
        axios.post(API_HOST + '/activity/remove', body, { headers: headers})
        .then(response => {
            action.loadActivityTypeList(action.userID, action.token, store.dispatch)
        })
        .catch(err => {
            console.log(err)
            alert("Remove activity type failed")
        })
    } else if(action.type === "NEW_LOG") {
        const headers = getHeaders(action.token)
        const body = {
            userID: action.userID,
            title: action.title,
            activityTypeName: action.activityTypeName,
            startTime: action.startTime,
            endTime: action.endTime,
            description: action.description
        }
        axios.post(API_HOST + '/log/record', body, { headers: headers})
        .then(response => {
          action.loadLogHistory(action.userID, action.token, store.dispatch)
          action.loadDashBoard(action.userID, action.token, store.dispatch)
        })
        .catch(err => {
            console.log(err)
            alert("Add log failed")
        })
    } else if(action.type === "LOAD_LOG_HISTORY") {
        const headers = getHeaders(action.token)
        const body = getBody(action.userID)
        body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
        body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")

        axios.post(API_HOST + '/log/history', body, {headers: headers})
        .then( response => {
          action.setHistory(response.data.logItemList, store.dispatch);
        })
        .catch ( err => {
          console.log(err)
          alert("Get histroy logs failed");
        })
    } else if(action.type === "LOAD_DASH_BOARD") {
      const headers = getHeaders(action.token)
      const body = getBody(action.userID)
      body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
      body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")
      axios.post(API_HOST + '/dash-board/spent-time', body, {headers: headers})
      .then( response => {
        const pieData = [
          ['Task', 'Hours per Day']
        ]
        const dataMap = response.data.dataMap
        Object.keys(dataMap).forEach((key) => {
          pieData.push([key, dataMap[key].timeLength])
        })
        const result = {
          totalTime: response.data.totalTime,
          pieData: pieData
        }
        action.setDashBoard(result, store.dispatch)
      })
      .catch ( err => {
        console.log(err)
        alert("Get history logs failed");
      })
    } else if(action.type === "REMOVE_LOG") {
      const headers = getHeaders(action.token)
      const body = getBody(action.userID)
      console.log(action.logID)
      body.logID = action.logID
      axios.post(API_HOST + '/log/remove', body, {headers: headers})
      .then(response => {
        console.log(response)
        action.loadLogHistory(action.userID, action.token, store.dispatch)
        action.loadDashBoard(action.userID, action.token, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Remove log failed")
      })
    } else {
        return next(action)
    }
}

export default myMiddleware
