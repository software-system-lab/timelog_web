const groupListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_GROUP_LIST":{
            return [...action.groupList]
        }
        default:
            return state;
    }
}

export default groupListReducer;
