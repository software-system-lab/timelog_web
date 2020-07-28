import Welcome from 'views/Welcome';
import Board from 'views/Board';
import History from 'views/History';
import Activity from 'views/Activity';
import Secured from 'views/Secured';
import Profile from 'views/Profile';
import Tutorial from 'views/Tutorial';

const appRoutes = [
  {path: "/board", name: "Board", component: Board},
  {path: "/history", name: "History", component: History},
  {path: "/activity", name: "Activity", component: Activity},
  {path: "/profile", name: "Profile", component: Profile},
  {path: "/secured", name:"Secured", component: Secured},
  {path: "/Welcome", name:"Welcome", component: Welcome},
  {path: "/", name:"Welcome", component: Welcome},
  {path: "/tutorial", name: "Tutorial", component: Tutorial},
]

export default appRoutes;
