import ActivityReducer from './ActivityReducer'
import HistoryReducer from './HistoryReducer'
import BoardReducer from './BoardReducer'
import StopWatchReducer from './StopWatchReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    activity: ActivityReducer,
    history: HistoryReducer,
    board: BoardReducer,
    stopWatchTime: StopWatchReducer
})

export default rootReducer