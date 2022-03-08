export function setDashBoard(dashBoardData) {
  return {
    type: "SET_DASH_BOARD",
    dashBoardData: dashBoardData
  }
}

export function loadDashBoard(userID, token) {
  return {
    type: "LOAD_DASH_BOARD",
    userID: userID,
    token: token,
    setDashBoard: (dashBoardData, dispatch) => dispatch(setDashBoard(dashBoardData))
  }
}

export function updateDashBoard(userID, token, filterList) {
  return {
    type: "UPDATE_DASH_BOARD",
    userID: userID,
    token: token,
    filterList: filterList,
    setDashBoard: (dashBoardData, dispatch) => dispatch(setDashBoard(dashBoardData))
  }
}

export function updateTeamDashBoard(teamID, memberList, filterList = null, personal = true, ssl = false) {
  return {
    type: "UPDATE_TEAM_DASH_BOARD",
    teamID: teamID,
    memberList: memberList,
    filterList: filterList,
    personal: personal,
    ssl: ssl,
    setTeamDashBoard: (teamDashBoardData, dispatch) => dispatch(setTeamDashBoard(teamDashBoardData)),
    setIsUpdatingTeamDashboard: (status, dispatch) => dispatch(setIsUpdatingTeamDashboard(status)),
    setExportExcelData: (exportData, dispatch) => dispatch(setExportExcelData(exportData)),
  }
}

export function setIsUpdatingTeamDashboard(status) {
  return {
    type: "SET_UPDATE_TEAM_DASHBOARD_STATUS",
    isUpdatingTeamDashboard: status
  }
}

export function setTeamDashBoard(teamDashBoardData) {
  return {
    type: "SET_TEAM_DASH_BOARD",
    teamDashBoardData: teamDashBoardData
  }
}

export function setExportExcelData(exportData) {
  return {
    type: "SET_EXPORT_EXCEL_DATA",
    exportData: exportData
  }
}