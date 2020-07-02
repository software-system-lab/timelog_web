var defaultState = {
  totalTime: "",
  pieData: []
}

const DashBoardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_DASH_BOARD":
      return action.dashBoardData;
    default:
      return state;
  }
}

export default DashBoardReducer;
