import Welcome from '../views/Welcome';
import Board from '../component_connect_redux/Board';
import History from '../component_connect_redux/History';
import Activity from '../component_connect_redux/Activity';
import { withRouter } from 'react-router';


const route = [
  {path: "/board", name: "Board", component: withRouter(Board)},
  {path: "/history", name: "History", component: withRouter(History)},
  {path: "/activity", name: "Activity", component: withRouter(Activity)},
  {path: "/", name:"Welcome", component: withRouter(Welcome)},
]

export default route;
