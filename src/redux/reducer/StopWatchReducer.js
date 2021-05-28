import type from '../action/type'

const StopWatchReducer = (state = "00:00:00", action) => {
    if(action.type === type.StopWatch.UpdateTime) {
        return action.time
    } else {
        return state
    }
}

export default StopWatchReducer;