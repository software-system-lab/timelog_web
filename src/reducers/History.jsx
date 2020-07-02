const HistoryReducer = (state = [], action) => {
  switch(action.type){
    case "SET_HISTORY":{
      return [...action.logHistory]
    }
    default:
      return state;
  }
}

export default HistoryReducer;
