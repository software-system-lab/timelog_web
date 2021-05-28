import { connect } from 'react-redux'
import { updateBoard } from '../redux/action/Board'
import { updateHistory } from '../redux/action/History'
import AddLog from '../views/AddLog'

function mapStateToProps(state) {
    return {
        activityData: state.activity
    }
}

export default connect(mapStateToProps, {updateBoard, updateHistory})(AddLog)