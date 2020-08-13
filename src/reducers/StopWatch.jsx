const StopWatchReducer = (state = "00:00:00", action) => {
    switch(action.type) {
        case "UPDATE_TIME":
            return action.time
        default:
            return state
    }
}

export default StopWatchReducer;
