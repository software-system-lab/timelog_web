import Welcome from 'views/Welcome';
import Board from 'views/Board';
import History from 'views/History';
import UserActivity from 'views/UserActivity';
import Activity from 'views/Activity';
import Team from 'views/Team';
import TeamActivity from 'views/TeamActivity';

const appRoutes = [
  {path: "/board", name: "Board", component: Board},
  {path: "/history", name: "History", component: History},
  {path: "/userActivity", name: "User Activity", component: UserActivity},
  {path: "/teamActivity", name:"Team Activity", component: TeamActivity},
  {path: "/team", name: "Team", component: Team},
  {path: "/", name:"Welcome", component: Welcome},
]

export default appRoutes;
