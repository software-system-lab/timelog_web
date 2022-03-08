import activityTypeListReducer from './activityTypeList'
import HistoryReducer from './History'
import {
    DashBoardReducer,
    ExportExcelReducer,
    TeamDashBoardReducer,
    IsUpdatingTeamDashboardReducer    
} from './DashBoard'
import StopWatchReducer from './StopWatch'
import { combineReducers } from 'redux'
import groupListReducer from './groupList'
import {
    memberListReducer,
    isLeaderReducer,
    teamActivityTypeListReducer,
    operatedTeamReducer,
    allTeamActivityTypeListReducer,
    myTeamsReducer
} from './team'

const rootReducer = combineReducers({
    activityTypeList: activityTypeListReducer,
    logHistory: HistoryReducer,
    dashBoardData: DashBoardReducer,
    stopWatchTime: StopWatchReducer,
    groupList: groupListReducer,
    isLeader: isLeaderReducer,
    memberList: memberListReducer,
    teamActivityTypeList: teamActivityTypeListReducer,
    operatedTeam: operatedTeamReducer,
    allTeamActivityTypeList: allTeamActivityTypeListReducer,
    myTeams: myTeamsReducer,
    teamDashBoardData: TeamDashBoardReducer,
    isUpdatingTeamDashboard: IsUpdatingTeamDashboardReducer,
    exportExcelData: ExportExcelReducer
})

export default rootReducer
