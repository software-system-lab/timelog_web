const activityTypeListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_ACTIVITY_TYPE_LIST":{
            return [...action.activityTypeList]
        }
        default:
            return state;
    }
}

export default activityTypeListReducer;
