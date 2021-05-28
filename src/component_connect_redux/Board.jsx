import { connect } from 'react-redux'
import { updateBoard } from '../redux/action/Board'
import { updateActivity } from '../redux/action/Activity'
import Board from '../views/Board'

function mapStateToProps(state) {
    return {
        boardData: state.board,
        activityData: state.activity
    }
}

export default (connect(mapStateToProps, {updateBoard, updateActivity})(Board))