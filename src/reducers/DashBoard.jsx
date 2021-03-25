var defaultState = {
  totalTime: "",
  pieData: []
}

export const DashBoardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_DASH_BOARD":
      return action.dashBoardData;
    default:
      return state;
  }
}

export const TeamDashBoardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_TEAM_DASH_BOARD":
      return action.teamDashBoardData;
    default:
      return state;
  }
}
