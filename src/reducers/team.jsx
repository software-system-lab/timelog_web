export const memberListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_MEMBER_LIST":{
            return [...action.memberList]
        }
        default:
            return state;
    }
}

export const leaderReducer = (state = [], action) => {
    switch(action.type){
        case "SET_LEADER":{
            return action.leader
        }
        default:
            return state;
    }
}

