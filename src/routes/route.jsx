import Welcome from 'views/Welcome';
import Board from 'views/Board';
import History from 'views/History';
import Activity from 'views/Activity';
import Secured from 'views/Secured';
import Profile from 'views/Profile';

const appRoutes = [
  {path: "/board", name: "Board", component: Board},
  {path: "/history", name: "History", component: History},
  {path: "/activity", name: "Activity", component: Activity},
  {path: "/profile", name: "Profile", component: Profile},
  {path: "/secured", name:"Secured", component: Secured},
  {path: "/", name:"Welcome", component: Welcome},
]

export default appRoutes;
