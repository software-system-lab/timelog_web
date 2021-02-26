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
