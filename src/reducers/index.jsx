import activityTypeListReducer from './activityTypeList'
import HistoryReducer from './History'
import DashBoardReducer from './DashBoard'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    activityTypeList: activityTypeListReducer,
    logHistory: HistoryReducer,
    dashBoardData: DashBoardReducer
})

export default rootReducer
