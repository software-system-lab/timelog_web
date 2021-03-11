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

function paddingLeft (str, len) {
  if (str.toString().length >= len) {
    return str
  } else {
    return paddingLeft('0' + str, len)
  }
}

function getHour (time) {
  return paddingLeft(Math.floor(time / 60), 2)
}

function getMinute (time) {
  return paddingLeft((time % 60).toFixed(0), 2)
}

function getTeamIdList (teamList) {
  var teamID = [];
  for(var i = 0; i < teamList.length; i++){
    teamID.push(teamList[i].teamID)
  }
  return teamID
}

const myMiddleware = store => next => action => {
    if(action.type === "LOAD_ACTIVITY_TYPE_LIST") {
        const headers = getHeaders(action.token)
        const body = {
          unitIdList : [action.userID]
        }
        axios.post(API_HOST + '/activity/all', body, { headers: headers })
        .then( response => {
            console.log(response.data.unitDTOList[0])
            action.setActivityTypeList(response.data.unitDTOList[0].activityTypeList, store.dispatch)
        })
        .catch( err => {
            console.log(err)
            alert('Load activity type list failed')
        })
    } else if(action.type === "LOAD_TEAM_ACTIVITY_TYPE_LIST") {
      const headers = getHeaders(action.token)
      const body = {
        unitIdList : [action.teamID]
      }
      console.log([action.teamID])
      axios.post(API_HOST + '/activity/all', body, { headers: headers })
      .then( response => {
          action.setTeamActivityTypeList(response.data.unitDTOList[0].activityTypeList, store.dispatch)
      })
      .catch( err => {
          console.log(err)
          alert('Load Team activity type list failed')
      })
    } else if(action.type === "LOAD_ALL_TEAM_ACTIVITY_TYPE_LIST") {
      const headers = getHeaders(action.token)
      const body = {
        unitIdList : action.teamList
      }
      console.log(action.teamList)
      axios.post(API_HOST + '/activity/all', body, { headers: headers })
      .then( response => {
        console.log(response.data.unitDTOList, store.dispatch)
          action.setAllTeamActivityTypeList(response.data.unitDTOList, store.dispatch)
      })
      .catch( err => {
          console.log(err)
          alert('Load Team All activity type list failed')
      })
    } else if(action.type === "ENTER_TIMELOG") {
        const headers = getHeaders(action.token)
        const body = getBody(action.userID)
        console.log(action.userID)
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
            const data = {
              username : localStorage.getItem("cn")
            }
            axios.post(API_HOST + '/belong', data, {headers: headers})
            .then( response => {
              action.setGroupList(response.data.teamList, store.dispatch);
              action.setOperatedTeam(response.data.teamList[0].teamID, store.dispatch);
              action.loadAllTeamActivityTypeList(getTeamIdList(response.data.teamList), store.dispatch);
              action.getTeam(response.data.teamList[0].teamName, response.data.teamList[0].teamID, store.dispatch);
            })
            .catch ( err => {
              console.log(err)
              alert("Get Team failed");
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
        console.log(body)
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
            targetActivityTypeName: action.targetActivityTypeName,
            activityTypeName: action.activityTypeName,
            isEnable: action.isEnable,
            isPrivate: action.isPrivate
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
            description: action.description,
            activityUnitID: action.unitID
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
        const totalTimeString = response.data.totalTime
        const totalTime = parseInt(totalTimeString.split(":")[0]) * 60 + parseInt(totalTimeString.split(":")[1])

        const pieData = [
          ['Task', 'Hours per Project']
        ]
        const tableData = []
        const dataMap = response.data.dataMap
        Object.keys(dataMap).forEach((key) => {
          const timeLength = dataMap[key].timeLength
          const percentage = totalTime === 0 ? 0 : (timeLength / totalTime * 100).toFixed(2).toString()
          pieData.push([key, timeLength])
          tableData.push({activityTypeName: key, timeLength: getHour(timeLength) + " : " + getMinute(timeLength), percentage: percentage.toString() + " %"})
        })
        const result = {
          totalTime: response.data.totalTime,
          pieData: pieData,
          tableData: tableData
        }
        action.setDashBoard(result, store.dispatch)
      })
      .catch ( err => {
        console.log(err)
        alert("Get dash board data failed");
      })
    } else if(action.type === "UPDATE_DASH_BOARD") {
      const headers = getHeaders(action.token)
      const body = {
        userID: action.userID,
        filterList: action.filterList}
      body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
      body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")
      axios.post(API_HOST + '/dash-board/spent-time', body, {headers: headers})
      .then( response => {
        const totalTimeString = response.data.totalTime
        const totalTime = parseInt(totalTimeString.split(":")[0]) * 60 + parseInt(totalTimeString.split(":")[1])

        const pieData = [
          ['Task', 'Hours per Project']
        ]
        const tableData = []
        const dataMap = response.data.dataMap
        Object.keys(dataMap).forEach((key) => {
          const timeLength = dataMap[key].timeLength
          const percentage = totalTime === 0 ? 0 : (timeLength / totalTime * 100).toFixed(2).toString()
          pieData.push([key, timeLength])
          tableData.push({activityTypeName: key, timeLength: getHour(timeLength) + " : " + getMinute(timeLength), percentage: percentage.toString() + " %"})
        })
        const result = {
          totalTime: response.data.totalTime,
          pieData: pieData,
          tableData: tableData
        }
        action.setDashBoard(result, store.dispatch)
      })
      .catch ( err => {
        console.log(err)
        alert("Get dash board data failed");
      })
    } else if(action.type === "REMOVE_LOG") {
      const headers = getHeaders(action.token)
      const body = {
        userID: action.userID,
        logID: action.logID
      }
      axios.post(API_HOST + '/log/remove', body, {headers: headers})
      .then(response => {
        action.loadLogHistory(action.userID, action.token, store.dispatch)
        action.loadDashBoard(action.userID, action.token, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Remove log failed")
      })
    }  else if(action.type === "EDIT_LOG") {
      const headers = getHeaders(action.token)
      const body = {
        userID: action.userID,
        logID: action.logID,
        title: action.title,
        activityTypeName: action.activityTypeName,
        startTime: action.startTime,
        endTime: action.endTime,
        description: action.description,
        activityUnitID: action.unitID
    }
      axios.post(API_HOST + '/log/edit', body, {headers: headers})
      .then(response => {
        action.loadLogHistory(action.userID, action.token, store.dispatch)
        action.loadDashBoard(action.userID, action.token, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Edit log failed")
      })
    } else if(action.type === "UPDATE_TEAM") {
      const headers = getHeaders(action.token)
      const body = {
        groupname: action.groupname
    }
      axios.post(API_HOST + '/group', body, {headers: headers})
      .then(response => {
        action.setMemberList(response.data.memberList, store.dispatch)
        action.setLeader(response.data.leader, store.dispatch)
        action.loadTeamActivityTypeList(action.teamID, action.token, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Getting team failed")
      })
    } else if(action.type === "EDIT_TEAM_ACTIVITY_TYPE") {
      const headers = getHeaders(action.token)
      const body = {
          userID: action.teamID,
          targetActivityTypeName: action.targetActivityTypeName,
          activityTypeName: action.activityTypeName,
          isEnable: action.isEnable,
          isPrivate: action.isPrivate
      }
      console.log(body)
      axios.post(API_HOST + '/activity/edit', body, { headers: headers})
      .then(response => {
          action.loadTeamActivityTypeList(action.teamID, action.token, store.dispatch)
      })
      .catch(err => {
          console.log(err)
          alert("Edit Team failed")
      })
  } else if(action.type === "ADD_TEAM_ACTIVITY_TYPE") {
      const headers = getHeaders(action.token)
      const body = {
          userID: action.teamID,
          activityTypeName: action.activityTypeName,
          isEnable: action.isEnable,
          isPrivate: action.isPrivate
      }
      console.log(body)
      axios.post(API_HOST + '/activity/add', body, { headers: headers})
      .then(response => {
          action.loadTeamActivityTypeList(action.teamID, action.token, store.dispatch)
      })
      .catch(err => {
          console.log(err)
          alert("Add Team activity type failed")
      })
  } else if (action.type === "REMOVE_TEAM_ACTIVITY_TYPE") {
      const headers = getHeaders(action.token)
      const body = {
          userID: action.teamID,
          targetActivityTypeName: action.targetActivityTypeName,
          activityTypeName: action.activityTypeName,
          isEnable: action.isEnable,
          isPrivate: action.isPrivate
      }
      axios.post(API_HOST + '/activity/remove', body, { headers: headers})
      .then(response => {
          action.loadTeamActivityTypeList(action.teamID, action.token, store.dispatch)
      })
      .catch(err => {
          console.log(err)
          alert("Remove Team activity type failed")
      })
  } else {
        return next(action)
    } 
}

export default myMiddleware
