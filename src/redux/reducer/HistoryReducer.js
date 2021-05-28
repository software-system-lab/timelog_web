import type from '../action/type'

const HistoryReducer = (state={logItemList: []}, action) => {
    if (action.type === type.History.Update){
        return action.historyData
    } else {
        return state
    }
}

export default HistoryReducer