export const memberListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_MEMBER_LIST": {
            return [...action.memberList]
        }
        default:
            return state;
    }
}

export const isLeaderReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_LEADER": {
            return action.isLeader
        }
        default:
            return state;
    }
}

const defaultOperatedTeam = {
    teamID: '',
    teamName: ''
}
export const operatedTeamReducer = (state = defaultOperatedTeam, action) => {
    switch (action.type) {
        case "SET_OPERATED_TEAM": {
            return action.team
        }
        default:
            return state;
    }
}

export const teamActivityTypeListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_TEAM_ACTIVITY_TYPE_LIST": {
            return [...action.teamActivityTypeList]
        }
        default:
            return state;
    }
}

export const allTeamActivityTypeListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ALL_TEAM_ACTIVITY_TYPE_LIST": {
            return [...action.allTeamActivityTypeList]
        }
        default:
            return state;
    }
}

export const myTeamsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BELONGING_TEAM':
            return [...action.myTeams]
        default:
            return state
    }
}
