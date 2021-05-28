import type from '../action/type'

const BoardReducer = (state = {dataMap: {}, totalTime: "00:00"}, action) => {
    if(action.type === type.Board.Update){
        return action.boardData
    } else {
        return state
    }
}

export default BoardReducer;