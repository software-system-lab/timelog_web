import Welcome from 'views/Welcome';
import Board from 'views/Board';
import History from 'views/History';
import Activity from 'views/Activity';
import Timebox from 'views/Timebox';
import Stopwatch from 'views/Stopwatch';

const appRoutes = [
  {path: "/board", name: "Board", component: Board},
  {path: "/history", name: "History", component: History},
  {path: "/activity", name: "Activity", component: Activity},
  {path: "/timebox", name: "Timebox", component: Timebox},
  {path: "/stopwatch", name: "Stopwatch", component: Stopwatch},
  {path: "/", name:"Welcome", component: Welcome},
]

export default appRoutes;
