const activityTypeListReducer = (state = [], action) => {
    switch(action.type){
        case "SET_ACTIVITY_TYPE_LIST":{
            console.log("HI")
            console.log(action)
            console.log([...action.activityTypeList])
            return [...action.activityTypeList]
        }
        default:
            return state;
    }
}

export default activityTypeListReducer;
