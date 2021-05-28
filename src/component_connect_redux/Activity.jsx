import { connect } from 'react-redux'
import { updateActivity } from '../redux/action/Activity'
import Activity from '../views/Activity'

function mapStateToProps(state) {
    return {
        activityData: state.activity
    }
}

export default connect(mapStateToProps, {updateActivity})(Activity)