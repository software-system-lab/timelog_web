import { connect } from 'react-redux'
import { updateHistory } from '../redux/action/History'
import { updateBoard } from '../redux/action/Board'
import History from '../views/History'

function mapStateToProps(state) {
    return {
      historyData: state.history,
      activityData: state.activity
    }
  }
  
  export default connect(mapStateToProps, {updateHistory, updateBoard})(History)