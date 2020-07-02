export function setHistory(logHistory) {
  return {
      type: "SET_HISTORY",
      logHistory: logHistory
  }
}

export function loadLogHistory(userID, token) {
  return {
    type: "LOAD_LOG_HISTORY",
    userID: userID,
    token: token,
    setHistory: (logHistory, dispatch) => dispatch(setHistory(logHistory))
  }
}
