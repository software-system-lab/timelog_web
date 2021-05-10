export const memberListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_MEMBER_LIST":{
            return [...action.memberList]
        }
        default:
            return state;
    }
}

export const isLeaderReducer = (state = [], action) => {
    switch(action.type){
        case "SET_LEADER":{
            return action.isLeader
        }
        default:
            return state;
    }
}

export const operatedTeamReducer = (state = [], action) => {
    switch(action.type){
        case "SET_OPERATED_TEAM":{
            return action.teamID
        }
        default:
            return state;
    }
}

export const teamActivityTypeListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_TEAM_ACTIVITY_TYPE_LIST":{
            return [...action.teamActivityTypeList]
        }
        default:
            return state;
    }
}

export const allTeamActivityTypeListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_ALL_TEAM_ACTIVITY_TYPE_LIST":{
            return [...action.allTeamActivityTypeList]
        }
        default:
            return state;
    }
}


