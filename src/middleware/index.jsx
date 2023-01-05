import axios from 'axios'
import moment from 'moment'

const API_HOST = process.env.REACT_APP_HOST;
const AMS_HOST = process.env.REACT_APP_AMS_HOST;
const TIMELOG_ADMIN = process.env.REACT_APP_TIMELOG_ADMIN;

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

function paddingLeft(str, len) {
  if (str.toString().length >= len) {
    return str
  } else {
    return paddingLeft('0' + str, len)
  }
}

function getHour(time) {
  return paddingLeft(Math.floor(time / 60), 2)
}

function getMinute(time) {
  return paddingLeft((time % 60).toFixed(0), 2)
}

function getTeamIdList(teamList) {
  var teamID = [];
  for (var i = 0; i < teamList.length; i++) {
    teamID.push(teamList[i].teamID)
  }
  return teamID
}

const myMiddleware = store => next => action => {
  if (action.type === "LOAD_ACTIVITY_TYPE_LIST") {
    const headers = getHeaders(action.token)
    const body = {
      unitIdList: [action.userID]
    }
    axios.post(API_HOST + '/activity/all', body, { headers: headers })
      .then(response => {
        action.setActivityTypeList(response.data.unitDTOList[0].activityTypeList, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert('Load activity type list failed')
      })
  } else if (action.type === "LOAD_TEAM_ACTIVITY_TYPE_LIST") {
    const headers = getHeaders(action.token)
    const body = {
      unitIdList: [action.teamID]
    }
    axios.post(API_HOST + '/activity/all', body, { headers: headers })
      .then(response => {
        action.setTeamActivityTypeList(response.data.unitDTOList[0].activityTypeList, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert('Load Team activity type list failed')
      })
  } else if (action.type === "LOAD_ALL_TEAM_ACTIVITY_TYPE_LIST") {
    const headers = getHeaders(action.token)
    const body = {
      unitIdList: action.teamList
    }
    axios.post(API_HOST + '/activity/all', body, { headers: headers })
      .then(response => {
        action.setAllTeamActivityTypeList(response.data.unitDTOList, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert('Load Team All activity type list failed')
      })
  } else if (action.type === "ENTER_TIMELOG") {
    const headers = getHeaders(action.token)
    const body = getBody(action.userID)
    axios.post(`${API_HOST}/login`, body, { headers: headers })
    .then(response => {
      action.setActivityTypeList(response.data.activityTypeList, store.dispatch)

      body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
      body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")

      axios.post(API_HOST + '/log/history', body, { headers: headers })
        .then(response => {
          action.setHistory(response.data.logItemList, store.dispatch);
        })
        .catch(err => {
          console.log(err)
          alert("Get histroy logs failed");
        })
      const data = {
        username: localStorage.getItem("cn")
      }
      if (data.username === TIMELOG_ADMIN) {
        axios.get(`${AMS_HOST}/teams`).then(response => {
          const teamIdList = response.data.map(t => t.id)
          axios.post(`${API_HOST}/activity/all`, { unitIdList: teamIdList }).then(response => {
            const teamList = response.data.unitDTOList
                                      .map(el => { return { teamName: el.unitName, teamID: el.unitID } })
            const JamesIndex = teamList.findIndex(el => el.teamName === 'James')
            const JamesTeam = teamList.filter(el => el.teamName === 'James')[0]
            teamList.splice(JamesIndex, 1)
            teamList.unshift(JamesTeam)

            action.setGroupList(teamList, store.dispatch);
            action.setOperatedTeam(teamList[0], store.dispatch);
            action.loadAllTeamActivityTypeList(getTeamIdList(teamList), store.dispatch);
            action.getTeam(
              teamList[0].teamName,
              teamList[0].teamID,
              action.userID,
              store.dispatch
            );
          }).catch(err => {
            console.log(err)
          })
        })
        axios.post(`${API_HOST}/belong`, data).then(response => {
          action.setBelongingTeams(response.data.teamList, store.dispatch)
        })
      } else {
        axios.post(`${API_HOST}/belong`, data, { headers: headers })
        .then(response => {

          function compare(a, b) {
            if (a.teamName === 'Software System Lab' || a.teamName === 'Sunbird' || a.teamName === 'Sunbird Master') {
              return 1
            }
            return -1
          }
          const teamList = response.data.teamList.sort(compare)
          action.setGroupList(teamList, store.dispatch);
          action.setOperatedTeam(teamList[0], store.dispatch);
          action.setBelongingTeams(teamList, store.dispatch)
          action.loadAllTeamActivityTypeList(getTeamIdList(teamList), store.dispatch);
          action.getTeam(teamList[0].teamName, teamList[0].teamID, action.userID, store.dispatch);
        })
        .catch(err => {
          console.log(err)
          alert("Get Team failed");
        })
      }


      action.loadDashBoard(action.userID, action.token, store.dispatch)
    })
    .catch(err => {
      console.log(err)
      alert("Login to timelog failed")
    })
  } else if (action.type === "EDIT_ACTIVITY_TYPE") {
    const headers = getHeaders(action.token)
    const body = {
      // unitID: action.userID,
      targetActivityTypeName: action.targetActivityTypeName,
      activityTypeName: action.activityTypeName,
      isEnable: action.isEnable,
      isPrivate: action.isPrivate,
      unitID: action.unitID,
      groupname: action.groupname
    }
    axios.post(API_HOST + '/activity/edit', body, { headers: headers })
      .then(response => {
        action.loadActivityTypeList(action.userID, action.token, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Edit failed")
      })
  } else if (action.type === "ADD_ACTIVITY_TYPE") {
    const headers = getHeaders(action.token)
    const body = {
      userID: action.userID,
      activityTypeName: action.activityTypeName,
      isEnable: action.isEnable,
      isPrivate: action.isPrivate
    }
    axios.post(API_HOST + '/activity/add', body, { headers: headers })
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
      isPrivate: action.isPrivate,
      unitID: action.unitID
    }
    axios.post(API_HOST + '/activity/remove', body, { headers: headers })
      .then(response => {
        action.loadActivityTypeList(action.userID, action.token, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Remove activity type failed")
      })
  } else if (action.type === "NEW_LOG") {
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
    axios.post(API_HOST + '/log/record', body, { headers: headers })
      .then(response => {
        action.loadLogHistory(action.userID, action.token, store.dispatch)
        action.loadDashBoard(action.userID, action.token, store.dispatch)
        if (window.location.pathname === '/team') {
          action.setIsUpdatingTeamDashboard(true, store.dispatch)
          action.updateTeamDashBoard(
            action.operatedTeam.teamID,
            action.memberList,
            action.operatedTeam.teamName,
            store.dispatch
          )
        }
      })
      .catch(err => {
        console.log(err)
        alert("Add log failed")
      })
  } else if (action.type === "LOAD_LOG_HISTORY") {
    const headers = getHeaders(action.token)
    const body = getBody(action.userID)
    body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
    body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")

    axios.post(API_HOST + '/log/history', body, { headers: headers })
      .then(response => {
        action.setHistory(response.data.logItemList, store.dispatch);
      })
      .catch(err => {
        console.log(err)
        alert("Get histroy logs failed");
      })
  } else if (action.type === "LOAD_DASH_BOARD") {
    const headers = getHeaders(action.token)
    const body = getBody(action.userID)
    body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
    body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")
    axios.post(API_HOST + '/dash-board/spent-time', body, { headers: headers })
      .then(response => {
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
          tableData.push({ activityTypeName: key, timeLength: getHour(timeLength) + " : " + getMinute(timeLength), percentage: percentage.toString() + " %" })
        })
        const result = {
          totalTime: response.data.totalTime,
          pieData: pieData,
          tableData: tableData
        }
        action.setDashBoard(result, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Get dash board data failed");
      })
  } else if (action.type === "UPDATE_DASH_BOARD") {
    const headers = getHeaders(action.token)
    const body = {
      userID: action.userID,
      filterList: action.filterList
    }
    body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
    body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")
    axios.post(API_HOST + '/dash-board/spent-time', body, { headers: headers })
      .then(response => {
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
          tableData.push({ activityTypeName: key, timeLength: getHour(timeLength) + " : " + getMinute(timeLength), percentage: percentage.toString() + " %" })
        })
        const result = {
          totalTime: response.data.totalTime,
          pieData: pieData,
          tableData: tableData
        }
        action.setDashBoard(result, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Get dash board data failed");
      })
  } else if (action.type === "UPDATE_TEAM_DASH_BOARD") {
    const headers = getHeaders(action.token)
    const body = {
      teamID: action.teamID,
      memberList: action.memberList,
      filterList: action.filterList,
      personal: action.personal,
      teamName: action.teamName
    }

    body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
    body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")
    axios.post(API_HOST + '/dash-board/team/dashboard', body, { headers: headers })
      .then(response => {
        action.setExportExcelData(JSON.parse(JSON.stringify(response.data)), store.dispatch)
        const member = []

        /////// Region HARD CODE for SUNBIRD
        var personalLabProjectTimes = 0;

        // if (action.teamName === 'Sunbird') {
          response.data.memberDashboardList.forEach((mem, idx) => {

            if (action.teamName === 'Sunbird' || action.teamName === 'Sunbird Master') {
              if (mem.username === 'benny878704' || mem.username === 'nightlord851108' || mem.username === 'ycycchre') {
                return
              }
            }

            const personalLabProject = mem.dataMap["LabProject (Personal)"]
            if (!!personalLabProject) {
              personalLabProjectTimes += personalLabProject.timeLength
            }
          })
        // }
        ////// END Region

        const totalTimeString = response.data.totalTime
        const totalTime = parseInt(totalTimeString.split(":")[0]) * 60 + parseInt(totalTimeString.split(":")[1]) + personalLabProjectTimes
        const pieData = [
          ['Task', 'Hours per Project']
        ]
        const tableData = []
        const dataMap = response.data.dataMap
        Object.keys(dataMap).forEach((key) => {
          var timeLength = dataMap[key].timeLength
          if (key === 'LabProject') {
            timeLength += personalLabProjectTimes
          }
          const percentage = totalTime === 0 ? 0 : (timeLength / totalTime * 100).toFixed(2).toString()

          pieData.push([key, timeLength])
          tableData.push({ activityTypeName: key, timeLength: getHour(timeLength) + " : " + getMinute(timeLength), percentage: percentage.toString() + " %" })
        })
        if (!!! dataMap['LabProject']) {
          var timeLength = personalLabProjectTimes
          const percentage = totalTime === 0 ? 0 : (timeLength / totalTime * 100).toFixed(2).toString()

          pieData.push(['LabProject', timeLength])
          tableData.push({ activityTypeName: 'LabProject', timeLength: getHour(timeLength) + " : " + getMinute(timeLength), percentage: percentage.toString() + " %" })
        }
        const team = {
          totalTime: getHour(totalTime).toString() + ":" + getMinute(totalTime).toString(),
          pieData: pieData,
          tableData: tableData
        }
        const memberDashboardList = response.data.memberDashboardList
        memberDashboardList.forEach((mem, idx) => {
          const totalTimeString = response.data.memberDashboardList[idx].totalTime
          const totalTime = parseInt(totalTimeString.split(":")[0]) * 60 + parseInt(totalTimeString.split(":")[1])
          const pieData = [
            ['Task', 'Hours per Project']
          ]
          const tableData = []
          const dataMap = response.data.memberDashboardList[idx].dataMap
          Object.keys(dataMap).forEach((key) => {
            const timeLength = dataMap[key].timeLength
            const percentage = totalTime === 0 ? 0 : (timeLength / totalTime * 100).toFixed(2).toString()
            pieData.push([key, timeLength])
            tableData.push({ activityTypeName: key, timeLength: getHour(timeLength) + " : " + getMinute(timeLength), percentage: percentage.toString() + " %" })
          })
          const dashboard = {
            unitID: response.data.memberDashboardList[idx].unitID,
            username: response.data.memberDashboardList[idx].username,
            displayName: response.data.memberDashboardList[idx].displayName,
            totalTime: response.data.memberDashboardList[idx].totalTime,
            pieData: pieData,
            tableData: tableData
          }
          member.push(dashboard)
        })
        const result = {
          team: team,
          member: member
        }
        action.setTeamDashBoard(result, store.dispatch)
        action.setIsUpdatingTeamDashboard(false, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Get team dash board data failed");
      })
  } else if (action.type === "REMOVE_LOG") {
    const headers = getHeaders(action.token)
    const body = {
      userID: action.userID,
      logID: action.logID
    }
    axios.post(API_HOST + '/log/remove', body, { headers: headers })
      .then(response => {
        action.loadLogHistory(action.userID, action.token, store.dispatch)
        action.loadDashBoard(action.userID, action.token, store.dispatch)
        // action.updateTeamDashBoard(
        //   action.operatedTeam.teamID,
        //   action.memberList,
        //   store.dispatch
        // )
      })
      .catch(err => {
        console.log(err)
        alert("Remove log failed")
      })
  } else if (action.type === "EDIT_LOG") {
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
    axios.post(API_HOST + '/log/edit', body, { headers: headers })
      .then(response => {
        action.loadLogHistory(action.userID, action.token, store.dispatch)
        action.loadDashBoard(action.userID, action.token, store.dispatch)
        // action.updateTeamDashBoard(
        //   action.operatedTeam.teamID,
        //   action.memberList,
        //   store.dispatch
        // )
      })
      .catch(err => {
        console.log(err)
        alert("Edit log failed")
      })
  } else if (action.type === "UPDATE_TEAM") {
    const headers = getHeaders(action.token)
    const body = {
      teamID: action.teamID
    }
    axios.post(API_HOST + '/group', body, { headers: headers })
      .then(response => {
        action.setMemberList(response.data.memberList, store.dispatch)
        action.loadTeamActivityTypeList(action.teamID, action.token, store.dispatch)
        action.setIsUpdatingTeamDashboard(true, store.dispatch)
        action.updateTeamDashBoard(
          action.teamID,
          response.data.memberList.map(member => member.username),
          action.groupname,
          store.dispatch
        )
      })
      .catch(err => {
        console.log(err)
        alert("Getting team failed")
      })
    const authorizationReq = {
      userID: action.userID,
      teamID: action.teamID
    }
    axios.post(API_HOST + '/role/leader', authorizationReq, { headers: headers })
      .then(response => {
        action.setLeader(response.data, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        if (localStorage.getItem("cn") === TIMELOG_ADMIN) return
        alert("Getting authorization failed")
      })
  } else if (action.type === "EDIT_TEAM_ACTIVITY_TYPE") {
    const headers = getHeaders(action.token)
    const body = {
      unitID: action.teamID,
      targetActivityTypeName: action.targetActivityTypeName,
      activityTypeName: action.activityTypeName,
      isEnable: action.isEnable,
      isPrivate: action.isPrivate
    }
    axios.post(API_HOST + '/activity/edit', body, { headers: headers })
      .then(response => {
        action.loadTeamActivityTypeList(action.teamID, action.token, store.dispatch)
        action.loadAllTeamActivityTypeList(getTeamIdList(action.teamList), action.token, store.dispatch)
      })
      .catch(err => {
        console.log(err)
        alert("Edit Team failed")
      })
  } else if (action.type === "ADD_TEAM_ACTIVITY_TYPE") {
    const headers = getHeaders(action.token)
    const body = {
      userID: action.teamID,
      activityTypeName: action.activityTypeName,
      isEnable: action.isEnable,
      isPrivate: action.isPrivate
    }
    axios.post(API_HOST + '/activity/add', body, { headers: headers })
      .then(response => {
        action.loadTeamActivityTypeList(action.teamID, action.token, store.dispatch)
        action.loadAllTeamActivityTypeList(getTeamIdList(action.teamList), action.token, store.dispatch)
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
    axios.post(API_HOST + '/activity/remove', body, { headers: headers })
      .then(response => {
        action.loadTeamActivityTypeList(action.teamID, action.token, store.dispatch)
        action.loadAllTeamActivityTypeList(getTeamIdList(action.teamList), action.token, store.dispatch)
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
