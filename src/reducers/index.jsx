import activityTypeListReducer from './activityTypeList'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    activityTypeList: activityTypeListReducer
})

export default rootReducer