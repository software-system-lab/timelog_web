import activityTypeListReducer from './activityTypeList'
import HistoryReducer from './History'
import DashBoardReducer from './DashBoard'
import StopWatchReducer from './StopWatch'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    activityTypeList: activityTypeListReducer,
    logHistory: HistoryReducer,
    dashBoardData: DashBoardReducer,
    stopWatchTime: StopWatchReducer
})

export default rootReducer
