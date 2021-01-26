import Welcome from 'views/Welcome';
import Board from 'views/Board';
import History from 'views/History';
import Activity from 'views/Activity';
import Team from 'views/Team';

const appRoutes = [
  {path: "/board", name: "Board", component: Board},
  {path: "/history", name: "History", component: History},
  {path: "/activity", name: "Activity", component: Activity},
  {path: "/team", name: "Team", component: Team},
  {path: "/", name:"Welcome", component: Welcome},
]

export default appRoutes;
