import { connect } from 'react-redux'
import { updateActivity } from '../redux/action/Activity'
import Sidebar from '../views/Sidebar'

export default connect(null, {updateActivity})(Sidebar)