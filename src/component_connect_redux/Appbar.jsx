import { connect } from 'react-redux';
import Appbar from '../views/Appbar'

function mapStateToProps(state) {
    return {
        timeString: state.stopWatchTime
    }
}
  
export default connect(mapStateToProps)(Appbar)