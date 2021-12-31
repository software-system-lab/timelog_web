var defaultState = {
  totalTime: "",
  pieData: []
}
var defaultTeamState = {
  team: [],
  member: []
}
export const DashBoardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_DASH_BOARD":
      return action.dashBoardData;
    default:
      return state;
  }
}

export const TeamDashBoardReducer = (state = defaultTeamState, action) => {
  switch (action.type) {
    case "SET_TEAM_DASH_BOARD":
      return action.teamDashBoardData;
    default:
      return state;
  }
}

export const ExportExcelReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EXPORT_EXCEL_DATA":
      return action.exportData
    default:
      return state
  }
}