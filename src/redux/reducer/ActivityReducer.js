import type from '../action/type'

const ActivityReducer = (state = {activityTypeList: []}, action) => {
    if(action.type === type.Activity.Update){
        return action.activityData
    } else {
        return state
    }
}

export default ActivityReducer;