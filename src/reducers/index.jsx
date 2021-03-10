import activityTypeListReducer from './activityTypeList'
import HistoryReducer from './History'
import DashBoardReducer from './DashBoard'
import StopWatchReducer from './StopWatch'
import { combineReducers } from 'redux'
import groupListReducer from './groupList'
import { memberListReducer, leaderReducer, teamActivityTypeListReducer, operatedTeamReducer, allTeamActivityTypeListReducer} from './team'

const rootReducer = combineReducers({
    activityTypeList: activityTypeListReducer,
    logHistory: HistoryReducer,
    dashBoardData: DashBoardReducer,
    stopWatchTime: StopWatchReducer,
    groupList: groupListReducer,
    leader: leaderReducer,
    memberList: memberListReducer,
    teamActivityTypeList: teamActivityTypeListReducer,
    operatedTeam: operatedTeamReducer,
    allTeamActivityTypeList: allTeamActivityTypeListReducer,
})

export default rootReducer
