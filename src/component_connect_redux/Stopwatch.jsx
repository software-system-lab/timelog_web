import { connect } from 'react-redux'
import { updateStopWatchTime } from '../redux/action/StopWatch'
import Stopwatch from '../views/Stopwatch'

function mapStateToProps(store) {
    return {
        stopWatchTime: store.stopWatchTime
    }
}
  
  export default connect(mapStateToProps, {updateStopWatchTime})(Stopwatch);